import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src="/assets/logo2.png" alt="Логотип" />
                </Link>
                <nav className="nav">
                    <Link to="/login" className="login-btn">
                        Вход
                    </Link>
                    <Link to="/register" className="register-btn">
                        Регистрация
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
