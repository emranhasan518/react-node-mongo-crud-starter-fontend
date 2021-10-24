import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    //Load data
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data =>setUsers(data));
    },[]);

    //delete an user
    const handleDeleteUSer = id =>{
        const procced = window.confirm('are ypu sure you want to delete?');
        if(procced){
            const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.deletedCount>0){
                alert("user deleted successfully");
                const remainingUsers = users.filter(user=>user._id !== id);
                setUsers(remainingUsers);
            }
        })
        }
    }

    return (
        <div>
            <h2>Users available: {users.length}</h2>
            <ul>
                {
                    users.map(user =>
                    <li
                    key={user._id}
                    >
                    {user.name}:: {user.email}
                    <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={()=> handleDeleteUSer(user._id)}> X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;