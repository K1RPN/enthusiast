// components/StartupInfo.js
import React from 'react';

const StartupInfo = ({ startup }) => {
    return (
        <div className="startup-info">
            <h2>{startup.name}</h2>
            <p>{startup.description}</p>
            <h3>Members</h3>
            <ul>
                {startup.members.map((member) => (
                    <li key={member.id}>{member.name}</li>
                ))}
            </ul>
            <h3>Ideas</h3>
            <ul>
                {startup.ideas.map((idea) => (
                    <li key={idea.id}>{idea.title}</li>
                ))}
            </ul>
            <h3>Chats</h3>
            <ul>
                {startup.chats.map((chat) => (
                    <li key={chat.id}>{chat.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StartupInfo;
