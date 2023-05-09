// src/components/Home.js
import React, { useState, useEffect } from 'react';
import SwipeCards from './SwipeCards';
import InterestFilter from './InterestFilter';
import UserSearch from './UserSearch';


const Home = () => {
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    // Загрузка пользователей для компонента SwipeCards
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const handleUserSearch = (searchTerm) => {
        fetch(`/api/users/search?username=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => setSearchResults(data));
    };

    const handleInterestFilter = (selectedInterests) => {
        fetch(`/api/users/filter?interests=${selectedInterests.join(',')}`)
            .then((response) => response.json())
            .then((data) => setUsers(data));
    };

    return (
        <div>
            <UserSearch onSearch={handleUserSearch} />
            <InterestFilter onFilter={handleInterestFilter} />
            {searchResults.length > 0 ? (
                <div>
                    <h2>Search Results:</h2>
                    {/* Отображение результатов поиска */}
                </div>
            ) : (
                <SwipeCards users={users} />
            )}
        </div>
    );
};

export default Home;
