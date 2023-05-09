// components/EditUserProfile.js

import React, { useState } from 'react';

const EditUserProfile = ({ user, onSave }) => {
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, password });
    };

    return (
        <div>
            <h1>Редактирование профиля пользователя</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default EditUserProfile;
