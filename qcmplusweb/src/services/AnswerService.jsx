import axiosInstance, {API_BASE_URL} from "./AxiosInstance";

const ANSWER_REST_API_URL = API_BASE_URL+"/api/answers";

export const getAnswersByQuestionId = async (questionId) => {
    return axiosInstance.get(`${ANSWER_REST_API_URL}/question/${questionId}`);
};

export const getAnswerById = async (id) => {
    return axiosInstance.get(`${ANSWER_REST_API_URL}/${id}`);
};

export const createAnswer = async (answer) => {
    return axiosInstance.post(ANSWER_REST_API_URL, answer);
};

export const updateAnswer = async (id, answer) => {
    return axiosInstance.put(`${ANSWER_REST_API_URL}/${id}`, answer);
};

export const deleteAnswer = async (id) => {
    return axiosInstance.delete(`${ANSWER_REST_API_URL}/${id}`);
};
