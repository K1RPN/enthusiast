import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import StartupInfo from './StartupInfo';
import ManageStartup from './ManageStartup';

const StartupPage = ({ startupId }) => {
    const [startup, setStartup] = useState(null);

    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const response = await axiosInstance.get(`/api/startups/${startupId}`);
                setStartup(response.data);
            } catch (error) {
                console.error('Error fetching startup:', error);
            }
        };

        fetchStartup();
    }, [startupId]);
    const handleAddMember = async (email) => {
        try {
            const response = await axiosInstance.post(`/api/startups/${startupId}/members`, { email });
            setStartup((prevState) => ({
                ...prevState,
                members: [...prevState.members, response.data],
            }));
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };
    const handleRemoveMember = async (memberId) => {
        try {
            await axiosInstance.delete(`/api/startups/${startupId}/members/${memberId}`);
            setStartup((prevState) => ({
                ...prevState,
                members: prevState.members.filter((member) => member.id !== memberId),
            }));
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };
    const handleUpdate = async (updatedStartup) => {
        try {
            await axiosInstance.put(`/api/startups/${startupId}`, updatedStartup);
            setStartup(updatedStartup);
        } catch (error) {
            console.error('Error updating startup:', error);
        }
    };

    if (!startup) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <StartupInfo startup={startup} />
            <ManageStartup
                startup={startup}
                onUpdate={handleUpdate}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
            />
        </div>
    );
};

export default StartupPage;
