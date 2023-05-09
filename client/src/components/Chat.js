import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';

const Chat = ({ userId, chatId, isGroupChat }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [encryptionKey, setEncryptionKey] = useState('your-encryption-key');
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:3000');

        socketRef.current.emit('join', { userId, chatId });

        socketRef.current.on('newMessage', (message) => {
            const decryptedMessage = CryptoJS.AES.decrypt(message, encryptionKey).toString(CryptoJS.enc.Utf8);
            setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [userId, chatId, encryptionKey]);

    const sendMessage = (e) => {
        e.preventDefault();
        const encryptedMessage = CryptoJS.AES.encrypt(message, encryptionKey).toString();
        socketRef.current.emit('sendMessage', encryptedMessage);
        setMessage('');
    };

    return (
        <div>
            <h1>{isGroupChat ? 'Group Chat' : 'Individual Chat'}</h1>
            <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
