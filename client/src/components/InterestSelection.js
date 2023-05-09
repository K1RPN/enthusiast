import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveInterests, updateUser, setAuthToken } from '../services/api';
import './InterestSelection.css';
const localStorage = window.localStorage;

const InterestSelection = () => {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    const navigate = useNavigate();
    const [interests, setInterests] = useState(['Музыка', 'Кино', 'Спорт', 'Технологии', 'Путешествия']);
    const [newInterest, setNewInterest] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [birthdate, setBirthdate] = useState({ day: '', month: '', year: '' });
    const [occupation, setOccupation] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const occupations = [
        'Web-разработчик',
        'Дизайнер',
        'Менеджер по продажам',
        'Копирайтер',
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        setAuthToken(token);
        try {
            const response = await updateUser(birthdate, null, name, gender, occupation, userId);
            window.localStorage.setItem('userId', response.data.user.id);
            await saveInterests(selectedInterests);
            navigate('/profile-setup');
        } catch (error) {
            console.error('Error updating user:', error);
            // Здесь вы можете обработать ошибку, например, показать сообщение об ошибке пользователю
        }
    };


    const handleInterestToggle = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleAddInterest = () => {
        if (newInterest.trim()) {
            setInterests([...interests, newInterest]);
            setNewInterest('');
        }
    };

    const renderInterests = () => {
        return interests.map((interest, index) => (
            <div
                key={index}
                className={`interest-item${selectedInterests.includes(interest) ? ' selected' : ''}`}
                onClick={() => handleInterestToggle(interest)}
            >
                {interest}
            </div>
        ));
    };

    return (
        <div className="interest-selection">
            <h2>Расскажите нам немного больше</h2>
            <p>Добавьте информацию о себе, чтобы ваши единомышленники могли познакомиться с вами</p>
            <div className="form-container">
            <div className="interests-grid">{renderInterests()}</div>
            <div>
                <input
                    type="text"
                    placeholder="Добавить интерес"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                />
                <button onClick={handleAddInterest}>Добавить</button>
            </div>
            <hr />
            <form onSubmit={handleSubmit} className="user-info-form">
                <label>
                    Ваше имя:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                    />
                </label>
                <br />
                <label>
                    Род деятельности:
                    <select
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    >
                        <option value="">Выберите ваш род деятельности</option>
                        {occupations.map((occupation, index) => (
                            <option key={index} value={occupation}>
                                {occupation}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Пол:
                    <div className="gender-selection">
                        <div
                            className={`gender-item${gender === 'male' ? ' selected' : ''}`}
                            onClick={() => setGender('male')}
                        >
                            Мужской
                        </div>
                        <div
                            className={`gender-item${gender === 'female' ? ' selected' : ''}`}
                            onClick={() => setGender('female')}
                        >
                            Женский
                        </div>
                    </div>
                </label>
                <br />
                <label>
                    Дата рождения:
                    <div className="birthdate-selection">
                        <select
                            value={birthdate.day}
                            onChange={(e) => setBirthdate({ ...birthdate, day: e.target.value })}
                        >
                            <option value="">День</option>
                            {[...Array(31).keys()].map((n) => (
                                <option key={n} value={n + 1}>{n + 1}</option>
                            ))}
                        </select>
                        <select
                            value={birthdate.month}
                            onChange={(e) => setBirthdate({ ...birthdate, month: e.target.value })}
                        >
                            <option value="">Месяц</option>
                            {[
                                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                            ].map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <select
                            value={birthdate.year}
                            onChange={(e) => setBirthdate({ ...birthdate, year: e.target.value })}
                        >
                            <option value="">Год</option>
                            {[...Array(101).keys()].map((n) => (
                                <option key={n} value={2023 - n}>{2023 - n}</option>
                            ))}
                        </select>
                    </div>
                </label>
                <br />
                <button
                    type="submit"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                    }}
                >
                    Продолжить
                </button>
            </form>
        </div>
        </div>
    );
};

export default InterestSelection;