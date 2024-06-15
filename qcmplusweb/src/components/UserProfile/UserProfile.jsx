import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserProfile = ({ user, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                <p><strong>Role:</strong> {user.userRole}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Job Title:</strong> {user.jobTitle}</p>
                <p><strong>Company:</strong> {user.company}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default UserProfile;
