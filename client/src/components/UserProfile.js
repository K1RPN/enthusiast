// components/UserProfile.js

import React from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(localStorage.getItem('userId'));
            setUser(response.data);
        };

        fetchUser();
    }, []);

    return (
    <div>
        {user ? (
            <>
                <h1>{user.name}</h1>
                <img src={user.avatar} alt="User Avatar" />
                <p>Age: {user.age}</p>
                <p>Occupation: {user.occupation}</p>
                {/* Остальные элементы профиля */}
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
};

export default UserProfile;
