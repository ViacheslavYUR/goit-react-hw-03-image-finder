import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import css from './components/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className={css.App} />
  </React.StrictMode>
);
