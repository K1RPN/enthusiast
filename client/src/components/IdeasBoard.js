// src/components/IdeasBoard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import IdeaCard from './IdeaCard';

function IdeasBoard() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axiosInstance.get('/api/ideas');
                setIdeas(response.data);
            } catch (error) {
                console.error('Error fetching ideas:', error);
            }
        };

        fetchIdeas();
    }, []);

    const voteIdea = async (ideaId, value) => {
        try {
            await axiosInstance.post('/api/ideas/vote', { ideaId, value });
            const updatedIdeas = ideas.map((idea) => {
                if (idea.id === ideaId) {
                    return { ...idea, rating: idea.rating + value };
                }
                return idea;
            });
            setIdeas(updatedIdeas);
        } catch (error) {
            console.error('Error voting for idea:', error);
        }
    };

    return (
        <div>
            <h1>Ideas Board</h1>
            <div>
                {ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} onVote={voteIdea} />
                ))}
            </div>
        </div>
    );
}

export default IdeasBoard;
