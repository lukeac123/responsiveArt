import React from 'react';
import Sketch from "react-p5";
import {useState} from 'react'

let signals;
let audio;
let audioContext;
let width;
let height;

/* 
1. Stream Audio from URL
2. Define starting position of the Objects using the windowWidth
3. Overlay button over sketch so audio starts when sketch is clicked, re-rending causes sketch to disappear
4. Change colour of objects from audio

*/

const frequencyBands = [
    { frequency: 50, colour: '#C38D9E', particleX: 250, particleSize: 200, circleRadius: 10 }, 
    { frequency: 50, colour: '#C38D9E', particleX: 500, particleSize: 200, circleRadius: 10 },
    { frequency: 200, colour: '#41B3A3', particleX: 250, particleSize: 150, circleRadius: 40  },
    { frequency: 200, colour: '#41B3A3', particleX: 500, particleSize: 150, circleRadius: 40  },  
    { frequency: 400, colour: '#E8A87C', particleX: 250, particleSize: 50, circleRadius: 80 }, 
    { frequency: 400, colour: '#E8A87C', particleX: 500, particleSize: 50, circleRadius: 80 }, 
    { frequency: 800, colour: '#85DCBA', particleX: 250, particleSize: 20, circleRadius: 100 }, 
    { frequency: 800, colour: '#85DCBA', particleX: 500, particleSize: 20, circleRadius: 100 }, 
    { frequency: 2000, colour: '#E27D60', particleX: 250, particleSize: 10, circleRadius: 200 }, 
    { frequency: 2000, colour: '#E27D60', particleX: 500, particleSize: 10, circleRadius: 200 }, 
  ];

export default function CircularMotion() {
    const [isPlaying, setIsPlaying] = useState(false)

    //Create Audio Connection
    audio = document.createElement('audio');
    audio.src = '/intro.mp3';
    audio.loop = false;
    
    audioContext = new AudioContext();
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

      let particles = [];

    let setup = (p5, canvasParentRef) => {

        width = p5.windowWidth - 100
        height = p5.windowHeight - 100

        let xyz = p5.createCanvas(width, height).parent(canvasParentRef);
        let x = (p5.windowWidth - p5.width) / 2;
        let y = (p5.windowHeight - p5.height) / 2;
        let z = (p5.windowHeight - p5.height) / 2;
        xyz.position(x, y, z);

        signals.forEach(({colour, particleSize, circleRadius, particleX}, i) => {
                particles[i] = new Particle(particleX, height / 2, colour, particleSize, circleRadius, particleX);
        })
      };
    
    function draw(p5) {
        p5.background("black");
        signals.forEach(({ analyserNode, analyserData}, i) => {
            analyserNode.getFloatTimeDomainData(analyserData);
            let signal = rootMeanSquaredSignal(analyserData);
            signal = p5.min(p5.width, p5.height)*signal //scale the signal to relative size
            particles[i].x = 0
            particles[i].move(p5, signal); 
            particles[i].show(p5);
        });
    };

    function handleClick(){
              audio.play();
    };
    

  return (
    <div>
      <Sketch setup={setup} draw={draw} onClick = {handleClick} />
      <button onClick = {handleClick} style = {{zIndex: 1, background: 'white'}}> Play Audio </button>
    </div>
  );
}

class Particle { 
  constructor(x,y, colour, particleSize, circleRadius) {
      this.maybePositive = Math.random() < 0.5 ? -1 : 1
      this.radians = Math.random()*Math.PI*2;
      this.velocity = 0.01 ;
      this.distanceFromCenter = {
      x: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
      y: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
    }

    this.show = (p5) => {
        p5.noStroke()
        p5.fill(colour)
        p5.circle(this.x, this.y, particleSize)

        const particleLine = particleSize - 10

        p5.stroke(10)
        p5.noFill()
        p5.circle(this.x, this.y, particleLine)

    };

    this.move = (p5, signal) => {
      this.radians += this.velocity;
      this.signal = signal*this.maybePositive
      this.x = x + Math.cos(this.radians) * circleRadius + this.distanceFromCenter.x + this.signal;
      this.y = y + Math.sin(this.radians) * circleRadius + this.distanceFromCenter.y;
  }}};


  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }