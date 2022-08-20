import React from 'react';
import Sketch from "react-p5";
import {useState, useRef} from 'react'

/* 
- Establish way to duplicate whole system
- Stream Audio from URL
- Define starting position of the Objects using the windowWidth
- Overlay button over sketch so audio starts when sketch is clicked, re-rending causes sketch to disappear
- Change colour of objects from audio, would have to change colours to HSL and iterate over in draw loop
- Change from JS into Typescript

*/

let signals;
let audioContext;

const tilesX = 5
const tilesY = 4

let setup = (p5, canvasParentRef) => {

  const width = p5.windowWidth - 50
  const height = p5.windowHeight - 50

  let xyz = p5.createCanvas(width, height).parent(canvasParentRef);
  let x = (p5.windowWidth - p5.width) / 2;
  let y = (p5.windowHeight - p5.height) / 2;
  let z = (p5.windowHeight - p5.height) / 2;
  xyz.position(x, y, z);
}


const frequencyBands = [
    { frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10 }, 
    { frequency: 200, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40  },
    { frequency: 400, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80 }, 
    { frequency: 800, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100 }, 
    { frequency: 2000, colour: '#E27D60', particleX: 300, particleSize: 10, circleRadius: 200 }, 
  ];

export default function App(p5) {

    const audio = new Audio;
    audioContext = new AudioContext();

    // const sketch = new Sketch()
    // console.log(sketch)


    audio.src = '/test.mp3';
    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    signals = frequencyBands.map(({ frequency, colour, particleSize, circleRadius, particleX }) => {
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
          particleSize,
          circleRadius,
          particleX
        };
      });

    function draw(p5) {
        p5.background("black");

        const xIncrement = p5.windowWidth / tilesX
        const yIncrement = p5.windowHeight / tilesY
        const colours = ['#C38D9E', '#41B3A3', '#E8A87C', '#85DCBA', '#E27D60' ]
      
        for (let x = 0; x<p5.windowWidth; x=x+xIncrement){
          for(let y = 0; y<p5.windowHeight; y=y+yIncrement){

            p5.stroke('white')
            p5.noFill()
            p5.rect(x,y,xIncrement, yIncrement)

          }}

          for (let x = xIncrement/2; x<p5.windowWidth; x=x+xIncrement){
            for(let y = yIncrement/2; y<p5.windowHeight; y=y+yIncrement){
            //const positions = [{x:0,y:0},{x:500,y:500},{x: width,y:0},{x: width,y: height},{x:width/2,y:height/2}]

          signals.forEach(({analyserNode, analyserData, colour}, i) => {
            analyserNode.getFloatTimeDomainData(analyserData);
            let signal = rootMeanSquaredSignal(analyserData);
            signal = p5.min(p5.width, p5.height)*signal

            const randomColour = p5.random(colours)

              p5.noStroke()
              p5.fill(randomColour)
              // p5.rect (x, y, signal)
              p5.circle (x, y, signal)

        });
        }}
    };

    function handleClick(){
      audio.play();
    };
    

  return (
    <div style = {{background: 'black', paddingY: '10px', width: '98vw', height: '98vh'}}>
      <div>
        <Sketch setup={setup} draw={draw} onClick = {handleClick} />
      </div>
      <div style = {{position: 'absolute', top: '0px'}}>
        <button onClick = {handleClick} style = {{width: '98vw', zIndex: 1, background: 'black', height: '30px', borderColor: 'black', textDecorationColor: 'white'}}>  Play  </button>
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