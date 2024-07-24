import React from 'react';
import {Badge, Button, ListGroup, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {FaMars, FaUser, FaVenus} from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = ({ show, handleClose, user }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <div className="user-profile text-center">
                        <div className="text-center mb-4">
                            <div className="position-relative d-inline-block">
                                <FaUser className="user-icon" size={150} />
                                <span className="gender-icon position-absolute top-0 start-100 translate-middle">
                                    {user.gender === 'MALE' ? <FaMars size={24} /> : <FaVenus size={24} />}
                                </span>
                            </div>
                        </div>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="center-text"><strong>First Name:</strong> {user.firstName}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Last Name:</strong> {user.lastName}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Gender:</strong> {user.gender}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Email:</strong> {user.email}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Phone Number:</strong> {user.phoneNumber}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Job Title:</strong> {user.jobTitle}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Company:</strong> {user.company}</ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Role:</strong>
                                <Badge bg={user.role && user.role.roleName === 'ADMIN' ? 'primary' : 'secondary'} className="ms-2">
                                    {user.role ? user.role.roleName : 'N/A'}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Status:</strong>
                                <Badge bg={user.isActive ? 'success' : 'secondary'} className="ms-2">
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item className="center-text"><strong>Created Date:</strong> {new Date(user.createdDate).toLocaleDateString()}</ListGroup.Item>
                        </ListGroup>
                    </div>
                ) : (
                    <p className="text-center">No user selected</p>
                )}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button className="QcmPlusBtn" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

UserProfile.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.object,
};

export default UserProfile;
