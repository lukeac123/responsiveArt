import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './designs/aliceInWonderland/index'
import CircularMotionSpeaker from './designs/circularMotionSpeaker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <CircularMotionSpeaker/>
  </React.StrictMode>
);
