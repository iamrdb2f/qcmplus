import React, {useState} from 'react';
import './AddUser.css';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';

const AddUser = ({ initialUsers = [], onSubmit, labels }) => {
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

    const [users, setUsers] = useState(initialUsers.length ? initialUsers : [initialUserState]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = { ...updatedUsers[index], [name]: value };
            return updatedUsers;
        });
    };

    const addUser = () => {
        setUsers(prevUsers => [...prevUsers, initialUserState]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/trainee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(users[0]),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Network response was not ok', response.status, response.statusText, text);
                setErrorMessage(`Error: ${response.status} ${response.statusText}`);
                setSuccessMessage('');
                return;
            }

            const newUser = await response.json();
            console.log('Trainee added successfully:', newUser);
            setUsers([initialUserState]);
            setErrorMessage('');
            setSuccessMessage('User added successfully!');

            if (onSubmit) {
                onSubmit(newUser);
            }
        } catch (error) {
            console.error('There was an error adding the trainee:', error);
            setErrorMessage('There was an error adding the trainee. Please try again later.');
            setSuccessMessage('');
        }
    };

    const renderUserForm = (user, index) => (
        <div key={index} className="mb-4">
            <Row>
                <Col>
                    <Form.Group controlId={`gender-${index}`}>
                        <Form.Label>{labels.gender || 'Gender'}</Form.Label>
                        <Form.Control as="select" name="gender" value={user.gender} onChange={(e) => handleChange(index, e)}>
                            <option value="">Select Gender</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`firstName-${index}`}>
                        <Form.Label>{labels.firstName || 'First Name'}</Form.Label>
                        <Form.Control type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`lastName-${index}`}>
                        <Form.Label>{labels.lastName || 'Last Name'}</Form.Label>
                        <Form.Control type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`userRole-${index}`}>
                        <Form.Label>{labels.userRole || 'Role'}</Form.Label>
                        <Form.Control as="select" name="userRole" value={user.userRole} onChange={(e) => handleChange(index, e)}>
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Trainee">Trainee</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`email-${index}`}>
                        <Form.Label>{labels.email || 'Email Address'}</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`password-${index}`}>
                        <Form.Label>{labels.password || 'Password'}</Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`phoneNumber-${index}`}>
                        <Form.Label>{labels.phoneNumber || 'Phone Number'}</Form.Label>
                        <Form.Control type="text" name="phoneNumber" value={user.phoneNumber} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`jobTitle-${index}`}>
                        <Form.Label>{labels.jobTitle || 'Job Title'}</Form.Label>
                        <Form.Control type="text" name="jobTitle" value={user.jobTitle} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`company-${index}`}>
                        <Form.Label>{labels.company || 'Company'}</Form.Label>
                        <Form.Control type="text" name="company" value={user.company} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    return (
        <Container className="formContainer p-5">
            <h3 className="text-center text-bold">{labels.title || 'Add Users'}</h3>
            <Form onSubmit={handleSubmit} className="m-5">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {users.map((user, index) => renderUserForm(user, index))}
                <div className="d-flex justify-content-center">
                    <Button type="submit" className="submitBtn btn-lg">
                        {labels.addBtn || 'Add User'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddUser;
