const API_BASE_URL = "http://localhost:8080/";
const getApiUser = async (endpoint) => {
    try {
        const response = await fetch(API_BASE_URL + endpoint);
        if (!response.ok) throw new Error(response.statusText);
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.log('getApiUser: There was an issue with your request.', error);
        return {error: true, message: 'There was an issue with your request.'};
    }
};

const postApiUser = async (endpoint, body) => {
    try {
        const response = await fetch(API_BASE_URL + endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(response.statusText);
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.log('postApiUser: There was an issue with your request.', error);
        return {error: true, message: 'There was an issue with your request.'};
    }
};

const deleteApiUser = async (endpoint) => {
    try {
        const response = await fetch(API_BASE_URL + endpoint, {method: 'DELETE'});
        if (!response.ok) throw new Error(response.statusText);
        return {success: true};
    } catch (error) {
        console.log('deleteApiUser: There was an issue with your request.', error);
        return {error: true, message: 'There was an issue with your request.'};
    }
};

export {getApiUser, postApiUser, deleteApiUser};
