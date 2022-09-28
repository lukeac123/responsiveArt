/* 
- Stream Audio from URL / connect to computer audio input
- Change from JS into Typescript
- use css to create smoother drawing transitions
*/

import React from 'react';
import {useState, useEffect} from 'react'
import Box from './box'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

let signals;
let audioContext;

export default function App() {
  const [playing, setPlaying] = useState(false)
  const [output, setOutput] = useState([])

  function handlePlay(){
    if (!playing){
      audio.play();
      setPlaying(true);
    } else {
    audio.pause();
    setPlaying(false);
  }}

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
       let data = signals.map(({analyserNode, analyserData, colour}, i) => {
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


  return (
    <div style = {{display: 'flex'}}>
      <button onClick = {handlePlay} style = {{background: 'transparent', width: '100vw', zIndex: 1, height: '30px'}}>
        <PlayCircleIcon />
      </button>
      {output && (
      <div style = {{background: 'black', position: 'absolute', height: '99vh', width: '99vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
      </div>
      )}
    </div>
  );
}

const frequencyBands = [
  { frequency: 100, colour: 'hsl(50,100%,50%)'}, 
  { frequency: 400, colour: 'hsl(100,100%,50%)'},
  { frequency: 800, colour: 'hsl(150,100%,50%)'}, 
  { frequency: 1500, colour: 'hsl(230,100%,50%)'}, 
];

const audio = new Audio();
  audioContext = new AudioContext();
  audio.src = '/house.mp3';

  const source = audioContext.createMediaElementSource(audio);
  let gainNode = audioContext.createGain();
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

signals = frequencyBands.map(({ frequency, colour }) => {
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
    analyserData
  };
});

function rootMeanSquaredSignal(data) {
  let rms = 0;
  for (let i = 0; i < data.length; i++) {
    rms += data[i] * data[i];
  }
  return Math.sqrt(rms / data.length);
}


