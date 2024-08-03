import React, {useState} from 'react';
import {Button, Col, Container, Dropdown, Row} from 'react-bootstrap';
import Sidebar from "../../components/Sidebar/Sidebar";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./Main.css";
import {AiFillWarning} from "react-icons/ai";
import {IoMdLogOut} from "react-icons/io"; // Import logout icon
import {FaUser} from "react-icons/fa"; // Import user icon
import {ROLE} from "../../utils/UtilLists";
import {isAdminUser, getLoggedInUser, logout} from "../../services/AuthService"; // Import logout function
import QuizList from "../../components/Quiz/QuizList";
import Exam from "../../components/Exam/Exam";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const isAdmin = isAdminUser();
    const [showUserList, setShowUserList] = useState(true);
    const [selectedItem, setSelectedItem] = useState('');
    const getUser = getLoggedInUser();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSidebarItemClick = (item) => {
        setSelectedItem(item);
        setShowUserList(true);
    };

    const renderContent = () => {
        if (!showUserList) {
            return <AddUser/>;
        }

        switch (selectedItem) {
            case 'Trainee':
                return <UserList title="Registered Trainee" userRole={ROLE.USER}/>;
            case 'Admin':
                return <UserList title="Registered Admin" userRole={ROLE.ADMIN}/>;
            case 'Exams':
                return <h1><AiFillWarning/>Exams: en cours de construction</h1>;
            case 'Quizzes':
                return <h1><AiFillWarning/>Quizzes: en cours de construction</h1>;
            case 'Questions':
                return <h1><AiFillWarning/>Questions: en cours de construction</h1>;
            case 'Answers':
                return <h1><AiFillWarning/>Answers: en cours de construction</h1>;
            case 'Features':
                return <h1><AiFillWarning/>Features: en cours de construction</h1>;
            case 'TakeExams':
                return <Exam/>;
            case 'HistoryExams':
                return <h1><AiFillWarning/>History Exams : en cours de construction</h1>;
            case 'UserDashboard':
                return <QuizList/>;
            case 'AdminDashboard':
                return <h1><AiFillWarning/> : en cours de construction</h1>;
        }
    };

    return (
        <Container fluid className="usersContainer">
            <Row>
                <Col xs={12} md={2} className="sidebar">
                    <Sidebar onItemClick={handleSidebarItemClick} selectedItem={selectedItem}/>
                </Col>
                <Col xs={12} md={10} className="main-content">
                    <div>
                        <div className="header d-flex justify-content-end m-3">
                            {isAdmin && (
                                <>
                                    <Button className="ExportUserBtn me-2">Export CSV</Button>
                                    <Button className="ToggleUserBtn" onClick={() => setShowUserList(!showUserList)}>
                                        {showUserList ? 'Add User' : 'List Users'}
                                    </Button>
                                </>
                            )}
                            <Dropdown className="mx-3 ">
                                <Dropdown.Toggle className=" loggedInUserBtn px-5" id="dropdown-basic">
                                    <FaUser className="me-1"/> {getUser.userFirstName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={"p-0"}>
                                    <Dropdown.Item>{`User : ${getUser.userFirstName} ${getUser.userLastName.toUpperCase()}`}</Dropdown.Item>
                                    <Dropdown.Item>{`Email : ${getUser.userEmail}`}</Dropdown.Item>
                                    <Dropdown.Item>{`Job Title : ${getUser.userJob}`}</Dropdown.Item>
                                    <Dropdown.Divider className="m-0 p-0"/>
                                    <Dropdown.Item className="logoutBtn m-0" onClick={handleLogout}>
                                        <IoMdLogOut className="sidebar-icon me-1"/>
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {isAdmin ? (
                            renderContent()
                        ) : (
                            <div className="p-5">
                                <h3 className="text-bold text-center p-4">Evaluate Your Skills: Take the Quiz</h3>
                                {renderContent()}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;
