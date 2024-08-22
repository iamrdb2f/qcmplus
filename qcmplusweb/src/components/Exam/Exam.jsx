import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Container, Spinner} from 'react-bootstrap';
import ExamResults from './ExamResults';
import ExamQuestion from './ExamQuestion';
import useExamFetchQuestions from './useExamFetchQuestions';
import useExamTimer from './useExamTimer';
import {submitExamSession} from '../../services/ExamService';
import {getLoggedInUser} from '../../services/AuthService';
import './Exam.css';

const MAX_QUESTIONS = 5;
const QUESTION_TIME_LIMIT = 60;

const Exam = ({ quizId }) => {
    const getUser = getLoggedInUser();
    const {questions, answers, loading, error} = useExamFetchQuestions(quizId, MAX_QUESTIONS);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [examCompleted, setExamCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);

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

    useEffect(() => {
        if (examCompleted) {
            setScore(calculateScore());
        }
    }, [examCompleted, calculateScore]);

    useEffect(() => {
        if (questions.length > 0 && !startTime) {
            setStartTime(new Date());
        }
    }, [questions, startTime]);

    const handleSubmit = useCallback(async () => {
        try {
            if (!getUser || !getUser.userId) {
                throw new Error('User is not authenticated');
            }

            const endTime = new Date();
            const timeSpent = Math.floor((endTime - startTime) / 1000); // Time spent in seconds

            const sessionData = {
                userId: getUser.userId,
                quizId,
                answers: userAnswers,
                score: calculateScore(),
                dateExam: new Date(),
                timeSpent: timeSpent,
            };

            await submitExamSession(sessionData);
            setExamCompleted(true);
            setShowResults(true);
        } catch (err) {
            if (err.message === 'User is not authenticated') {
                console.error('User is logged out:', err);
            } else {
                console.error('Error submitting exam session:', err);
            }
        }
    }, [getUser, quizId, userAnswers, calculateScore, startTime]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            handleSubmit();
        }
    }, [currentQuestionIndex, questions.length, handleSubmit]);

    const [timer, resetTimer] = useExamTimer(QUESTION_TIME_LIMIT, handleNextQuestion);

    useEffect(() => {
        resetTimer();
    }, [currentQuestionIndex, resetTimer]);

    const handleAnswerChange = (questionId, answerId) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    if (loading) {
        return (
            <Container className="exam-container">
                <Spinner animation="border"/>
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

    if (error) {
        return (
            <Container className="exam-container">
                <Alert variant="danger">{error}</Alert>
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
                <Spinner animation="border"/>
            )}
        </Container>
    );
};

export default Exam;