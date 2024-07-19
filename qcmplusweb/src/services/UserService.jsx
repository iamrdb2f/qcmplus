import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const USER_END_POINT = `${API_BASE_URL}/api/users`;

const constructUserEndpoint = (id = null) =>
    id ? `${USER_END_POINT}/${id}` : USER_END_POINT;

export const  handleApiError = (error, axiosError=false) => {
    if(axiosError){
        if (error.response && error.response.data) {
            return { error: true, message: error.response.data };
        } else {
            return { error: true, message: error.message };
        }
    } else{
        return { error, error: true, message: 'We encountered a problem while loading your data. Please try again later.' };
    }
};

export const retrieveUser = async () => {
    try {
        const response = await axios.get(USER_END_POINT);
        return response.data || {};
    } catch (error) {
        return  handleApiError(error);
    }
};

export const addOrUpdateUser = async (id, body) => {
    let endpoint = constructUserEndpoint(id);
    console.log(endpoint)
    try {
        console.log(id)
        const response = await axios.post(endpoint, body, {
            headers: {'Content-Type': 'application/json'},
        });
        return response.data || {};
    } catch (error) {
        return  handleApiError(error, true);
    }
};

export const removeUser = async (id) => {
    try {
        const response = await axios.delete(constructUserEndpoint(id));
        return {success: true, message: response.data};
    } catch (error) {
        return  handleApiError(error);
    }
};