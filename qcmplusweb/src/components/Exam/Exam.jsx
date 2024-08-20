import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Container, Spinner} from 'react-bootstrap';
import ExamResults from './ExamResults';
import ExamQuestion from './ExamQuestion';
import useExamFetchQuestions from './useExamFetchQuestions';
import {getLoggedInUser} from '../../services/AuthService';
import './Exam.css';
import {submitExamSession} from '../../services/ExamService';
import React, {useEffect, useState} from 'react';
import {getAnswers, getQuestions, submitExamSession} from '../../services/ExamService';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

const MAX_QUESTIONS = 15;
const QUESTION_TIME_LIMIT = 60;

const Exam = ({ quizId }) => {
    const getUser = getLoggedInUser();
    const { questions, answers, loading, error } = useExamFetchQuestions(quizId, MAX_QUESTIONS);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [examCompleted, setExamCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [timer, setTimer] = useState(QUESTION_TIME_LIMIT); // Timer in seconds

    const calculateScore = useCallback(() => {
        let calculatedScore = 0;
        questions.forEach((question) => {
            const correctAnswer = answers[question.questionId]?.find(answer => answer.correct === true);
            if (correctAnswer && userAnswers[question.questionId] === correctAnswer.answerId) {
                calculatedScore += 1;
            }
        });
        return calculatedScore;
    }, [questions, answers, userAnswers]);

    const convertToExamSessionObject = useCallback((session) => {
        const timeSpentInSeconds = session.timeSpent;
        const hours = Math.floor(timeSpentInSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timeSpentInSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (timeSpentInSeconds % 60).toString().padStart(2, '0');
        const timeSpentFormatted = `${hours}:${minutes}:${seconds}`;

        const examSession = {
            user: { id: session.userId },
            quiz: { quizId: session.quizId },
            score: session.score,
            timeSpent: timeSpentFormatted,
            dateExam: session.dateExam.toISOString(),
        };

        return examSession;
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!getUser || !getUser.userId) {
            throw new Error('User is not authenticated');
        }
        try {
            const endTime = new Date();
            const timeSpent = Math.floor((endTime - startTime) / 1000); // Time spent in seconds

            const sessionData = {
                userId: getUser.userId,
                quizId: quizId,
                score: calculateScore(),
                dateExam: new Date(),
                timeSpent: timeSpent,
            };

            const examSessionObject = convertToExamSessionObject(sessionData);

            await submitExamSession(examSessionObject);
            setScore(calculateScore());
            setExamCompleted(true);
            setShowResults(true);
        } catch (err) {
            if (err.response?.status === 401) {
                setAuthError('Unauthorized access. Please log in again.');
            } else {
                setAuthError('Error submitting exam session. Please try again later.');
            }
        }
    }, [getUser, quizId, calculateScore, convertToExamSessionObject, startTime]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimer(QUESTION_TIME_LIMIT); // Reset the timer for the next question
        } else {
            handleSubmit();
        }
    }, [currentQuestionIndex, questions.length, handleSubmit]);

    useEffect(() => {
        if (timer > 0) {
            const timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            handleNextQuestion();
        }
    }, [timer, handleNextQuestion]);

    useEffect(() => {
        if (questions.length > 0 && !startTime) {
            setStartTime(new Date());
        }
    }, [questions, startTime]);

    const handleAnswerChange = (questionId, answerId) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            setTimer(QUESTION_TIME_LIMIT); // Reset the timer when going back to a previous question
        }
    };

    if (loading) {
        return (
            <Container className="exam-container">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (examCompleted && showResults) {
        return (
            <ExamResults
                quiz={questions[0].quiz}
                questions={questions}
                answers={answers}
                userAnswers={userAnswers}
                score={score}
            />
        );
    }

    if (error || authError) {
        return (
            <Container className="exam-container">
                <Alert variant="danger">{error || authError}</Alert>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = answers[currentQuestion.questionId];

    return (
        <Container className="exam-container">
            {currentAnswers ? (
                <ExamQuestion
                    quiz={currentQuestion.quiz}
                    question={currentQuestion}
                    answers={currentAnswers}
                    userAnswers={userAnswers}
                    handleAnswerChange={handleAnswerChange}
                    handlePreviousQuestion={handlePreviousQuestion}
                    handleNextQuestion={handleNextQuestion}
                    handleSubmit={handleSubmit}
                    currentQuestionIndex={currentQuestionIndex}
                    questionsLength={questions.length}
                    timer={timer}
                />
            ) : (
                <Spinner animation="border" />
            )}
        </Container>
    );
};

export default Exam;