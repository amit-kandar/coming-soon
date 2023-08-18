import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from 'react-modal'; // Import Modal

Modal.setAppElement('#root'); // Set the app element for accessibility

createRoot(document.getElementById('root')).render(<App />);
