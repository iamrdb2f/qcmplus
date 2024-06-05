import React from 'react';
import {FaBook, FaChalkboardTeacher, FaHome, FaRegStar, FaUserGraduate} from 'react-icons/fa';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header mb-5 pb-5">
                <ImgLogo/>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <FaHome className="sidebar-icon"/>
                    <span>Dashboard</span>
                </li>
                <li className="sidebar-item active">
                    <FaChalkboardTeacher className="sidebar-icon"/>
                    <span>Trainer</span>
                </li>
                <li className="sidebar-item">
                    <FaUserGraduate className="sidebar-icon"/>
                    <span>Trainee</span>
                </li>
                <li className="sidebar-item">
                    <FaBook className="sidebar-icon"/>
                    <span>Exams</span>
                </li>
            </ul>
            <ul className="sidebar-menu mt-5 py-5">
                <li className="sidebar-item new-feature">
                    <FaRegStar className="sidebar-icon"/>
                    <span>Features</span>
                    <span className="new-badge">NEW</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
