// components/UserPage.js

import React, { useState, useEffect } from 'react';
import { getUser } from '../api';

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUser(userId);
            setUser(response.data);
        };

        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Профиль пользователя: {user.name}</h1>
            {/* Здесь вы можете добавить другие компоненты для отображения друзей, стартапов и т. д. */}
        </div>
    );
};

export default UserPage;
