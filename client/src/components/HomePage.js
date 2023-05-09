import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="text-container">
                Добро пожаловать в ENTHUSIAST
            </div>
            <div className="image-container">
                <img src={process.env.PUBLIC_URL + '/assets/PhotoForMainPage.png'} alt="Логотип" />
            </div>
        </div>
    );
};

export default HomePage;