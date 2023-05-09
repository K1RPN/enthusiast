import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const root = document.getElementById('root');

if (root) {
    ReactDOM.createRoot(root).render(<App />);
} else {
    console.error('No root element found');
}