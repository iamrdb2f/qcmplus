import axiosInstance, {API_BASE_URL} from './AxiosInstance';

const QUESTION_REST_API_URL = `${API_BASE_URL}/api/questions`;

export const getAllQuestions = () => axiosInstance.get(`${QUESTION_REST_API_URL}/all`);
export const getQuestionById = (questionId, quizId) => axiosInstance.get(`${QUESTION_REST_API_URL}/${questionId}/quizzes/${quizId}`);
export const createQuestion = (quizId, questionData) => axiosInstance.post(`${QUESTION_REST_API_URL}/quizzes/${quizId}`, questionData);
export const updateQuestion = (questionId, quizId, questionData) => axiosInstance.put(`${QUESTION_REST_API_URL}/${questionId}/quizzes/${quizId}`, questionData);
export const deleteQuestion = (questionId, quizId) => axiosInstance.delete(`${QUESTION_REST_API_URL}/${questionId}/quizzes/${quizId}`);



