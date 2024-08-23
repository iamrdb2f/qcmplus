import axiosInstance, {API_BASE_URL} from "./AxiosInstance";

const QUIZZES_REST_API_URL = `${API_BASE_URL}/api/quizzes`;
export const retrieveQuizzes = () => axiosInstance.get(QUIZZES_REST_API_URL);
export const retrieveQuizze = (quizId) => axiosInstance.get(`${QUIZZES_REST_API_URL}/${quizId}`);
export const createQuiz = (quiz) => axiosInstance.post(QUIZZES_REST_API_URL, quiz);
export const updateQuiz = (quizId, quiz) => axiosInstance.put(`${QUIZZES_REST_API_URL}/${quizId}`, quiz);
export const deleteQuiz = (quizId) => axiosInstance.delete(`${QUIZZES_REST_API_URL}/${quizId}`);
