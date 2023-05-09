// src/services/api.js

import axiosInstance from '../utils/axiosInstance';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
});
instance.interceptors.request.use((config) => {
    // Получение токена из localStorage (или из другого места, где вы храните токен)
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
async function saveInterests(interests) {
    try {
        const response = await instance.post('/interests/add-interests', {
            interests
        });

        if (response.status === 200) {
            console.log('Interests saved successfully.');
        } else {
            console.error('Failed to save interests.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function loginUser(email, password) {
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function fetchUsers(interests) {
    const queryParams = interests ? `?interests=${interests.join(',')}` : '';

    try {
        const response = await instance.get(`/users${queryParams}`);

        if (response.status === 200) {
            const users = response.data;
            return users;
        } else {
            console.error('Failed to fetch users.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function uploadAvatar(avatarFile) {
    const apiUrl = 'http://localhost:3001/api'; // Исправлено определение apiUrl
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await fetch(`${apiUrl}/users/avatar`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload avatar: ${response.statusText}`);
    }

    return await response.json();
}
export function setAuthToken(token) {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const decoded = jwtDecode(token);
        if (decoded.id) {
            localStorage.setItem('userId', decoded.id);
        }
        console.log('setAuthToken:', `Bearer ${token}`);
    } else {
        delete instance.defaults.headers.common['Authorization'];
        localStorage.removeItem('userId'); // добавить эту строку для удаления userId из локального хранилища при выходе пользователя из аккаунта
    }
}
const updateUser = async (birthdate, avatar, name, gender, occupation) => {
    const userId = localStorage.getItem('userId');
    const userData = {
        birthdate,
        avatar,
        name,
        gender,
        occupation,
    };

    try {
        const response = await instance.put(`/users/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem('userId', userId);
        return response.data;
    } catch (error) {
        console.error('Ошибка обновления пользователя:', error);
        throw error;
    }
};

const getStartups = () => instance.get('/startup'); // Замените 'api' на 'instance'
export { saveInterests, updateUser, getStartups, uploadAvatar };

