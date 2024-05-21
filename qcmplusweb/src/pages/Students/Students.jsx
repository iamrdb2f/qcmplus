import React from 'react';
import "./Students.css";

const Students = () => {
    const students = [
        {id: 1, name: 'John Doe', age: 20, major: 'Computer Science'},
        {id: 2, name: 'Jane Doe', age: 22, major: 'Mathematics'},
        {id: 3, name: 'Jim Doe', age: 21, major: 'Physics'},
        {id: 4, name: 'Jill Doe', age: 19, major: 'Biology'},
        {id: 5, name: 'Jake Doe', age: 23, major: 'Chemistry'},
    ];

    return (
        <div className={"centerContent"}>
            {students.map(student => (
                <div key={student.id}>
                    <h2>{student.name}</h2>
                    <p>Age: {student.age}</p>
                    <p>Major: {student.major}</p>
                </div>
            ))}
        </div>
    );
}

export default Students;

