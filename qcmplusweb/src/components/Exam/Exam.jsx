import React, { useState, useEffect } from 'react';
import { getQuizzes, getQuestions, getAnswers, submitExamSession } from '../../services/ExamService';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Exam = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [examCompleted, setExamCompleted] = useState(false);

    useEffect(() => {
        const startQuiz = async () => {
            const response = await getQuestions(quizId);
            setQuestions(response.data);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setExamCompleted(false);
        };

        startQuiz();
    }, [quizId]);

    const fetchAnswers = async (questionId) => {
        const response = await getAnswers(questionId);
        setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
    };

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers(questions[currentQuestionIndex].questionId);
        }
    }, [questions, currentQuestionIndex]);

    const handleAnswerChange = (questionId, answerId, isChecked) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: isChecked ? answerId : null
        }));
    };

    const handleSubmit = async () => {
        const sessionData = {
            user_id: 1, // replace with actual user ID
            quiz_id: quizId,
            answers: userAnswers
        };
        await submitExamSession(sessionData);
        setExamCompleted(true);
    };

    if (examCompleted) {
        return <h3>Exam completed. Thank you!</h3>;
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
                                        onChange={(e) =>
                                            handleAnswerChange(currentQuestion.questionId, answer.answerId, e.target.checked)
                                        }
                                    />
                                ))}
                            </Form>
                            <Button
                                className="mt-3"
                                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                                disabled={currentQuestionIndex >= questions.length - 1}
                            >
                                Next
                            </Button>
                            {currentQuestionIndex === questions.length - 1 && (
                                <Button className="mt-3" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Exam;
