import axios from 'axios';
import {API_BASE_URL} from "./AxiosInstance";

const EXAM_REST_API_URL = API_BASE_URL+"/api";

export const getQuizzes = async () => {
    return axios.get(`${EXAM_REST_API_URL}/quizzes`);
};

export const getQuestions = async (quizId) => {
    return axios.get(`${EXAM_REST_API_URL}/quizzes/${quizId}/questions`);
};

export const getAnswers = async (questionId) => {
    return axios.get(`${EXAM_REST_API_URL}/questions/${questionId}/answers`);
};

export const submitExamSession = async (sessionData) => {
    return axios.post(`${EXAM_REST_API_URL}/exam_sessions`, sessionData);
};
