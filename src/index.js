import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './designs/abstract/index'
// import App from './designs/tiles/index';
import App from './solarSystem/index'
// import App from './designs/circularMotionSpeaker'
// import App from './designs/circularMotion'
// import App from './test'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
