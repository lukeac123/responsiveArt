import Sketch from "react-p5";
import React from 'react';

export default function CircularMotion () {
  let particles = [];

  let setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(500, 500).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    let z = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y, z);
    
    for (let i=0; i < 100; i++){
      const colorPalette = ['#E27D60','#85DCBA','#E8A87C','#C38D9E','#41B3A3'];
      let randomColor = p5.random(colorPalette)
      particles[i] = new Particle(250,250, randomColor);
}}

  function draw(p5){ 
    for (let i = 0; i < particles.length; i++){
      particles[i].move(p5); 
      particles[i].show(p5);
}
};


return (
    <div className="App">
      <Sketch setup={setup} draw={draw} className="App" />
    </div>
)};

class Particle { 
  constructor(x,y, color) {
    this.radians = Math.random()*Math.PI*2;
    this.velocity = 0.03 ;
    this.distanceFromCenter = {
      x: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
      y: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
    }

    this.show = (p5) => {
      p5.noStroke()
      p5.fill(color)
      p5.circle(this.x, this.y, 20)
    };
    this.move = (p5) => {
      this.radians += this.velocity;
      this.x = x + Math.cos(this.radians) * 100 + this.distanceFromCenter.x;
      this.y = y + Math.sin(this.radians) * 100 + this.distanceFromCenter.y;
  }}};
