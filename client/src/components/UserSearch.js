// src/components/UserSearch.js
import React, { useState } from 'react';

const UserSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username with @"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default UserSearch;
