import React from 'react';
import {
    FaBook,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaFileAlt,
    FaHome,
    FaQuestionCircle,
    FaRegStar,
    FaUserGraduate
} from 'react-icons/fa';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";
import {Container, ListGroup, Row} from "react-bootstrap";
import {IoMdLogOut} from "react-icons/io";
import {isUserLoggedIn, logout} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";


const Sidebar = ({ onItemClick, selectedItem }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <Container fluid>
            <Row className={"mt-2 mb-5 text-center"}>
                <ImgLogo link="/"/>
            </Row>
            <ListGroup>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Dashboard' ? 'active' : ''}`}
                    onClick={() => onItemClick('Dashboard')}
                >
                    <FaHome className="sidebar-icon" />
                    <span>Dashboard</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Admin' ? 'active' : ''}`}
                    onClick={() => onItemClick('Admin')}
                >
                    <FaChalkboardTeacher className="sidebar-icon" />
                    <span>Admin</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Trainee' ? 'active' : ''}`}
                    onClick={() => onItemClick('Trainee')}
                >
                    <FaUserGraduate className="sidebar-icon" />
                    <span>Trainee</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Exams' ? 'active' : ''}`}
                    onClick={() => onItemClick('Exams')}
                >
                    <FaBook className="sidebar-icon" />
                    <span>Exams</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Quizzes' ? 'active' : ''}`}
                    onClick={() => onItemClick('Quizzes')}
                >
                    <FaFileAlt className="sidebar-icon" />
                    <span>Quizzes</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Questions' ? 'active' : ''}`}
                    onClick={() => onItemClick('Questions')}
                >
                    <FaQuestionCircle className="sidebar-icon" />
                    <span>Questions</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item ${selectedItem === 'Answers' ? 'active' : ''}`}
                    onClick={() => onItemClick('Answers')}
                >
                    <FaCommentAlt className="sidebar-icon" />
                    <span>Answers</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item new-feature mt-5 ${selectedItem === 'Features' ? 'active' : ''}`}
                    onClick={() => onItemClick('Features')}
                >
                    <FaRegStar className="sidebar-icon" />
                    <span>Features</span>
                    <span className="new-badge">NEW</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`sidebar-item logout-btn mt-5 ${selectedItem === 'Logout'}`}
                    onClick={handleLogout}
                >
                    <IoMdLogOut className="sidebar-icon" />
                    <span>Log Out</span>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
};

export default Sidebar;
