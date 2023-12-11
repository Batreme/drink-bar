import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Home from './components/Home.js';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <p className='HB1'>Drink-Bar!</p>
  <Home />
    <App />
  </>
);