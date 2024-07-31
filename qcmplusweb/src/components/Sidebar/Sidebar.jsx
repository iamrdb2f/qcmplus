import React from 'react';
import {FaBook, FaChalkboardTeacher, FaCommentAlt, FaFileAlt, FaHome, FaQuestionCircle, FaRegStar, FaUser, FaUserGraduate} from 'react-icons/fa';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";
import {Container, ListGroup, Row} from "react-bootstrap";
import {IoMdLogOut} from "react-icons/io";
import {getLoggedInUser, isAdminUser, logout} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";

const Sidebar = ({onItemClick, selectedItem}) => {
    const navigate = useNavigate();
    const isAdmin = isAdminUser();
    const getUser = getLoggedInUser();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderItem = (item, Icon, label) => (
        <ListGroup.Item
            className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
        >
            <Icon className="sidebar-icon"/>
            <span>{label}</span>
        </ListGroup.Item>
    );

    const renderAdminItem = (item, Icon, label) => {
        return isAdmin ? renderItem(item, Icon, label) : null;
    };

    return (
        <Container fluid>
            <Row className={"mt-2 mb-5 text-center"}>
                <ImgLogo link="/"/>
            </Row>
            <ListGroup>
                {renderItem('UserProfile', FaUser, getUser)}
                {renderAdminItem('Dashboard', FaHome, 'Dashboard')}
                {renderAdminItem('Admin', FaChalkboardTeacher, 'Admin')}
                {renderAdminItem('Trainee', FaUserGraduate, 'Trainee')}
                {renderAdminItem('Exams', FaBook, 'Exams')}
                {renderAdminItem('Quizzes', FaFileAlt, 'Quizzes')}
                {renderAdminItem('Questions', FaQuestionCircle, 'Questions')}
                {renderAdminItem('Answers', FaCommentAlt, 'Answers')}
                {renderAdminItem('Features', FaRegStar, 'Features')}
                {renderItem(handleLogout, IoMdLogOut, 'Logout')}
            </ListGroup>
        </Container>
    );
};
export default Sidebar;