import React, {useState} from 'react';
import {Alert, Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteConfirmation = ({ show, handleClose, handleConfirm, user }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const confirmDelete = () => {
        if (!user || !user.id) {
            setErrorMessage('User ID is undefined. Cannot delete user.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        handleConfirm(user.id);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                Are you sure you want to delete {user && (user.firstName || 'this user')} {user && user.lastName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteConfirmation.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    user: PropTypes.object,
};

export default DeleteConfirmation;
