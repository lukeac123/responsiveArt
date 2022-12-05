import React from 'react';
import ReactDOM from 'react-dom/client';
import Mixer from './mixer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <Mixer/>
    </React.StrictMode>
  </div>
 
);
