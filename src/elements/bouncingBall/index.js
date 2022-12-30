import React from 'react';
// import './styles.css'

let positionX = 0
let positionY = 0
let radians = 0
let velocity = 0.01


export default function BouncingBall(){

    radians = radians + velocity
    positionY = positionY + Math.sin(radians)

  return (
    <div className='spectrumAnalyserRoot' style={{position: 'absolute', top: '20vh', left: '20vw', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: '50%', overflow: 'hidden', background: 'blue'}}> 
          <div style={{backgroundColor: `pink`, height: '10px', width: '10px', position: 'absolute', left: `50%`, top: `${positionY}px`, borderRadius: '1000000px' }} />
      </div>
  );
}



// let maybePositive = Math.random() < 0.5 ? -1 : 1
 //positionX =+ positionX + Math.cos(radians)*1
