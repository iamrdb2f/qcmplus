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

function onItemClick(trainee) {
    return undefined;
}

const Sidebar = () => {
    return (
        <Container fluid>
            <Row className={"mt-2 mb-5 text-center"}>
                <ImgLogo/>
            </Row>
            <ListGroup>
                <ListGroup.Item className="sidebar-item">
                    <FaHome className="sidebar-icon"/>
                    <span>Dashboard</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item active">
                    <FaChalkboardTeacher className="sidebar-icon"/>
                    <span>Trainer</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item" onClick={() => onItemClick('trainee')}>
                    <FaUserGraduate className="sidebar-icon"/>
                    <span>Trainee</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item">
                    <FaUserGraduate className="sidebar-icon"/>
                    <span>Trainee</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item">
                    <FaBook className="sidebar-icon"/>
                    <span>Exams</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item">
                    <FaFileAlt  className="sidebar-icon"/>
                    <span>Quizzes</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item">
                    <FaQuestionCircle className="sidebar-icon"/>
                    <span>Questions</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item">
                    <FaCommentAlt className="sidebar-icon"/>
                    <span>Answers</span>
                </ListGroup.Item>
                <ListGroup.Item className="sidebar-item new-feature mt-5">
                    <FaRegStar className="sidebar-icon"/>
                    <span>Features</span>
                    <span className="new-badge">NEW</span>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
};

export default Sidebar;
