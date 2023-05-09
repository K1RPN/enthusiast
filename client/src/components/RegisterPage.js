import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: '/api',
});
const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterSuccess = (user) => {
        navigate('/interests');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('http://localhost:3000/api/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            handleRegisterSuccess(response.data.user);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Ошибка регистрации');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-heading">Регистрация</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="auth-input"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="auth-input"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="auth-input"
                        />
                    </div>
                    <button type="submit" className="auth-btn">Создать</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
