// src/components/InterestFilter.js
import React, { useState } from 'react';

const InterestFilter = ({ onFilter }) => {
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleFilter = (event) => {
        event.preventDefault();
        onFilter(selectedInterests);
    };

    const toggleInterest = (interest) => {
        setSelectedInterests((prevSelectedInterests) =>
            prevSelectedInterests.includes(interest)
                ? prevSelectedInterests.filter((i) => i !== interest)
                : [...prevSelectedInterests, interest]
        );
    };

    // Здесь должен быть список всех доступных категорий интересов
    const interests = ['Sports', 'Technology', 'Music', 'Arts'];

    return (
        <form onSubmit={handleFilter}>
            {interests.map((interest) => (
                <label key={interest}>
                    <input
                        type="checkbox"
                        value={interest}
                        checked={selectedInterests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                    />
                    {interest}
                </label>
            ))}
            <button type="submit">Filter</button>
        </form>
    );
};

export default InterestFilter;
