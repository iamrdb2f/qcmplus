import React, { useState, useEffect } from 'react';
import { getQuestions, getAnswers, submitExamSession } from '../../services/ExamService';
import { Button, Form, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import {getAnswersByQuestionId} from "../../services/AnswerService";

const Exam = ({ quizId }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [examCompleted, setExamCompleted] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const startQuiz = async () => {
            setLoading(true);
            try {
                const response = await getQuestions(quizId);
                setQuestions(response.data);
                setCurrentQuestionIndex(0);
                setUserAnswers({});
                setExamCompleted(false);
            } catch (error) {
                console.error('Error fetching questions:', error.response ? error.response.data : error.message);
                setError(error.response?.data?.message || 'An error occurred while fetching questions');
            } finally {
                setLoading(false);
            }
        };

        startQuiz();
    }, [quizId]);

    const fetchAnswers = async (questionId) => {
        try {
            const response = await getAnswersByQuestionId(questionId);
            setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
        } catch (error) {
            console.error('Error fetching answers:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'An error occurred while fetching answers');
        }
    };

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers(questions[currentQuestionIndex].questionId);
        }
    }, [questions, currentQuestionIndex]);

    const handleAnswerChange = (questionId, answerId) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        const sessionData = {
            user_id: 1, // replace with actual user ID
            quiz_id: quizId,
            answers: userAnswers
        };
        try {
            await submitExamSession(sessionData);
            setExamCompleted(true);
        } catch (error) {
            console.error('Error submitting exam session:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'An error occurred while submitting the exam');
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

    if (examCompleted) {
        return (
            <Container>
                <Alert variant="success">
                    Exam completed successfully. Thank you!
                </Alert>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container>
            <Row>
                <Col>
                    {currentQuestion ? (
                        <>
                            <h4>{currentQuestion.questionText}</h4>
                            <Form>
                                {answers[currentQuestion.questionId]?.map((answer) => (
                                    <Form.Check
                                        key={answer.answerId}
                                        type="radio"
                                        name={`question-${currentQuestion.questionId}`}
                                        label={answer.answerText}
                                        checked={userAnswers[currentQuestion.questionId] === answer.answerId}
                                        onChange={() =>
                                            handleAnswerChange(currentQuestion.questionId, answer.answerId)
                                        }
                                    />
                                ))}
                            </Form>
                            <div className="d-flex justify-content-between mt-3">
                                <Button
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </Button>
                                <Button
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
                                        className="ms-2"
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
                </Col>
            </Row>
        </Container>
    );
};

export default Exam;