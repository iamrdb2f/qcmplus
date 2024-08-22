import axiosInstance, {API_BASE_URL} from './AxiosInstance';

const EXAM_REST_API_URL = `${API_BASE_URL}/api`;

export const getQuizzes = () => axiosInstance.get(`${EXAM_REST_API_URL}/quizzes`);
export const getAllExamSession = () => axiosInstance.get(`${EXAM_REST_API_URL}/exam_sessions`);
export const getAllUserExamHistory = (userId) => axiosInstance.get(`${EXAM_REST_API_URL}/exam_sessions/user/${userId}`);
export const getQuestions = (quizId) => axiosInstance.get(`${EXAM_REST_API_URL}/quizzes/${quizId}/questions`);
export const getAnswers = (questionId) => axiosInstance.get(`${EXAM_REST_API_URL}/questions/${questionId}/answers`);
export const submitExamSession = (sessionData) => axiosInstance.post(`${EXAM_REST_API_URL}/exam_sessions`, sessionData);
export const getExamSession = (sessionId) => axiosInstance.get(`${EXAM_REST_API_URL}/exam_sessions/${sessionId}`);