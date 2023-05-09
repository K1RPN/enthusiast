import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useState } from "react";
import InterestSelection from "./components/InterestSelection";
import LoginForm from "./components/LoginForm";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import DatingPage from "./components/DatingPage";
import SearchPage from "./components/SearchPage";
import Header from './components/Header';
import ProfileSetup from './components/ProfileSetup';

const App = () => {
    const [user, setUser] = useState(null);
    const [interestsSelected, setInterestsSelected] = useState(false);

    // Моковые данные для интересов
    const mockInterests = [
        "Программирование",
        "Дизайн",
        "Маркетинг",
        "Финансы",
    ];
    const handleUserLogin = (user) => {
        setUser(user);
    };

    const handleInterestSubmit = (selectedInterests) => {
        // Сохраните выбранные интересы для пользователя (например, отправьте их на сервер)
        console.log("Выбранные интересы:", selectedInterests);
        setInterestsSelected(true);
    };

    return (
        <Router>
            <div>
                <Header />
            </div>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/login"
                    element={!user ? <LoginForm onLogin={handleUserLogin} /> : <Navigate to="/" />}
                />
                <Route
                    path="/interests"
                    element={
                        !interestsSelected ? (
                            <InterestSelection
                                interests={mockInterests}
                                onInterestSubmit={handleInterestSubmit}
                            />
                        ) : (
                            <Navigate to="/profile-setup" />
                        )
                    }
                />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};

export default App;
