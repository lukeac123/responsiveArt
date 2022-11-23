import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './designs/aliceInWonderland/index'
// import CircularMotionSpeaker from './designs/circularMotionSpeaker';
import Mixer from './mixer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Mixer/>
    {/*<App />*/}
    {/* <CircularMotionSpeaker/> */}
  </React.StrictMode>
);
