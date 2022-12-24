import React from 'react';
import './styles.css'

//Float array of 2048 values passed in as the props
//2058 needs to be mapped to the 100vw 
//map over the array and draw bars for each value in the array

let testArray = [1,2,3,4,5,6,7,8,9,10]

export default function spectrumAnalyser({float32Array}){ 

  let newArray = []

  float32Array.map(x => {
      x=Math.floor(x*-1000)
      newArray.push(x)
  })

  return (
    <div className='spectrumAnalyserRoot' style={{position: 'absolute', top: '10vh', left: '10vw', display: 'fixed', alignContent: 'center', justifyContent: 'center', width: '800vw', height: '80vh', overflow: 'hidden'}}> 
      {newArray?.map(element => {
        //element = Math.floor(element*100000)
        return( 
          <div style={{backgroundColor: `white`, height: `${element}vh`, width: '0.04vw', display: 'inline-block', position: 'relative', left: 0 }} />
        )})}
        <div style={{position: 'relative', backgroundColor: 'red', height: `20px`, width: '80vw', left: 0}}/>
      </div>
  );
}