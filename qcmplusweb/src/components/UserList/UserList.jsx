import React, {useEffect, useState} from "react";
import {Alert, Col, Container, Form, Pagination, Row, Table} from 'react-bootstrap';
import PropTypes from "prop-types";
import UserProfile from '../UserProfile/UserProfile';
import UserForm from '../UserForm/UserForm';
import UserRow from '../UserRow/UserRow';
import './UserList.css';
import DeleteConfirmation from "../Modals/DeleteConfirmation";

const UserList = ({ title = "Registered Trainee" }) => {
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

    const fetchUsers = () => {
        fetch('http://localhost:8080/trainees')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => {
                console.error('There was an error fetching trainees!', error);
                setErrorMessage('There was an error fetching trainees. Please try again later.');
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const handleUpdateUser = (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        console.log(user);

        const url = `http://localhost:8080/trainee/${user.userId}`;

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(savedUser => {
                setUsers(users.map(u => (u.userId === savedUser.userId ? savedUser : u)));
                setShowForm(false);
                setSelectedUser(null);
                setSuccessMessage('User updated successfully.');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                console.error('There was an error saving the user!', error);
                setErrorMessage('There was an error saving the user. Please try again later.');
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    const handleConfirmDelete = (userId) => {
        fetch(`http://localhost:8080/trainee/${userId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                setUsers(users.filter(user => user.userId !== userId));
                setShowDeleteConfirm(false);
                setSelectedUser(null);
                setSuccessMessage('User deleted successfully.');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error);
                setErrorMessage('There was an error deleting the user. Please try again later.');
                setTimeout(() => setErrorMessage(''), 3000);
            });
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
                        key={user.userId || index} // Use user.userId if available, otherwise use index
                        user={{ ...user, index: indexOfFirstUser + index }}
                        onView={handleView}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
                </tbody>
            </Table>
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
                handleSave={handleUpdateUser}
            />
            <DeleteConfirmation
                show={showDeleteConfirm}
                handleClose={handleCloseDeleteConfirm}
                handleConfirm={() => handleConfirmDelete(selectedUser.userId)}
                user={selectedUser}
            />
        </Container>
    );
};

UserList.propTypes = {
    title: PropTypes.string,
}

export default UserList;
