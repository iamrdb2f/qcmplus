import axiosInstance from '../services/AxiosInstance';
import {API_BASE_URL} from "./AxiosInstance";


const USER_REST_API_URL = `${API_BASE_URL}/api/users`;

export const retrieveUsers = () => axiosInstance.get(USER_REST_API_URL);
export const addUser = (newUser) => axiosInstance.post(USER_REST_API_URL, newUser);
export const updateUser = (id, updateUser) => axiosInstance.put(`${USER_REST_API_URL}/${id}`, updateUser);
export const removeUser = (id) => axiosInstance.delete(`${USER_REST_API_URL}/${id}`);
