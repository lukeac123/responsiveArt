import React from 'react';
import Sketch from "react-p5";
import {useState, useEffect} from 'react'
import {PlayArrow, Pause, Stop} from '@mui/icons-material';

//TODO: 1. 
//TODO: 2. open and close draw loop on play / stop
//TODO: 3. look into smoothing constants to make less glitchy (average out the signal change)
//TODO: 4. look into processing.js, if only using p5.js for draw loop can repace with setTimeOut

let signals;

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
    p5.fill('black')
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    let z = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y, z)
  };


const frequencyBands = [
    { frequency: 100, colour: 'hsl(100,50%,50%)'}, 
    { frequency: 400, colour: 'hsl(200,60%,50%)'},
    { frequency: 800, colour: 'hsl(300,40%,50%)'}, 
    { frequency: 1500, colour: 'hsl(400,70%,50%)'}, 
  ];


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

export default function Mixer() {
  const [playing, setPlaying] = useState(false)
  const [output, setOutput] = useState([])
  const [analyserData, setAnalyserData] = useState([])

  function handlePlay(){
    if (!playing){
      audio.play();
      setPlaying(true);
    } else {
    audio.pause();
    setPlaying(false);
  }}

      function draw(p5){
       let data = signals.map(({analyserNode, analyserData, colour}, i) => {
          analyserNode.getFloatTimeDomainData(analyserData);
          let signal = rootMeanSquaredSignal(analyserData); 
          // need to normalise the signal between 0-100 so works with HSL
          // if alayser data sin't linear the below won't work 
          signal = Math.floor(signal*1000)
          setAnalyserData(analyserData) 
          return {signal, colour, i, analyserData}
      });
      setOutput(data)  
      p5.fill('blue') 
      p5.circle(300,300,output[0]?.signal*100)

      p5.fill('red') 
      p5.circle(300,300,output[1]?.signal*100)

      p5.fill('green') 
      p5.circle(300,300,output[2]?.signal*100)

      p5.fill('pink') 
      p5.circle(300,300,output[3]?.signal*100)

    }


// can this be intergrated into the signals update function ?
    const bass = output[0]
    const lowMids = output[1]
    const highMids = output[2]
    const highs = output[3]

    console.log(bass?.signal)

  return (
    <div className='base'>
        Mixer Test

      <span className='buttonBar' style = {{height: '30px'}} >
      <button className='button' classes={{fill: 'white', colour: 'white'}} onClick = {handlePlay} >
        {playing? <Stop/>:<PlayArrow/>}
      </button>
      </span>

    <span>
      {bass?.signal}
    </span>

      <Sketch setup={setup} draw={draw} className="App" />
    
      
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

