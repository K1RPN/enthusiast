import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { setAuthToken,loginUser } from '../services/api';
const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: '/api',
    });
    const handleLoginSuccess = (user) => {
        onLogin(user);
        navigate('/interests');
    };
    async function handleLogin() {
        try {
            const response = await loginUser(email, password);
            window.localStorage.setItem('userId', response.userId); // Сохранение userId
            // Другие действия, такие как сохранение токена и переход на следующую страницу
        } catch (error) {
            // Обработка ошибки входа
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuthToken(response.data.token); // Вы уже добавили эту строку
                handleLoginSuccess(response.data.user);
                onLogin();
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Error during login');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-heading">Вход</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
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
                    <button type="submit" className="auth-btn">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
