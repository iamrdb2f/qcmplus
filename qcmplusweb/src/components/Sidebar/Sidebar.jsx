import React from 'react';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";
import {ListGroup,Row} from "react-bootstrap";
import {getLoggedInUser, isAdminUser} from "../../services/AuthService";
import UserLogged from "../UserLogged/UserLogged";
import Logout from "../LogOut/Logout";
import AdminMenu from "../AdminMenu/AdminMenu";

const Sidebar = ({onItemClick, selectedItem}) => {
    const isAdmin = isAdminUser();
    const getUser = getLoggedInUser();

    const renderAdminItem = (item, Icon, label) => {
        return isAdmin ? <ListGroup.Item
            className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
        >
            <Icon className="sidebar-icon"/>
            <span>{label}</span>
        </ListGroup.Item>: null;
    };

    return (
        <>
            <Row className={"mt-2 mb-5 text-center"}>
                <ImgLogo link="/"/>
            </Row>
            <UserLogged selectedItem={selectedItem} onItemClick={onItemClick} getUser={getUser}/>
            <AdminMenu renderAdminItem={renderAdminItem}/>
            <Logout/>
        </>
    );
};
export default Sidebar;