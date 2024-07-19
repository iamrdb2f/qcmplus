import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

const UserRow = ({ user, onView, onUpdate, onDelete }) => (
    <tr>
        <td>{user.index + 1}</td>
        <td>{user.firstName || 'N/A'}</td>
        <td>{user.lastName || 'N/A'}</td>
        <td>{user.gender || 'N/A'}</td>
        <td>{user.phoneNumber || 'N/A'}</td>
        <td>{user.email || 'N/A'}</td>
        <td>{user.jobTitle || 'N/A'}</td>
        <td className="d-none d-md-table-cell">{user.company || 'N/A'}</td>
        <td>
            <Badge pill bg={user.isActive ? "success" : "secondary"} className="status-badge">
                {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
        </td>
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

export default UserRow;
