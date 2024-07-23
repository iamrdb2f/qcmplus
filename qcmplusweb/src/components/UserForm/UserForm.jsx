import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Badge, Button, Col, Form, Modal, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './UserForm.css';
import {addOrUpdateUser} from "../../services/UserService";
import {USERFORM_TEXTS} from "./UserFormText";
import {validateForm} from '../../utils/FormValidation';
import {GENDER, ROLE} from "../../utils/UtilLists";


const UserForm = ({show, handleClose, user, onSuccess}) => {
    const initialFormData = useMemo(() => ({
        ...user,
        isActive: user?.isActive ?? true,
        createdDate: user?.createdDate ? new Date(user.createdDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
    }), [user]);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [apiCallErrorMessage, setApiCallErrorMessage] = useState('');

    const handleMessage = (setMessage, message, timeout = 3000) => {
        setMessage(message);
        setTimeout(() => setMessage(''), timeout);
    };

    useEffect(() => {
        if (!show) {
            setFormData(initialFormData);  // Reset form data to initial state
            setErrors({});  // Clear validation errors
        } else {
            setFormData({
                ...user,
                isActive: user?.isActive ?? true,
                createdDate: user?.createdDate ? new Date(user.createdDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
            });
        }
    }, [show, user, initialFormData]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({...prevState, [name]: type === 'checkbox' ? checked : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});

            try {
                const response = await addOrUpdateUser(user.id, formData);
                if (response.error) {
                    handleMessage(setApiCallErrorMessage, response.message);
                } else {
                    onSuccess(USERFORM_TEXTS.updateUserSuccess);
                }
            } catch (error) {
                handleMessage(setApiCallErrorMessage, USERFORM_TEXTS.unexpectedError);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{'Modify existing User information'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {apiCallErrorMessage && <Alert variant="danger" className="mx-5 ">{apiCallErrorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="role"
                                    value={formData.role || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.role}
                                >
                                    <option value="">Select Role</option>
                                    <option value={ROLE.ADMIN} selected={formData.role === ROLE.ADMIN}>Administrator
                                    </option>
                                    <option value={ROLE.TRAINEE} selected={formData.role === ROLE.TRAINEE}>Trainee
                                    </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.role}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formIsActive">
                                <Form.Label>Active User</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    name="isActive"
                                    label={
                                        <Badge pill bg={formData.isActive ? "success" : "secondary"}
                                               className="status-badge">
                                            {formData.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    }
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prevState => ({
                                        ...prevState,
                                        isActive: e.target.checked
                                    }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formCreatedDate">
                                <Form.Label>Created Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="createdDate"
                                    value={formData.createdDate || new Date().toISOString().slice(0, 16)}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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
                                    <option value={GENDER.FEMALE}
                                            selected={formData.gender === GENDER.FEMALE}>{GENDER.FEMALE}</option>
                                    <option value={GENDER.MALE}
                                            selected={formData.gender === GENDER.MALE}>{GENDER.MALE}</option>
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
                                    type=""
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
                    <Button type="submit" className="QcmPlusBtn w-100 mt-3">{USERFORM_TEXTS.updateSubmitBtn}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

UserForm.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
};

export default UserForm;
