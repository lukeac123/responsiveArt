/* 
- Stream Audio from URL / connect to computer audio input
- Define starting position of the Objects using the windowWidth
- Change colour of objects from audio
- Change from JS into Typescript
*/

//Set the audio input to stream using the aduo context api
//to get a smoother drawing experinece use setTimeout to rerun a draw function at the desired time interval
// use CSS transitions for a smotther drawing 

import React from 'react';
import {useState, useEffect} from 'react'
import Box from './box'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

let signals;
let audioContext;

const frequencyBands = [
    { Eq: 'bass', frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10}, 
    { Eq: 'lowMids', frequency: 200, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40 },
    { Eq: 'highMids', frequency: 400, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80}, 
    { Eq: 'highs', frequency: 2000, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100}, 
  ];

  const audio = new Audio();
    audioContext = new AudioContext();

    // const stream = 'microphone'

    audio.src = '/dnb.mp3';

    // const mediaStreamSource = audioContext.createMediaStreamSource( stream );


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
    filterNode.Q.value = 2;
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

    // const [bass, setBass] = useState({})
    // const [lowMids, setlowMids] = useState({})
    // const [highMids, setHighMids] = useState({})
    // const [highs, setHighs] = useState({})
    const [output, setOutput] = useState([])

      useEffect(() => {
        if (audio){
        audio.addEventListener('timeupdate', signalsUpdate)
        }
        return () => {
         if(audio){
          audio.removeEventListener('timeupdate', signalsUpdate)
        }}
      },[audio])

      function signalsUpdate(){
       let data = signals.map(({analyserNode, analyserData, Eq, colour}, i) => {
          analyserNode.getFloatTimeDomainData(analyserData);
          let signal = rootMeanSquaredSignal(analyserData); //Take array of data and convert into average
          signal = signal*window.innerHeight*3 //Make the signal proportional to the height / width of the screen
          return {signal, colour}
      });
      setOutput(data)      
    }

    const bass = output[0]
    const lowMids = output[1]
    const highMids = output[2]
    const highs = output[3]

    function handleClick(){
      audio.play();
    };


  return (
    <div style = {{display: 'flex'}}>
      {/* use Icon from play button */}
      <button onClick = {handleClick} style = {{background: 'transparent', width: '100vw', zIndex: 1, height: '30px'}}>
        Play
      </button>
      {bass && (
      <div style = {{background: 'black', position: 'absolute', height: '99vh', width: '99vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box data={bass} />
        <Box data={lowMids} />
        <Box data={highMids} />
        <Box data={highs} />
      </div>
      )}
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


