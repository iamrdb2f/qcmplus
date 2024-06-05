import React from 'react';
import "./Users.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import UpdateForm from "../../components/UpdateForm/UpdateForm";

const Users = () => {

    const initialTeachers = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', class: 'Math', gender: 'Male', password: '1234', phone: '1234567890', subject: 'Mathematics', designation: 'Professor' }
    ];

    const handleSubmit = (teachers) => {
        console.log('Submitted Teachers:', teachers);
    };

    const labels = {
        title: 'Register Teachers',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        class: 'Class',
        gender: 'Gender',
        password: 'Password',
        phone: 'Phone Number',
        subject: 'Subject',
        designation: 'Designation',
        addAnother: 'Add another teacher',
        addTeacher: 'Register Teacher'
    };






    return (
        <div className="usersContainer">
            <Sidebar/>
            <div className="main-content">
                <div className="header">
                    <button className="export-csv">Export CSV</button>
                    <button className="add-teachers">Add Teachers</button>
                </div>
                <div>
                    <UpdateForm
                        initialTeachers={initialTeachers}
                        onSubmit={handleSubmit}
                        labels={labels}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
