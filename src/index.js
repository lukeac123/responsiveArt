import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './designs/tiles/index';
import App from './solarSystem/index'
// import App from './designs/circularMotionSpeaker'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
