import React, {useCallback, useEffect, useState} from 'react';
import {getQuestions, submitExamSession} from '../../services/ExamService';
import {Alert, Button, Col, Container, Form, ListGroup, Row, Spinner} from 'react-bootstrap';
import {getAnswersByQuestionId} from "../../services/AnswerService";
import './Exam.css';
import {getLoggedInUser} from "../../services/AuthService";

const MAX_QUESTIONS = 5;
const QUESTION_TIME_LIMIT = 1;

const Exam = ({ quizId }) => {
    const getUser = getLoggedInUser();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [examCompleted, setExamCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(QUESTION_TIME_LIMIT);
    const [score, setScore] = useState(0);


    const calculateScore = useCallback(() => {
        let score = 0;
        questions.forEach((question) => {
            const correctAnswer = answers[question.questionId]?.find(answer => answer.isCorrect);
            if (correctAnswer && userAnswers[question.questionId] === correctAnswer.answerId) {
                score += 1;
            }
        });
        return score;
    }, [questions, answers, userAnswers]);

    const handleSubmit = useCallback(async () => {
        const sessionData = {
            userId: getUser.userId,
            quizId: quizId,
            answers: userAnswers,
        };
        try {
            await submitExamSession(sessionData);
            const calculatedScore = calculateScore();
            setScore(calculatedScore);
            setExamCompleted(true);
            setShowResults(true);
        } catch (error) {
            setError('An error occurred while submitting the exam.');
        }
    }, [getUser.userId, quizId, userAnswers, calculateScore]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else if (currentQuestionIndex === questions.length - 1) {
            handleSubmit();
        }
    }, [currentQuestionIndex, questions.length, handleSubmit]);

    useEffect(() => {
        const startQuiz = async () => {
            setLoading(true);
            try {
                const response = await getQuestions(quizId);
                if (response && response.data) {
                    const selectedQuestions = response.data.slice(0, MAX_QUESTIONS);
                    setQuestions(selectedQuestions);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setExamCompleted(false);
                    setTimer(QUESTION_TIME_LIMIT);
                } else {
                    setError('No questions found for this quiz.');
                }
            } catch (error) {
                setError('An error occurred while fetching questions.');
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            startQuiz();
        }
    }, [quizId]);

    useEffect(() => {
        if (questions.length > 0 && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (timer === 0) {
            handleNextQuestion();
        }
    }, [questions, timer, handleNextQuestion]);

    const fetchAnswers = async (questionId) => {
        try {
            const response = await getAnswersByQuestionId(questionId);
            if (response && response.data) {
                setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
            } else {
                setError('No answers found for this question.');
            }
        } catch (error) {
            console.error('Error fetching answers:', error);
            setError('An error occurred while fetching answers.');
        }
    };

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers(questions[currentQuestionIndex].questionId);
            setTimer(QUESTION_TIME_LIMIT);
        }
    }, [questions, currentQuestionIndex]);

    const handleAnswerChange = (questionId, answerId) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (examCompleted && showResults) {
        return (
            <Container className="exam-results-container">
                <h2 className="text-center">Exam Results</h2>
                <h3 className="text-center">Your Score: {score} / {questions.length}</h3>
                <div className="exam-results-list mb-3 p-3">
                    {questions.map((question, index) => (
                        <div key={question.questionId} className="mb-4">
                            <h5>{index + 1}. {question.questionText}</h5>
                            <ListGroup>
                                {answers[question.questionId]?.map((answer) => (
                                    <ListGroup.Item
                                        key={answer.answerId}
                                        className={`mb-2 p-2 ${answer.isCorrect ? 'bg-success text-white font-weight-bold' : userAnswers[question.questionId] === answer.answerId ? 'bg-danger text-white' : ''}`}
                                    >
                                        {answer.answerText}
                                        {answer.isCorrect && <strong> (Correct Answer)</strong>}
                                        {userAnswers[question.questionId] === answer.answerId && !answer.isCorrect && (
                                            <strong> (Your Answer)</strong>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    ))}
                </div>
                <Alert variant="success" className="text-center">Exam completed successfully. Thank you!</Alert>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="exam-container">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container className="exam-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="exam-card p-4">
                        <h4 className="question-header text-center">Question {currentQuestionIndex + 1} of {questions.length}</h4>
                        <h5 className="timer-header text-center">Time Left: {timer} seconds</h5>
                        {currentQuestion ? (
                            <>
                                <p className="question-text">{currentQuestion.questionText}</p>
                                <Form>
                                    {answers[currentQuestion.questionId]?.map((answer) => (
                                        <Form.Check
                                            key={answer.answerId}
                                            type="radio"
                                            name={`question-${currentQuestion.questionId}`}
                                            label={answer.answerText}
                                            checked={userAnswers[currentQuestion.questionId] === answer.answerId}
                                            onChange={() => handleAnswerChange(currentQuestion.questionId, answer.answerId)}
                                        />
                                    ))}
                                </Form>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button
                                        className="defaultBtn"
                                        onClick={handlePreviousQuestion}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        className="defaultBtn"
                                        onClick={handleNextQuestion}
                                        disabled={
                                            currentQuestionIndex >= questions.length - 1 ||
                                            !userAnswers[currentQuestion.questionId]
                                        }
                                    >
                                        Next
                                    </Button>
                                    {currentQuestionIndex === questions.length - 1 && (
                                        <Button
                                            className="ms-2 defaultBtn"
                                            onClick={handleSubmit}
                                            disabled={!userAnswers[currentQuestion.questionId]}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>No questions available.</p>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Exam;