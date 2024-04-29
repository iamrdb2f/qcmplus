import {useEffect, useState} from "react";


const  User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Registered Items</h1>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default User;
