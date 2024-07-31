import axios from 'axios';
import {ROLE} from "../utils/UtilLists";

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/auth/login';

export const loginAPICall = (email, password) => axios.post(AUTH_REST_API_BASE_URL , { email, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");


export const saveLoggedInUser = (email, role) => {
    sessionStorage.setItem("authenticatedUser", email);
    sessionStorage.setItem("role", role);
}

export const isUserLoggedIn = () => {
    const email = sessionStorage.getItem("authenticatedUser");
    return email != null;
}

export const getLoggedInUser = () => {
    return sessionStorage.getItem("authenticatedUser");
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    return role != null && role === ROLE.ADMIN.roleName;
}
