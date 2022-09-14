/* 
- Stream Audio from URL / connect to computer audio input
- Define starting position of the Objects using the windowWidth
- Change colour of objects from audio
- Change from JS into Typescript
*/

import React from 'react';
import {useState, useEffect} from 'react'
import Box from './box'

let signals;
let audioContext;

const frequencyBands = [
    { Eq: 'bass', frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10}, 
    { Eq: 'lowMids', frequency: 400, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40 },
    { Eq: 'highMids', frequency: 800, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80}, 
    { Eq: 'highs', frequency: 2000, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100}, 
  ];

  const audio = new Audio();
    audioContext = new AudioContext();

    audio.src = '/dnb.mp3';
    audio.controls = true
    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

  signals = frequencyBands.map(({ frequency, colour, Eq, signal }) => {
    const analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 1;
    const analyserData = new Float32Array(analyserNode.fftSize);
    const filterNode = audioContext.createBiquadFilter();
    filterNode.frequency.value = frequency;
    filterNode.Q.value = 1;
    filterNode.type = "bandpass";
    source.connect(filterNode);
    filterNode.connect(analyserNode);

    return {
      analyserNode,
      colour,
      analyserData,
      Eq,
    };
  });

  

export default function App() {

    const [bass, setBass] = useState()
    const [lowMids, setlowMids] = useState()
    const [highMids, setHighMids] = useState()
    const [highs, setHighs] = useState()

      useEffect(() => {
        if (audio){
        audio.addEventListener('timeupdate', signalsUpdate)
        }
        // return () => {
        //  if(audio){
        //   audio.removeEventListener('timeupdate', signalsUpdate)
        // }}
      },[audio])

      function signalsUpdate(){
       signals.map(({analyserNode, analyserData, Eq, colour, signal}, i) => {
          analyserNode.getFloatTimeDomainData(analyserData);
          signal = rootMeanSquaredSignal(analyserData); //Take array of data and convert into average
          signal = signal*window.innerWidth*3 //Make the signal proportional to the height / width of the screen

          if(Eq === 'bass'){
            setBass(signal)
            // setBass(signal, colour), why isn't this working ?
          }
          if(Eq === 'lowMids'){
            setlowMids(signal)
          }
          if(Eq === 'highMids'){
            setHighMids(signal)
          }
          if(Eq === 'highs'){
            setHighs(signal)
          }
  
      });
  
    }

    function handleClick(){
      audio.play();
    };


    

  return (
    <div>
    <button onClick = {handleClick} style = {{background: 'transparrent', width: '100vw', zIndex: 1, height: '30px', borderColor: 'black', textDecorationColor: 'white'}}>  Play  </button>
      <div style = {{position: 'absolute', top: '0px', display: 'flex'}}>
        <Box signal={bass}/>
        <div style = {{background: 'blue', height: '100px', width: `${lowMids}px`}}> </div>
        <div style = {{background: 'green', height: '100px', width: `${highMids}px`}}> </div>
        <div style = {{background: 'orange', height: '100px', width: `${highs}px`}}> </div>
      </div>
    </div>
  );
}

  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }


