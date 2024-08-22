import {useEffect, useState} from 'react';
import {getQuestions} from '../../services/ExamService';
import {getAnswersByQuestionId} from '../../services/AnswerService';

const useExamFetchQuestions = (quizId, maxQuestions) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions(quizId);
                const shuffledQuestions = response.data.sort(() => 0.5 - Math.random());
                setQuestions(shuffledQuestions.slice(0, maxQuestions));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            fetchQuestions();
        }
    }, [quizId, maxQuestions]);

    useEffect(() => {
        const fetchAnswers = async (questionId) => {
            try {
                const response = await getAnswersByQuestionId(questionId);
                setAnswers((prev) => ({
                    ...prev,
                    [questionId]: response.data.map((answer) => ({
                        ...answer,
                        correct: answer.correct === true,  // Ensure correct is correctly interpreted as boolean
                    })),
                }));
            } catch (err) {
                setError(err.message);
            }
        };

        if (questions.length > 0) {
            questions.forEach((question) => {
                fetchAnswers(question.questionId);
            });
        }
    }, [questions]);

    return {questions, answers, loading, error};
};

export default useExamFetchQuestions;