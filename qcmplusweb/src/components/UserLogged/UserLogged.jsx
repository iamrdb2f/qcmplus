import React from 'react';
import {FaUser} from 'react-icons/fa';
import {ListGroup} from "react-bootstrap";

const UserLogged =({selectedItem, onItemClick, getUser}) => {
    return (
        <ListGroup.Item
            className={`sidebar-item ${selectedItem === 'UserProfile' ? 'active' : ''}`}
            onClick={() => onItemClick('UserProfile')}
        >
            <FaUser className="sidebar-icon"/>
            <span>{getUser}</span>
        </ListGroup.Item>
    );
};

export default  UserLogged;