import React from 'react';
import Sketch from "react-p5";
import {useState} from 'react'

export default function Box({ signal, colour }) {

    let particles = [];

  return (
    <div style = {{background: 'pink', height: '100px', height: `${signal}px`}} />
  );
}

// class Particle { 
//   constructor(x,y, colour) {
//       this.maybePositive = Math.random() < 0.5 ? -1 : 1
//       this.radians = Math.random()*Math.PI*2;
//       this.velocity = 0.01 ;
//       this.distanceFromCenter = {
//       x: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
//       y: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
//     }

//     this.show = (p5) => {
//         p5.noStroke()
//         p5.fill(colour)
//         p5.circle(this.x, this.y, 10)
//     };

//     this.move = (p5, signal) => {
//       this.radians += this.velocity;
//       this.signal = signal*this.maybePositive
//       this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x + this.signal;
//       this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y + this.signal;
//   }}};


  