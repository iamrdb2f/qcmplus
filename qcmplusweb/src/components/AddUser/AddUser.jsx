import React, {useState} from 'react';
import './AddUser.css';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {addOrUpdateUser} from "../../services/UserService";
import {initialUserState, labels, validateForm} from '../../utils/FormValidation'; // Correct the path as needed

const AddUser = () => {
    const [users, setUsers] = useState([initialUserState]);
    const [errors, setErrors] = useState({});
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = users[0];
        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setErrorMessage('Please fill out all fields correctly.');
            setSuccessMessage('');
            return;
        }

        setErrors({});
        const response = await addOrUpdateUser(null, formData);
        if (response.error) {
            setErrorMessage(`Error: ${response.message}`);
            setSuccessMessage('');
        } else {
            setUsers([initialUserState]);
            setErrorMessage('');
            setSuccessMessage('New User added successfully!');
        }
    };

    const renderUserForm = (user, index) => (
        <div key={index} className="mb-4">
            <Row>
                <Col>
                    <Form.Group controlId={`gender-${index}`}>
                        <Form.Label>{labels.gender}</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={user.gender}
                            onChange={(e) => handleChange(index, e)}
                            isInvalid={!!errors.gender}
                        >
                            <option value="">Select Gender</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`role-${index}`}>
                        <Form.Label>{labels.role}</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={user.role}
                            onChange={(e) => handleChange(index, e)}
                            isInvalid={!!errors.role}
                        >
                            <option value="">Select Role</option>
                            <option value="ADMIN">Administrator</option>
                            <option value="TRAINEE">Trainee</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.role}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`phoneNumber-${index}`}>
                        <Form.Label>{labels.phoneNumber}</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Phone Number"
                            isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`firstName-${index}`}>
                        <Form.Label>{labels.firstName}</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter First Name"
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`lastName-${index}`}>
                        <Form.Label>{labels.lastName}</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Last Name"
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`email-${index}`}>
                        <Form.Label>{labels.email}</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Email"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`password-${index}`}>
                        <Form.Label>{labels.password}</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Password"
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={`jobTitle-${index}`}>
                        <Form.Label>{labels.jobTitle}</Form.Label>
                        <Form.Control
                            type="text"
                            name="jobTitle"
                            value={user.jobTitle}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Job Title"
                            isInvalid={!!errors.jobTitle}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.jobTitle}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={`company-${index}`}>
                        <Form.Label>{labels.company}</Form.Label>
                        <Form.Control
                            type="text"
                            name="company"
                            value={user.company}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter Company"
                            isInvalid={!!errors.company}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.company}
                        </Form.Control.Feedback>
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
