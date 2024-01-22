import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { YoutubeProvider } from './context/youtubeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <YoutubeProvider>
    <App />
  </YoutubeProvider>
);
