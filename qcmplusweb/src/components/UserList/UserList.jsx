import React, {useCallback, useEffect, useState} from "react";
import {Alert, Col, Container, Form, Pagination, Row, Table} from 'react-bootstrap';
import PropTypes from "prop-types";
import UserProfile from '../UserProfile/UserProfile';
import UserForm from '../UserForm/UserForm';
import UserRow from '../UserRow/UserRow';
import './UserList.css';
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import {handleApiError, removeUser, retrieveUser} from '../../services/UserService';

function displayErrorMessage(setAlertMessage, messageText) {
    setAlertMessage(messageText);
    setTimeout(() => setAlertMessage(''), 3000); // Clear the alert message after 3 seconds
}

function useUserState(userRole) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchAndGetUsers = useCallback(async () => {
        try {
            const response = await retrieveUser();
            if (response.error) {
                displayErrorMessage(setAlertMessage, handleApiError().message);
                return;
            }
            const filteredUsers = response.filter(user => user.role === userRole);
            setUsers(filteredUsers);
        } catch (error) {
            displayErrorMessage(setAlertMessage, handleApiError().message);
        }
    }, [userRole]);

    const handleDeleteUser = async (userId) => {
        const response = await removeUser(userId);
        if (response.error) {
            return response.message;
        }
        setUsers(users.filter((user) => user.id !== userId));
        return response.message;
    };

    useEffect(() => {
        fetchAndGetUsers();
    }, [fetchAndGetUsers]); // Call fetchAndGetUsers only when userRole changes

    return { users, selectedUser, setSelectedUser, fetchAndGetUsers, handleDeleteUser, alertMessage, setAlertMessage };
}

const UserList = ({ title, userRole }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const {
        users,
        selectedUser,
        setSelectedUser,
        fetchAndGetUsers,
        handleDeleteUser,
        alertMessage,
        setAlertMessage
    } = useUserState(userRole);


    const onSuccessMessage = (msg) => {
        fetchAndGetUsers();
        setShowForm(false);
        setSelectedUser(null);
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleUpdate = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteConfirm(true);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseProfile = () => {
        setAlertMessage('');
        setSelectedUser(null);
        setShowProfile(false);
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setShowProfile(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = async (userId) => {
        const message = await handleDeleteUser(userId);
        setSuccessMessage(message);
        setShowDeleteConfirm(false);
    };

    // filter users based on search term and paginate the results
    const filteredUsers = users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const indexOfLastUser = currentPage * 12;
    const indexOfFirstUser = indexOfLastUser - 12;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / 12);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [userRole]);

    return (
        <Container fluid className="mb-5">
            <Row className="mb-3">
                <Col>
                    <h4 className="text-start mb-3">{title}</h4>
                </Col>
                <Col>
                    <div className="search-bar">
                        <Form.Control
                            type="text"
                            placeholder="Search for user by name or email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </Col>
            </Row>

            {alertMessage && <Alert variant="danger" className={"text-center"}>{alertMessage}</Alert>}
            {successMessage && <Alert variant="success" className={"text-center"}>{successMessage}</Alert>}

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th className="d-none d-md-table-cell">Company</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <UserRow
                        key={user.id || index}
                        user={{ ...user, index: indexOfFirstUser + index }}
                        onView={handleView}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
                </tbody>
            </Table>
            {totalPages > 0 ? (
                <Pagination className="custom-pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            ) : (
                <p className={"text-center"}>No users to display</p>
            )}
            {selectedUser && (
                <UserProfile
                    user={selectedUser}
                    show={showProfile}
                    handleClose={handleCloseProfile}
                />
            )}
            <UserForm
                user={selectedUser}
                show={showForm}
                handleClose={handleCloseForm}
                onSuccess={onSuccessMessage}
                pageEndpoint="user"
            />

            <DeleteConfirmation
                show={showDeleteConfirm}
                handleClose={handleCloseDeleteConfirm}
                handleConfirm={() => handleConfirmDelete(selectedUser.id)}
                user={selectedUser}
            />
        </Container>
    );
};

UserList.propTypes = {
    title: PropTypes.string,
    userRole: PropTypes.string.isRequired,
};

export default UserList;
