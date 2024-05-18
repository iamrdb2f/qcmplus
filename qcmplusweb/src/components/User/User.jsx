import { useEffect, useState } from "react";

const UserRow = ({ user }) => (
    <tr>
        <td>{user.index + 1}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.type}</td>
    </tr>
);

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Registered Users</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <UserRow key={index} user={{ ...user, index }} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;
