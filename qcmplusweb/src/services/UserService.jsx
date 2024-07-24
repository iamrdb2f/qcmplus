import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const USER_END_POINT = `${API_BASE_URL}/api/users`;

export const handleApiError = (error, axiosError = false) => {
    if (axiosError) {
        if (error.response && error.response.data) {
            return { error: true, message: error.response.data };
        } else {
            return { error: true, message: error.message };
        }
    } else {
        return { error: error, message: 'We encountered a problem while loading your data. Please try again later.' };
    }
};

export const retrieveUser = async () => {
    try {
        const response = await axios.get(USER_END_POINT);
        return response.data || {};
    } catch (error) {
        return handleApiError(error);
    }
};

export const addUser = async (body) => {
    try {
        const response = await axios.post(USER_END_POINT, body, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data || {};
    } catch (error) {
        console.log(error.message)
        return handleApiError(error, true);
    }
};

export const updateUser = async (id, body) => {
    let endpoint = `${USER_END_POINT}/${id}`;
    console.log(endpoint)
    console.log("user id :" + id)
    console.log("form body :" + body)
    try {
        const response = await axios.put(endpoint, body, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data || {};
    } catch (error) {
        console.log(error.message)
        return handleApiError(error, true);
    }
};

export const removeUser = async (id) => {
    let endpoint = `${USER_END_POINT}/${id}`;
    console.log(" delet endpoint")
    console.log(endpoint)
    try {
        const response = await axios.delete(endpoint);

        return { success: true, message: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};
