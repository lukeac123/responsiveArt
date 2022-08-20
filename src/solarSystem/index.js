import React from 'react';
import Sketch from "react-p5";
import {useState, useEffect} from 'react'
import SolarSystem from './solarSystem';

/* 
- Establish way to duplicate whole system
- Stream Audio from URL
- Define starting position of the Objects using the windowWidth
- Overlay button over sketch so audio starts when sketch is clicked, re-rending causes sketch to disappear
- Change colour of objects from audio
- Change from JS into Typescript

*/


const frequencyBands = [
  { frequency: 50, colour: '#C38D9E'}, 
  { frequency: 200, colour: '#41B3A3'},
  { frequency: 400, colour: '#E8A87C'}, 
  { frequency: 800, colour: '#85DCBA'}, 
  { frequency: 2000, colour: '#E27D60'}, 
];


function App() {

  const [audio, setAudio] = useState(new Audio);
  audio.src = '/intro.mp3';
  let signals = []

  const audioContext = new AudioContext();
  const source = audioContext.createMediaElementSource(audio);
  let gainNode = audioContext.createGain();
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  function handleClick(){
    audio.play();
    console.log(audio.currentTime)
  };

  //Add the event listener to retrigger the singals function every thime the time updates 
  //From the singals function an array of objects needs to be returned with each objct containing the specified values
  //At the moment signals isn't a callable function 
  //When converting
  useEffect(()=> {
    audio.addEventListener('timeupdate', getSignals)
  },[])

  function getSignals(){
    signals = frequencyBands.forEach(({frequency, colour}) => {
      const analyserNode = audioContext.createAnalyser();
      analyserNode.smoothingTimeConstant = 1;
      const analyserData = new Float32Array(analyserNode.fftSize);
      const filterNode = audioContext.createBiquadFilter();
      filterNode.frequency.value = frequency;
      filterNode.Q.value = 1;
      filterNode.type = "bandpass";

      source.connect(filterNode);
      filterNode.connect(analyserNode);
      console.log(analyserData)

      return{
        analyserData,
        analyserNode,
        colour
      }
    });

    return signals
  }

  // console.log(signals)
    

  return (
    <div>
      {/* <Sketch setup={setup} draw={draw}/> */}
      <button onClick = {handleClick} style = {{width: '98vw', zIndex: 1, background: 'black', height: '30px', borderColor: 'black', textDecorationColor: 'white'}}>  Play  </button>

      {signals.map(({analyserNode, analyserData, colour}, i) => {
        return(
        <SolarSystem analyserNode = {analyserNode} colour={colour} analyserData={analyserData} canvasWidth={500} canvasHeight={500} canvasX={0} canvasY={0} />
      // <SolarSystem audio = {audio} analyserNode = {analyserNode} colour={colour} analyserData={analyserData}  canvasWidth={500} canvasHeight={500} canvasX={500} canvasY={0}/>
      )})}
    </div>
  );
}

export default App;
