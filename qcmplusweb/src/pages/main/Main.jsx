import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Row} from 'react-bootstrap';
import Sidebar from "../../components/Sidebar/Sidebar";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./Main.css";
import {AiFillWarning} from "react-icons/ai";
import {IoMdLogOut} from "react-icons/io";
import {FaUser} from "react-icons/fa";
import {ROLE} from "../../utils/UtilLists";
import {getLoggedInUser, isAdminUser, logout} from "../../services/AuthService";
import QuizList from "../../components/Quiz/QuizList";
import ExamSelected from "../../components/ExamSelected/ExamSelected";
import Exam from "../../components/Exam/Exam";
import {useNavigate} from "react-router-dom";
import ExamsTaken from "../../components/ExamHistory/ExamHistory";
import Exam from "../../components/Exam/Exam";
import Answer from "../../components/Answer/Answer";
import ExamsList from "../../components/ExamsList/ExamsList";
import AnswersList from "../../components/AnswersList/AnswersList";
import QuestionsList from "../../components/QuestionsList/QuestionsList";
import QuizsList from "../../components/QuizsList/QuizsList";
import Dashboard from "../../components/Dashboard/Dashboard";


const Main = () => {
    const isAdmin = isAdminUser();
    const getUser = getLoggedInUser();
    const navigate = useNavigate();
    const [quizId, setQuizId] = useState(null);
    const [showUserList, setShowUserList] = useState(true);
    const [selectedItem, setSelectedItem] = useState(isAdmin ? 'AdminDashboard' : 'UserDashboard');
    const [examStarted, setExamStarted] = useState(false);

    const showTopBtn = selectedItem === 'Trainee' || selectedItem === 'Admin';


    const handleLogout = useCallback(() => {
        logout();
        navigate('/');
    }, [navigate]);

    const handleSidebarItemClick = (item) => {
        setSelectedItem(item);
        setShowUserList(true);
        setExamStarted(false);
    };

    const handleTakeQuiz = (quizId) => {
        setQuizId(quizId);
        setSelectedItem('TakeExams');
    };

    const handleStartExam = () => {
       setExamStarted(true);
    };

    const renderContent = () => {
        if (examStarted && quizId) {
            return <Exam quizId={quizId}/>;
        }

        if (!showUserList) {
            return <AddUser/>;
        }

        switch (selectedItem) {
            case 'Trainee':
                return <UserList title="Registered Trainee" userRole={ROLE.USER} />;
            case 'Admin':
                return <UserList title="Registered Admin" userRole={ROLE.ADMIN} />;
            case 'Exams':
                return <ExamsList title="Registered Exams List"/>;
            case 'Quizzes':
                return <QuizsList title="Registered Quizs List"/>;
            case 'Questions':
                return <QuestionsList title="Registered Questions List"/>;
            case 'Answers':
                return <h1><AiFillWarning />Answers: en cours de construction</h1>;
            case 'TakeExams':
                return <ExamSelected quizId={quizId || 1} onStartExam={handleStartExam} />; // Pass handleStartExam
            case 'HistoryExams':
                return <ExamsTaken userId={getUser.userId}></ExamsTaken>;
            case 'UserDashboard':
                return <QuizList onTakeQuiz={handleTakeQuiz} />;
            case 'AdminDashboard':
                return <Dashboard />;
            default:
                if (isAdmin) {
                    handleSidebarItemClick('AdminDashboard');
                } else {
                    handleSidebarItemClick('UserDashboard');
                }
        }
    };

    return (
        <Container fluid className="usersContainer">
            <Row>
                <Col xs={12} md={2} className="sidebar">
                    <Sidebar onItemClick={handleSidebarItemClick} selectedItem={selectedItem} />
                </Col>
                <Col xs={12} md={10} className="main-content">
                    <div>
                        <div className="header d-flex justify-content-end m-3">
                            {isAdmin && showTopBtn && (
                                <>
                                    <Button className="ToggleUserBtn" onClick={() => setShowUserList(!showUserList)}>
                                        {showUserList ? 'Add User' : 'List Users'}
                                    </Button>
                                </>
                            )}
                            <Dropdown className="mx-3">
                                <Dropdown.Toggle className="loggedInUserBtn px-5" id="dropdown-basic">
                                    <FaUser className="me-1" /> {getUser.userFirstName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0">
                                    <Dropdown.Item>{`User : ${getUser.userFirstName} ${getUser.userLastName.toUpperCase()}`}</Dropdown.Item>
                                    <Dropdown.Item>{`Email : ${getUser.userEmail}`}</Dropdown.Item>
                                    <Dropdown.Item>{`Job Title : ${getUser.userJob}`}</Dropdown.Item>
                                    <Dropdown.Divider className="m-0 p-0" />
                                    <Dropdown.Item className="logoutBtn m-0" onClick={handleLogout}>
                                        <IoMdLogOut className="sidebar-icon me-1" />
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {renderContent()}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;