import React from 'react';
import ReactDOM from 'react-dom/client';
import Mixer from './mixerTest'
// import App from './designs/aliceInWonderland/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
     <React.StrictMode>
    {/* <App/> */}
    <Mixer/>
    {/* <CircularMotionSpeaker/> */}
  </React.StrictMode>
  </div>
 
);
