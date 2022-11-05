import React from 'react';
import './styles.css'

// add variant of the tile component
// 1. colour responsive, could have different pallete for people to pick from, create global pallete themes ? - look into creating themes ?
// 2. size responsive

const colourPallete = ['hsl(80,75%,19%)', 'hsl(81,69%,42%)', 'hsl(66,90%,74%)', 'hsl(90,71%,35%)' ]

//fix hsl, currently can only apply signal when hue is 3 digits, could define hue from 1-100

export default function Tiles({ output, variant }) {

let tilesArray=[];
     for(let i=0; i<25; i++){
      output.map(element => {
        const rand = Math.floor(Math.random()*colourPallete.length)
        const colour = colourPallete[rand].slice(0,10) + `,${10+ element.signal}%)`
        // const colour = element.colour.slice(0,11) + `,${10+ element.signal}%)`
        tilesArray.push({ signal: element.signal, colour: colour})
          })
     };
 
  return (
    <div className='tileRoot'>
      {tilesArray?.map(element => {
        return(
          <div className='tile' style={{backgroundColor: `${element.colour}`, borderRadius: '100px'}}/>
        )})}
      </div>
  );
}