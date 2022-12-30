import React from 'react';
import Sketch from "react-p5";
import Tiles from './elements/tiles'
import SpectrumAnalyser from './elements/standardAnalyser';
import BallAnalyser from './elements/ballAnalyser';
import BouncingBall from './elements/bouncingBall';
import {useState } from 'react'
import {PlayArrow, Stop} from '@mui/icons-material';

// I think we want the option to be able to defione a colour palette at the top level and then custoize for individual elements if desired.

//TODO: 1. 
//TODO: 2. open and close draw loop on play / stop
//TODO: 3. look into smoothing constants to make less glitchy (average out the signal change)
//TODO: 4. look into processing.js, if only using p5.js for draw loop can repace with setTimeOut

let signals;
let spectrumData;

const audio = new Audio();
const audioContext = new AudioContext();

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio : true, video: false })
        .then((stream) => {
          audio.srcObject = stream;
          audio.onloadedmetadata = (e) => {
            console.log(e)
            console.log("media is fetched and ready to play")
          };
        })   
      } else {
        console.log("getUserMedia not supported.")
      }

    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

function setup (p5, canvasParentRef){
    let xyz = p5.createCanvas(500, 500).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    let z = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y, z)
  };


const frequencyBands = [
    { frequency: 100, colour: 'hsl(100,50%,50%)', filterType: 'lowpass'}, 
    { frequency: 400, colour: 'hsl(200,60%,50%)', filterType: 'bandpass'},
    { frequency: 800, colour: 'hsl(300,40%,50%)', filterType: 'bandpass'}, 
    { frequency: 1500, colour: 'hsl(400,70%,50%)', filterType: 'lowPass'}, 
  ];

  function signalsUpdate(rawFrequencyBandData){
    const normalisedFrequnecyBandData = rawFrequencyBandData.map(({analyserData, analyserNode}) => {
      analyserNode.getFloatTimeDomainData(analyserData);
      let signal = rootMeanSquaredSignal(analyserData);
      signal = Math.floor(signal*15000)
      spectrumData = analyserData
      return signal
    })
    return normalisedFrequnecyBandData
  };

//TODO: Modify the below so the filter type can be changed for the different frequencies (low / high pass for top and bottom)
  signals = frequencyBands.map(({ frequency, filterType }) => {
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
      analyserData
    };
  });

export default function Mixer() {
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

      function draw(p5){
        // p5.background('black')
        const normalisedFrequencyBandData = signalsUpdate(signals)  
        setOutput(normalisedFrequencyBandData)  
    }

  return (
    <div className='base' style = {{display: 'flex', background: 'black', position: 'absolute', top:0, left: 0, height: '100vh', width: '100vw'}}>

      <span className='buttonBar' style = {{height: '30px', position: 'absolute', background: 'black', zIndex:99 }} >
      <button className='button' classes={{fill: 'black', colour: 'black'}} onClick = {handlePlay} >
        {playing? <Stop/>:<PlayArrow/>}
      </button>
      </span>
      {/* {spectrumData &&  <SpectrumAnalyser float32Array={spectrumData}/> } */}
      {/* {output &&  <Tiles output={output}/> } */}
      {/* {spectrumData &&  <BallAnalyser float32Array={spectrumData}/> } */}
      {spectrumData &&  <BouncingBall float32Array={spectrumData}/> }
      <Sketch setup={setup} draw={draw} />
    </div>

    
  );
}

// style = {{position: 'absolute', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1}}

  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }

