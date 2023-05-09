// src/components/SwipeCards.js
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './SwipeCards.css';

const SwipeCards = ({ users }) => {
    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, user) => {
        setLastDirection(direction);
        // Здесь вы можете отправить запрос на сервер о принятии или отклонении пользователя
    };

    return (
        <div className="swipeCards">
            {users.map((user) => (
                <TinderCard
                    className="swipe"
                    key={user.id}
                    onSwipe={(dir) => swiped(dir, user)}
                    preventSwipe={['up', 'down']}
                >
                    <div
                        className="card"
                        style={{ backgroundImage: `url(${user.avatar})` }}
                    >
                        <h3>{user.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    );
};

export default SwipeCards;
