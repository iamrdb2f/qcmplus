import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Pagination, Row, Table} from 'react-bootstrap';
import PropTypes from "prop-types";
import './UserList.css';
import UserProfile from "../UserProfile/UserProfile";
import UserForm from "../UserForm/UserForm";

const UserRow = ({ user, onView, onUpdate, onDelete }) => (
    <tr>
        <td>{user.index + 1}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.gender}</td>
        <td>{user.phoneNumber}</td>
        <td className="d-none d-md-table-cell">{user.email}</td>
        <td>{user.jobTitle}</td>
        <td>{user.company}</td>
        <td>
            <Button variant="success" size="sm" onClick={() => onView(user)}>View</Button>
            <Button variant="warning" size="sm" onClick={() => onUpdate(user)} className="ms-2">Update</Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(user)} className="ms-2">Delete</Button>
        </td>
    </tr>
);

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    onView: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const UserList = ({ title }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/trainees')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('There was an error!', error));
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

    const confirmDelete = () => {
        fetch(`http://localhost:8080/trainees/${selectedUser.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== selectedUser.id));
                    setShowDeleteConfirm(false);
                    setSelectedUser(null);
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => console.error('There was an error!', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (user) => {
        const requestOptions = {
            method: user.id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        const url = user.id ? `http://localhost:8080/trainees/${user.id}` : 'http://localhost:8080/trainees';

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(savedUser => {
                if (user.id) {
                    setUsers(users.map(u => (u.id === savedUser.id ? savedUser : u)));
                } else {
                    setUsers([...users, savedUser]);
                }
                setShowForm(false);
                setSelectedUser(null);
            })
            .catch(error => console.error('There was an error!', error));
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
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                        key={user.id}
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
                handleSave={handleSaveUser}
            />
            <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete
                    {selectedUser && selectedUser.firstName}
                    {selectedUser && selectedUser.lastName}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

UserList.defaultProps = {
    title: "Registered Trainee",
}

UserList.propTypes = {
    title: PropTypes.string.isRequired,
}

export default UserList;
