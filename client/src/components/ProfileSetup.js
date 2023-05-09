import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAvatar } from '../services/api';
import './ProfileSetup.css';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            await uploadAvatar(localStorage.getItem('userId'), file);
        }
        navigate('/dashboard');
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="profile-setup">
            <h2>Выберите аватар</h2>
            <form onSubmit={handleSubmit} className="avatar-form">
                <label htmlFor="file-upload" className="avatar-label">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Выбранный аватар" />
                    ) : (
                        'Нажмите, чтобы выбрать аватар'
                    )}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button type="submit">Продолжить</button>
            </form>
        </div>
    );
};

export default ProfileSetup;