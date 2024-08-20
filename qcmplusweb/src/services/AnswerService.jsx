import axiosInstance, {API_BASE_URL} from "./AxiosInstance";

const ANSWER_REST_API_URL = API_BASE_URL + "/api/answers";


export const getAllAnswers = () => axiosInstance.get(ANSWER_REST_API_URL);

export const getAnswersByQuestionId = (questionId) => axiosInstance.get(`${ANSWER_REST_API_URL}/question/${questionId}`);
export const getAnswerById = (id) => axiosInstance.get(`${ANSWER_REST_API_URL}/${id}`);
export const createAnswer = (answer) => axiosInstance.post(ANSWER_REST_API_URL, answer);
export const updateAnswer = (id, answer) => axiosInstance.put(`${ANSWER_REST_API_URL}/${id}`, answer);
export const deleteAnswer = (id) => axiosInstance.delete(`${ANSWER_REST_API_URL}/${id}`);