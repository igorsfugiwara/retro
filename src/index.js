// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar o 'react-dom/client'
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Criar a raiz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);