import axios from 'axios';
import {ROLE} from "../utils/UtilLists";

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/auth/login';

export const loginAPICall = (email, password) => axios.post(AUTH_REST_API_BASE_URL, {email, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");


export const saveLoggedInUser = (userEmail, userLastName, userFirstName,  role, userJob) => {
    sessionStorage.setItem("authenticatedUser", userEmail);
    sessionStorage.setItem("userLastName", userLastName);
    sessionStorage.setItem("userFirstName", userFirstName);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("userJob", userJob);
}

export const isUserLoggedIn = () => {
    const email = sessionStorage.getItem("authenticatedUser");
    return email != null;
}

export const getLoggedInUser = () => {
    return {
        authenticatedUser: sessionStorage.getItem("authenticatedUser"),
        userEmail: sessionStorage.getItem("authenticatedUser"),
        userLastName: sessionStorage.getItem("userLastName"),
        userFirstName: sessionStorage.getItem("userFirstName"),
        role: sessionStorage.getItem("role"),
        userJob: sessionStorage.getItem("userJob")
    };
};

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    return role != null && role === ROLE.ADMIN.roleName;
}
