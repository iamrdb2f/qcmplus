import React from 'react';
import {FaBook, FaHome, FaPoll} from 'react-icons/fa';
import {ListGroup} from 'react-bootstrap';

const UserMenu = ({renderUserItem}) => {
    return (
        <ListGroup>
            <>
                {renderUserItem('UserDashboard', FaHome, 'Dashboard')}
                {renderUserItem('TakeExams', FaBook, 'Take Exams')}
                {renderUserItem('HistoryExams', FaPoll  , 'History Exams')}
            </>
        </ListGroup>
    );
};

export default UserMenu;
