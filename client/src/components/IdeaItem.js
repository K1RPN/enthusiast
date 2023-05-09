import React, { useState } from 'react';

const IdeaItem = ({ idea, onVote }) => {
    const [votes, setVotes] = useState(idea.votes);

    const handleVote = (value) => {
        setVotes(votes + value);
        onVote(idea.id, value);
    };

    return (
        <div className="idea-item">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <div className="votes">
                <button onClick={() => handleVote(1)}>Upvote</button>
                <button onClick={() => handleVote(-1)}>Downvote</button>
                <span>Votes: {votes}</span>
            </div>
        </div>
    );
};

export default IdeaItem;
