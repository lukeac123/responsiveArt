/* 
- Stream Audio from URL / connect to computer audio input
- Define starting position of the Objects using the windowWidth
- Change colour of objects from audio
- Change from JS into Typescript
*/

import React from 'react';
import {useState, useEffect} from 'react'

let signals;
let audioContext;

const frequencyBands = [
    { Eq: 'bass', frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10 }, 
    { Eq: 'lowMids', frequency: 400, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40  },
    { Eq: 'highMids', frequency: 800, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80 }, 
    { Eq: 'high', frequency: 2000, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100 }, 
  ];

  const audio = new Audio();
    audioContext = new AudioContext();

    audio.src = '/test.mp3';
    audio.controls = true
    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

  signals = frequencyBands.map(({ frequency, colour, Eq }) => {
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
      colour
    };
  });

  

export default function App() {

    const [bass, setBass] = useState(100)
    // const [lowMids, setlowMids] = useState()
    // const [highMids, setHighMids] = useState()
    // const [highs, setHighs] = useState()

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
       signals.map(({analyserNode, analyserData, Eq, colour}, i) => {
          analyserNode.getFloatTimeDomainData(analyserData);
          let signal = rootMeanSquaredSignal(analyserData); //Take array of data and convert into average
          signal = signal*1000 //Make the signal proportional to the height / width of the screen
          setBass(signal)
          //{[Eq]: signal, 'colour': colour}
      });
    }

    function handleClick(){
      audio.play();
    };
    

  return (
    <div>
      <div style = {{position: 'absolute', top: '0px'}}>
        <div style = {{background: 'pink', height: '100px', width: `${bass}px`}}> </div>
        <button onClick = {handleClick} style = {{background: 'transparrent', width: '100vw', zIndex: 1, height: '30px', borderColor: 'black', textDecorationColor: 'white'}}>  Play  </button>
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


  // setlowMids(signalAmplitude[1].lowMids)
      // setHighMids(signalAmplitude[2].highMids)
      // setHighs(signalAmplitude[3].highs)


