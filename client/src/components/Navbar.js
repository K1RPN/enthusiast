import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="brand">App</Link>
                <div className="nav-links">
                    <Link to="/login" className="nav-link">Войти</Link>
                    <Link to="/register" className="nav-link">Зарегистрироваться</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
