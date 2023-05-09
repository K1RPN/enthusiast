// components/ManageStartup.js
import React, { useState } from 'react';

const ManageStartup = ({ startup, onUpdate, onAddMember, onRemoveMember }) => {
    const [name, setName] = useState(startup.name);
    const [description, setDescription] = useState(startup.description);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const handleUpdate = () => {
        onUpdate({ ...startup, name, description });
    };
    const handleAddMember = async () => {
        try {
            await onAddMember(newMemberEmail);
            setNewMemberEmail('');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            await onRemoveMember(memberId);
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };
    return (
        <div className="manage-startup">
            {/* ...другие поля и кнопки... */}
            <h3>Add Member</h3>
            <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Member Email"
            />
            <button onClick={handleAddMember}>Add Member</button>
            <h3>Remove Member</h3>
            <ul>
                {startup.members.map((member) => (
                    <li key={member.id}>
                        {member.name}{' '}
                        <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageStartup;
