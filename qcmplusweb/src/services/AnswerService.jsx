import axios from 'axios';
import {API_BASE_URL} from "./AxiosInstance";

const ANSWER_REST_API_URL = API_BASE_URL+"/api/answers";

export const getAnswersByQuestionId = async (questionId) => {
    return axios.get(`${ANSWER_REST_API_URL}/question/${questionId}`);
};

export const getAnswerById = async (id) => {
    return axios.get(`${ANSWER_REST_API_URL}/${id}`);
};

export const createAnswer = async (answer) => {
    return axios.post(ANSWER_REST_API_URL, answer);
};

export const updateAnswer = async (id, answer) => {
    return axios.put(`${ANSWER_REST_API_URL}/${id}`, answer);
};

export const deleteAnswer = async (id) => {
    return axios.delete(`${ANSWER_REST_API_URL}/${id}`);
};
