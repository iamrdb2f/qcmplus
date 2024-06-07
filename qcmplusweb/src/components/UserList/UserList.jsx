import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Pagination, Row, Table} from 'react-bootstrap';
import PropTypes from "prop-types";
import './UserList.css';

const UserRow = ({ user, onUpdate, onView, onDelete }) => (
    <tr>
        <td>{user.index + 1}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.gender}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.userRole}</td>
        <td>{user.jobTitle}</td>
        <td>{user.company}</td>
        <td>
            <Button variant="success" size="sm" onClick={() => onView(user)}>View</Button>
            <Button variant="warning" size="sm" onClick={() => onUpdate(user)} className="ms-2">Update</Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(user.id)} className="ms-2">Delete</Button>
        </td>
    </tr>
);

const UserList = ({ title }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/trainees')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const handleView = (user) => {
        console.log('handleView user:', user);
    };
    const handleUpdate = (user) => {
        console.log('Update user:', user);
    };

    const handleDelete = (userId) => {
        fetch(`http://localhost:8080/trainees/${userId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== userId));
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => console.error('There was an error!', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <UserRow
                        key={index}
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
