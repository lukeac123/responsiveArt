import React from 'react';
import './styles.css'

//Float array of 2048 values passed in as the props
//2058 needs to be mapped to the 100vw 
//map over the array and draw bars for each value in the array



export default function ballAnalyser({float32Array}){ 

  const newArray = []

  float32Array.map(x => {
      x=Math.floor(x*-1000)
      newArray.push({signal: x, colour: 'green'})
  })

  return (
    <div className='spectrumAnalyserRoot' style={{position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', overflow: 'hidden'}}> 
      {newArray?.map(element => {
        //element = Math.floor(element*100000)
        return( 
          <div style={{backgroundColor: `${element.colour}`, height: `${element.signal}vh`, width: '0.04vw', display: 'block', position: 'relative', left: 0 }} />
        )})}
      </div>
  );
}