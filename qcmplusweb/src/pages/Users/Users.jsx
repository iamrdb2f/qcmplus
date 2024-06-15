import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Sidebar from "../../components/Sidebar/Sidebar";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./Users.css";

const Users = () => {
    const [showUserList, setShowUserList] = useState(true);
    const initialTeachers = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            class: 'Math',
            gender: 'Male',
            password: '1234',
            phone: '1234567890',
            subject: 'Mathematics',
            designation: 'Professor'
        }
    ];

    const handleSubmit = (teachers) => {
        console.log('Submitted Teachers:', teachers);
    };

    const labels = {
        title: 'Register Trainee',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        class: 'Class',
        gender: 'Gender',
        password: 'Password',
        phone: 'Phone Number',
        subject: 'Subject',
        designation: 'Designation',
        addAnother: 'Add another teacher',
        addTeacher: 'Register Teacher'
    };

    return (
        <Container fluid className="usersContainer ">
            <Row>
                <Col xs={12} md={2} className="sidebar">
                    <Sidebar/>
                </Col>
                <Col xs={12} md={10} className="main-content">
                    <div className="header d-flex justify-content-end m-3">
                        <Button className="ExportUserBtn me-2">Export CSV</Button>
                        <Button className="ToggleUserBtn" onClick={() => setShowUserList(!showUserList)}>
                            {showUserList ? 'Add Trainer' : 'List Trainers'}
                        </Button>
                    </div>
                    {showUserList ? (
                        <UserList/>
                    ) : (
                        <AddUser
                            initialTeachers={initialTeachers}
                            onSubmit={handleSubmit}
                            labels={labels}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Users;
