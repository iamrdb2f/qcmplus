import React from 'react';
import {
    FaBook,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaFileAlt,
    FaHome,
    FaQuestionCircle,
    FaRegStar,
    FaUserGraduate
} from 'react-icons/fa';

const AdminMenu =({renderAdminItem}) =>{
    return (
        <>
            {renderAdminItem('AdminDashboard', FaHome, 'Dashboard')}
            {renderAdminItem('Admin', FaChalkboardTeacher, 'Admin')}
            {renderAdminItem('Trainee', FaUserGraduate, 'Trainee')}
            {renderAdminItem('Exams', FaBook, 'Exams')}
            {renderAdminItem('Quizzes', FaFileAlt, 'Quizzes')}
            {renderAdminItem('Questions', FaQuestionCircle, 'Questions')}
            {renderAdminItem('Answers', FaCommentAlt, 'Answers')}
            {renderAdminItem('Features', FaRegStar, 'Features')}
        </>
    );
};

export default AdminMenu;