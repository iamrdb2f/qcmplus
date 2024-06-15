import React, {useState} from 'react';
import "./AddUser.css"
import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const AddUser = ({ initialUsers, onSubmit, labels }) => {
    const [users, setUsers] = useState(initialUsers || [{ firstName: '', lastName: '', email: '', password: '', userRole: '', gender: '', company: '', jobTitle: '', phoneNumber: '' }]);

    const handleChange = (index, e) => {
        const newUsers = [...users];
        newUsers[index][e.target.name] = e.target.value;
        setUsers(newUsers);
    };

    const addUser = () => {
        setUsers([...users, { firstName: '', lastName: '', email: '', password: '', userRole: '', gender: '', company: '', jobTitle: '', phoneNumber: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(users);
        }
    };

    return (
        <Container className={  "formContainer p-5"}>
            <h3 className={"text-center text-bold"}>{labels.title || 'Add Users'}</h3>
            <Form onSubmit={handleSubmit} className={"m-5"}>
                {users.map((user, index) => (
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
                                    <Form.Control type="text" name="firstName" value={user.firstName}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`lastName-${index}`}>
                                    <Form.Label>{labels.lastName || 'Last Name'}</Form.Label>
                                    <Form.Control type="text" name="lastName" value={user.lastName}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`userRole-${index}`}>
                                    <Form.Label>{labels.userRole || 'Role'}</Form.Label>
                                    <Form.Control as="select" name="userRole" value={user.userRole} onChange={(e) => handleChange(index, e)}>
                                        <option value="">Select Role</option>
                                        <option value="Admin">Administrateur</option>
                                        <option value="Trainee">Trainee</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={`email-${index}`}>
                                    <Form.Label>{labels.email || 'Email Address'}</Form.Label>
                                    <Form.Control type="email" name="email" value={user.email}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`password-${index}`}>
                                    <Form.Label>{labels.password || 'Password'}</Form.Label>
                                    <Form.Control type="password" name="password" value={user.password}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={`phoneNumber-${index}`}>
                                    <Form.Label>{labels.phoneNumber || 'Phone Number'}</Form.Label>
                                    <Form.Control type="text" name="phoneNumber" value={user.phoneNumber}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`jobTitle-${index}`}>
                                    <Form.Label>{labels.jobTitle || 'Job Title'}</Form.Label>
                                    <Form.Control type="text" name="jobTitle" value={user.jobTitle}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`company-${index}`}>
                                    <Form.Label>{labels.company || 'Company'}</Form.Label>
                                    <Form.Control type="text" name="company" value={user.company}
                                                  onChange={(e) => handleChange(index, e)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                ))}

                <div className="d-flex justify-content-center">
                    <Button  type="submit" className="submitBtn btn-lg">
                        {labels.addUser || 'Add User'}
                    </Button>
                </div>

            </Form>
        </Container>
    );
};

export default AddUser;
