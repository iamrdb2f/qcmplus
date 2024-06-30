import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Modal, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './UserForm.css';
import {postApiUser} from "../../services/UserService";

const UserForm = ({ show, handleClose, user, onSuccess, pageEndpoint }) => {
    const [formData, setFormData] = useState(user || {});
    const [errors, setErrors] = useState({});
    const [apiCallErrorMessage, setApiCallErrorMessage] = useState('');

    const handleMessage = (setMessage, message, timeout = 3000) => {
        setMessage(message);
        setTimeout(() => setMessage(''), timeout);
    };

    useEffect(() => {
        setFormData(user || {});
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});

            try {
                const response = await postApiUser(`${pageEndpoint}/${formData["userId"]}`, formData);
                if (response.error) {
                    handleMessage(setApiCallErrorMessage, response.message);

                } else {
                    onSuccess(pageEndpoint+' updated successfully.');
                }
            } catch (error) {
                handleMessage(setApiCallErrorMessage, 'Something unexpected happened. Could you try again later? If the issue persists, please contact supports.');
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{user ? 'Modify existing  '+pageEndpoint +' information' : 'Update User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {apiCallErrorMessage && <Alert variant="danger" className={"mx-5 "}>{apiCallErrorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Control type="hidden" name="userRole" value={user?.userRole }/>
                    <Row>
                        <Col>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={formData.gender || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.gender}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="F">Female</option>
                                    <option value="M">Male</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.gender}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ''}
                                    onChange={handleChange}
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
                            <Form.Group controlId="formJobTitle">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="company"
                                    value={formData.company || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" className="QcmPlusBtn w-100 mt-3">
                        {user ? 'Update ' +user?.userRole.toLowerCase() : 'Update User'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

UserForm.propTypes = {
    pageEndpoint: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
};

export default UserForm;
