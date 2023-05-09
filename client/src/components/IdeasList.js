import React from 'react';
import IdeaItem from './IdeaItem';

const IdeasList = ({ ideas, onVote }) => {
    return (
        <div className="ideas-list">
            {ideas.map((idea) => (
                <IdeaItem key={idea.id} idea={idea} onVote={onVote} />
            ))}
        </div>
    );
};

export default IdeasList;
