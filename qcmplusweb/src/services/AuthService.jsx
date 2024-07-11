import axios from 'axios';


const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth"

export const authenticateUser = async (email, password) => {
    const response = await axios.post('http://localhost:8080/authenticateUser', {
        username: email,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    console.log("aa response.status:  " +response.status)
    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }
    console.log("aa response:  "+response)
    return response;
};


export const loginAPICall = (userEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/signin', { userEmail, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (userEmail, role) => {
    sessionStorage.setItem("authenticatedUser", userEmail);
    sessionStorage.setItem("role", role);
}

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null) {
        return false;
    }
    else {
        return true;
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {

    let role = sessionStorage.getItem("role");

    if(role != null && role === 'ROLE_ADMIN'){
        return true;
    }else{
        return false;
    }

}
export const isTraineeUser = () => {

    let role = sessionStorage.getItem("role");

    if(role != null && role === 'ROLE_TRAINEE'){
        return true;
    }else{
        return false;
    }

}