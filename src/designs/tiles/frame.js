import React from 'react';
import Sketch from "react-p5";
import {useState, useRef} from 'react'

let signals;
let audio;
let audioContext;
let width;
let height;

/* 
- Establish way to duplicate whole system
- Stream Audio from URL
- Define starting position of the Objects using the windowWidth
- Overlay button over sketch so audio starts when sketch is clicked, re-rending causes sketch to disappear
- Change colour of objects from audio
- Change from JS into Typescript

*/

const frequencyBands = [
    { frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10 }, 
    { frequency: 200, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40  },
    { frequency: 400, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80 }, 
    { frequency: 800, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100 }, 
    { frequency: 2000, colour: '#E27D60', particleX: 300, particleSize: 10, circleRadius: 200 }, 
  ];

export default function Frame() {

    const audio = new Audio;
    audioContext = new AudioContext();
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

    let setup = (p5, canvasParentRef) => {

        width = p5.windowWidth - 100
        height = p5.windowHeight - 100
        let xyz = p5.createCanvas(width, height).parent(canvasParentRef);
        let x = (p5.windowWidth - p5.width) / 2;
        let y = (p5.windowHeight - p5.height) / 2;
        let z = (p5.windowHeight - p5.height) / 2;
        xyz.position(x, y, z);
    }

    const positions = [0, 500, 1000, 1500, 2000]

    function draw(p5) {
        p5.background("black");

        for(let x = 0; x<2000; x=x+200){

        signals.forEach(({analyserNode, analyserData, colour}, i) => {
            analyserNode.getFloatTimeDomainData(analyserData);
            let signal = rootMeanSquaredSignal(analyserData);
            signal = p5.min(p5.width, p5.height)*signal

            p5.push()
              p5.noStroke()
              p5.fill(colour)
              p5.circle(x,500, signal)
            p5.pop()

            // particles[i].show(p5, signal);
        });
      }
    };

    function handleClick(){
      audio.play();
    };
    

  return (
    <div>
      <Sketch setup={setup} draw={draw} onClick = {handleClick} />
      <button onClick = {handleClick} style = {{zIndex: 1, background: 'white'}}> Play  </button>
    </div>
  );
}

//To create and duplicate a larger system, use another Class Component


// class Particle { 
//   constructor(x,y, colour) {
//     this.show = (p5, signal) => {
//         p5.noStroke()
//         p5.fill(colour)
//         p5.circle(x,y, signal)
//     };
// }};

// class System {
//     constructor(x,y,colour){
//         new Particle()

//     }

// }


  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }