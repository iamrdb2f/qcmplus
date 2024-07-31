import React from 'react';
import {IoMdLogOut} from "react-icons/io";
import {Button} from "react-bootstrap";
import {logout} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
            <Button className={"logoutBtn"} onClick={handleLogout}>
                <IoMdLogOut className="sidebar-icon"/>
                <span>Logout</span>
            </Button>
    );
};

export default Logout;