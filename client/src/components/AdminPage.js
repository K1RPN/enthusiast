// components/AdminPage.js
// components/AdminPage.js

import React, { useState, useEffect } from 'react';
import { getUsers, getChats, getStartups } from '../services/api';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [usersResponse, chatsResponse, startupsResponse] = await Promise.all([
                getUsers(),
                getChats(),
                getStartups(),
            ]);

            setUsers(usersResponse.data);
            setChats(chatsResponse.data);
            setStartups(startupsResponse.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {
                <div>
                <h1>Страница администратора</h1>
                <div>
                <h2>Пользователи</h2>
                <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
                ))}
                </ul>
                </div>
                <div>
                <h2>Чаты</h2>
                <ul>
            {chats.map((chat) => (
                <li key={chat.id}>{chat.title}</li>
                ))}
                </ul>
                </div>
                <div>
                <h2>Стартапы</h2>
                <ul>
            {startups.map((startup) => (
                <li key={startup.id}>{startup.name}</li>
                ))}
                </ul>
                </div>
                </div>
                }
        </div>
    );
};

export default AdminPage;