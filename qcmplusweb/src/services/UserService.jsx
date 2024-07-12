// src/utils/apiUtils.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";

const getApiUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/users`);
        return response.data || {};
    } catch (error) {
        console.error('getApiUser: There was an issue with your request.', error);
        return { error: true, message: 'There was an issue with your request.' };
    }
};

const postApiUser = async (endpoint, body) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, body, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data || {};
    } catch (error) {
        if (error.response && error.response.data) {
            return { error: true, message: error.response.data };
        } else {
            return { error: true, message: error.message };
        }
    }
};

const deleteApiUser = async (endpoint) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
        return { success: true, message: response.data };
    } catch (error) {
        return { error: true, message: error.response?.data || 'There was an issue with your request.' };
    }
};

export { getApiUser, postApiUser, deleteApiUser };
