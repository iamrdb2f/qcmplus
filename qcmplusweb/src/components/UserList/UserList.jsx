import React, {useEffect, useState} from "react";
import {Alert, Col, Container, Form, Pagination, Row, Table} from 'react-bootstrap';
import PropTypes from "prop-types";
import UserProfile from '../UserProfile/UserProfile';
import UserForm from '../UserForm/UserForm';
import UserRow from '../UserRow/UserRow';
import './UserList.css';
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import {deleteApiUser, getApiUser, postApiUser} from '../../services/UserService';

const UserList = ({ title , pageEndpoint }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleMessage = (setMessage, message, timeout = 3000) => {
        setMessage(message);
        setTimeout(() => setMessage(''), timeout);
    };

    const fetchUsers = async () => {
        try {
            const response = await getApiUser(pageEndpoint);
            if (response.error) {
                handleMessage(setErrorMessage,
                    'We encountered a problem while loading your data. Please try again later.');
                return;
            }
            setUsers(response);
        } catch (error) {
            handleMessage(setErrorMessage,
                'Something unexpected happened. Could you try again later? If the issue persists, please contact supports.');
        }
    };
    const handleSuccess = (msg) => {
        setShowForm(false);
        setSelectedUser(null);
        handleMessage(setSuccessMessage, msg);
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setShowProfile(true);
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
        setShowProfile(false);
        setSelectedUser(null);
    };


    const handleConfirmDelete = async (userId) => {
        const response = await deleteApiUser(`${pageEndpoint}/${userId}`);
        if (response.error) {
            setErrorMessage(response.message);
        } else {
            setUsers(users.filter((user) => user["userId"] !== userId));
            setShowDeleteConfirm(false);
            setSelectedUser(null);
            setSuccessMessage(response.message);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetchUsers();
    }, [pageEndpoint, handleSuccess]);


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
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th className="d-none d-md-table-cell">Email</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <UserRow
                        key={user["userId"] || index}
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
                <p>No users to display</p>
            )}
            {selectedUser && (
                <UserProfile
                    user={selectedUser}
                    show={showProfile}
                    handleClose={handleCloseProfile}
                />
            )}
            <UserForm
                pageEndpoint={pageEndpoint}
                user={selectedUser}
                show={showForm}
                handleClose={handleCloseForm}
                onSuccess={handleSuccess}
            />
            <DeleteConfirmation
                show={showDeleteConfirm}
                handleClose={handleCloseDeleteConfirm}
                handleConfirm={() => handleConfirmDelete(selectedUser["userId"])}
                user={selectedUser}
            />
        </Container>
    );
};

UserList.propTypes = {
    title: PropTypes.string,
};

export default UserList;
