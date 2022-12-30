import React from 'react';
// import './styles.css'

//need to create an array of particles outside of the component, don't want the original positions of the particles to be lost when the component refreshes
//may well need to use reduce to combine the array of particels with the corresponding array of signals

// for(let i=0; i<2048; i++){
// const particle = new Particle(positionX, height / 2, colour, particleSize, circleRadius, particleX);
// }

const positionX = []
const positionY = []

export default function BallAnalyser({float32Array}){ 
  const newArray = []

  float32Array.map(x => {
      x=Math.floor(x*1000)
      newArray.push({signal: x, colour: 'green'})
  })

  return (
    <div className='spectrumAnalyserRoot' style={{position: 'absolute', top: '0vh', left: '0vw', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', overflow: 'hidden'}}> 
    {newArray?.map(element => {
           const x = Math.cos(2*Math.PI)*Math.random()*100 + element.signal
           const y = Math.sin(1/2*Math.PI)*Math.random()*100
        //    console.log(element)
        return( 
          <div style={{backgroundColor: `pink`, height: '10px', width: '10px', position: 'absolute', left: `${x}vw`, top: `${y}vh`, borderRadius: '1000000px' }} />
        )})}
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



    //   let distanceFromCenter = {
//     x: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10,
//     y: (Math.random() < 0.5 ? -1 : 1)*Math.random()*10
//   }

  //let maybePositive = Math.random() < 0.5 ? -1 : 1
  // let radians = Math.random()*Math.PI*2;