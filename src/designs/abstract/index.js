import React from 'react';
import Sketch from "react-p5";
import {useState, useEffect} from 'react'

let signals;
let audioContext;

let setup = (p5, canvasParentRef) => {

  const width = p5.windowWidth
  const height = p5.windowHeight

  let xyz = p5.createCanvas(width, height).parent(canvasParentRef);
  let x = (p5.windowWidth - p5.width) / 2;
  let y = (p5.windowHeight - p5.height) / 2;
  let z = (p5.windowHeight - p5.height) / 2;
  xyz.position(x, y, z);
}

const frequencyBands = [
    { Eq: 'bass', frequency: 50, colour: '#C38D9E', particleX: 300, particleSize: 200, circleRadius: 10 }, 
    { Eq: 'lowMids', frequency: 400, colour: '#41B3A3', particleX: 300, particleSize: 150, circleRadius: 40  },
    { Eq: 'highMids', frequency: 800, colour: '#E8A87C', particleX: 300, particleSize: 50, circleRadius: 80 }, 
    { Eq: 'high', frequency: 2000, colour: '#85DCBA', particleX: 300, particleSize: 20, circleRadius: 100 }, 
  ];

export default function App(p5) {

    const audio = new Audio();
    audioContext = new AudioContext();

    audio.src = '/test.mp3';
    audio.controls = true
    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    signals = frequencyBands.map(({ frequency, colour, particleSize, circleRadius, particleX, Eq }) => {
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

    function draw(p5) {
        p5.background("black");

        //Separate audio into their different frequency band and signal strengths
          let signalAmplitude = signals.map(({analyserNode, analyserData, Eq, colour}, i) => {
            analyserNode.getFloatTimeDomainData(analyserData);
            let signal = rootMeanSquaredSignal(analyserData);
            signal = p5.min(p5.width, p5.height)*signal
            return {[Eq]: signal, 'colour': colour}
        });

        const bass = signalAmplitude[0].bass
        const lowMids = signalAmplitude[1].lowMids
        const highMids = signalAmplitude[2].highMids
        const highs = signalAmplitude[3].highs

        p5.fill('white')
        p5.circle(500,500,bass)

        //Here is where you would draw and add different components
        //What does using the draw function provide instead of adding an event listener to audio.currentTime ?

    };

    function handleClick(){
      audio.play();
      console.log(audio.currentTime)
    };
    

  return (
    <div>
        <Sketch setup={setup} draw={draw} />
      <div style = {{position: 'absolute', top: '0px'}}>
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


  // p5.noStroke()
              // p5.fill('white')
              // p5.circle (signal, signal, signal)
              // p5.fill('red')
              // p5.rectMode('CENTER')
              // p5.rect(500, signal, signal, signal)