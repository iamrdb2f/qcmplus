import React from 'react';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";
import { ListGroup, Row } from "react-bootstrap";
import { isAdminUser } from "../../services/AuthService";
import Logout from "../LogOut/Logout";
import AdminMenu from "../AdminMenu/AdminMenu";
import UserMenu from "../UserMenu/UserMenu";

const Sidebar = ({ onItemClick, selectedItem }) => {
    const isAdmin = isAdminUser();

    const renderAdminItem = (item, Icon, label) => {
        return (
            <ListGroup.Item
                className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
                onClick={() => onItemClick(item)}
            >
                <Icon className="sidebar-icon" />
                <span>{label}</span>
            </ListGroup.Item>
        );
    };

    const renderUserItem = (item, Icon, label) => {
        return (
            <ListGroup.Item
                className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
                onClick={() => onItemClick(item)}
            >
                <Icon className="sidebar-icon" />
                <span>{label}</span>
            </ListGroup.Item>
        );
    };

    return (
        <>
            <Row className="mt-2 mb-5 text-center">
                <ImgLogo link="/" />
            </Row>
            <ListGroup>
                {isAdmin ? (
                    <AdminMenu renderAdminItem={renderAdminItem} />
                ) : (
                    <UserMenu renderUserItem={renderUserItem} />
                )}
            </ListGroup>
            <Logout />
        </>
    );
};

export default Sidebar;
