import React from 'react';
import Sketch from "react-p5";
import {useState} from 'react'

export default function SolarSystem({analyserNode, colour, analyserData, signals, canvasHeight, canvasWidth, canvasX, canvasY}) {

    let particles = [];

    let setup = (p5, canvasParentRef) => {
        let xyz = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
        let x = canvasX
        let y = canvasY
        xyz.position(x, y);

      };
    
    function draw(p5) {
        p5.background("black");
        //let signal = rootMeanSquaredSignal(analyserData);
        // signal = p5.min(p5.width, p5.height)*signal //scale the signal to relative size

        p5.fill('blue')
        p5.circle(250,250,250)


        signals.forEach(({ analyserNode, analyserData}, i) => {
            analyserNode.getFloatTimeDomainData(analyserData);
            let signal = rootMeanSquaredSignal(analyserData);
            signal = p5.min(p5.width, p5.height)*signal //scale the signal to relative size
            
            particles[i].move(p5, signal); 
            particles[i].show(p5);
        });
    };

   
//Maybe try to just return the draw function without the sketch
//This would mean nothing is rendered in this component
//But would the data from the draw component be coung to render in the index.js file ?


  return (
    <div>
      Hello from solarSystem
      <Sketch setup={setup} draw={draw} />
    </div>
 
  );
}

class Particle { 
  constructor(x,y, colour) {
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
        p5.circle(this.x, this.y, 10)
    };

    this.move = (p5, signal) => {
      this.radians += this.velocity;
      this.signal = signal*this.maybePositive
      this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x + this.signal;
      this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y + this.signal;
  }}};


  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }