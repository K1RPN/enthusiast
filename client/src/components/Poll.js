import React, { useState } from 'react';

const Poll = ({ chatId }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', votes: 0 }, { text: '', votes: 0 }]);

    const addOption = () => {
        setOptions((prevOptions) => [...prevOptions, { text: '', votes: 0 }]);
    };

    const updateOption = (index, text) => {
        setOptions((prevOptions) =>
            prevOptions.map((option, i) => (i === index ? { ...option, text } : option))
        );
    };

    const submitPoll = () => {
        // Здесь вы можете отправить данные голосования на сервер
        console.log('Poll submitted:', { chatId, question, options });
    };

    return (
        <div>
            <h1>Create a Poll</h1>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question"
            />
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <input type="text" value={option.text}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={addOption}>Add Option</button>
            <button onClick={submitPoll}>Submit Poll</button>
        </div>
    );
};

export default Poll;

