import React, {useEffect, useState} from 'react';
import './AddUser.css';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {addOrUpdateUser} from "../../services/UserService";

const AddUser = ({ pageEndpoint }) => {
    const initialUserState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: '',
        gender: '',
        company: '',
        jobTitle: '',
        phoneNumber: '',
    };

    const labels = {
        title: 'Register ' + pageEndpoint,
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        gender: 'Gender',
        password: 'Password',
        phoneNumber: 'Phone Number',
        jobTitle: 'Job Title',
        company: 'Company',
        addBtn: 'Add User'
    };

    const [users, setUsers] = useState([initialUserState]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const getUserRole = pageEndpoint === "admin" ? "ADMIN" : "TRAINEE";


    useEffect(() => {
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            updatedUsers[0].userRole = getUserRole;
            return updatedUsers;
        });
    }, [pageEndpoint]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = { ...updatedUsers[index], [name]: value };
            return updatedUsers;
        });
    };

    const validateForm = () => {
        for (const user of users) {
            for (const key in user) {
                if (user[key] === '' || user[key] === null || user[key] === undefined) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill out all fields.');
            setSuccessMessage('');
            return;
        }

        const response = await addOrUpdateUser(pageEndpoint, users[0]);
        if (response.error) {
            setErrorMessage(`Error: ${response.message}`);
            setSuccessMessage('');
        } else {
            setUsers([initialUserState]);
            setErrorMessage('');
            setSuccessMessage(`${pageEndpoint} added successfully!`);
        }
    };

    const renderUserForm = (user, index) => (
        <div key={index} className="mb-4">
            <input type="hidden" name="userRole" value={getUserRole}/>
            <Row>
                <Col>
                    <Form.Group controlId={`gender-${index}`}>
                        <Form.Label>{labels.gender}</Form.Label>
                        <Form.Control as="select" name="gender" value={user.gender}
                                      onChange={(e) => handleChange(index, e)}>
                            <option value="">Select Gender</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`firstName-${index}`}>
                        <Form.Label>{labels.firstName}</Form.Label>
                        <Form.Control type="text" name="firstName" value={user.firstName}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`lastName-${index}`}>
                        <Form.Label>{labels.lastName}</Form.Label>
                        <Form.Control type="text" name="lastName" value={user.lastName}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`email-${index}`}>
                        <Form.Label>{labels.email}</Form.Label>
                        <Form.Control type="email" name="email" value={user.email}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`password-${index}`}>
                        <Form.Label>{labels.password}</Form.Label>
                        <Form.Control type="password" name="password" value={user.password}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`phoneNumber-${index}`}>
                        <Form.Label>{labels.phoneNumber}</Form.Label>
                        <Form.Control type="text" name="phoneNumber" value={user.phoneNumber}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`jobTitle-${index}`}>
                        <Form.Label>{labels.jobTitle}</Form.Label>
                        <Form.Control type="text" name="jobTitle" value={user.jobTitle}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`company-${index}`}>
                        <Form.Label>{labels.company}</Form.Label>
                        <Form.Control type="text" name="company" value={user.company}
                                      onChange={(e) => handleChange(index, e)}/>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    return (
        <Container className="formContainer p-5">
            <h3 className="text-center text-bold">{labels.title}</h3>
            <Form onSubmit={handleSubmit} className="m-5">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {users.map((user, index) => renderUserForm(user, index))}
                <div className="d-flex justify-content-center">
                    <Button type="submit" className="submitBtn btn-lg">
                        {labels.addBtn}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddUser;
