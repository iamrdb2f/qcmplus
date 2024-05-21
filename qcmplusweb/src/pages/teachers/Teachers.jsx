import React from 'react';
import "./style.css";

const TEACHERSLIST = [
    {id: 1, name: 'John Doe', age: 20, major: 'Computer Science'},
    {id: 2, name: 'Jane Doe', age: 22, major: 'Mathematics'},
    {id: 3, name: 'Jim Doe', age: 21, major: 'Physics'},
    {id: 4, name: 'Jill Doe', age: 19, major: 'Biology'},
    {id: 5, name: 'Jake Doe', age: 23, major: 'Chemistry'},
];

const TeachersDetails = ({teacher}) => (
    <div key={teacher.id}>
        <h2>{teacher.name}</h2>
        <p>Age: {teacher.age}</p>
        <p>Major: {teacher.major}</p>
    </div>
);

const Teachers = () => {
    return (
        <div className={"centerContent"}>
            {TEACHERSLIST.map(teacher => (
                <TeachersDetails teacher={teacher}/>
            ))}
        </div>
    );
}
export default Teachers;

