import React from 'react';
import './styles.css'

// add variant of the tile component
// 1. colour responsive, could have different pallete for people to pick from, create global pallete themes ? - look into creating themes ?
// 2. How to make a smooth gradient without defined lines. Use the base colour for the full background and make the background more transaprret toa llow colour blending


export default function Tiles({ output, colourPallete, tileWidth, tileHeight, noTiles=4 }) {

  let tilesArray=[];
  colourPallete = ['hsl(80,75%,19%)', 'hsl(20,69%,42%)', 'hsl(40,90%,74%)', 'hsl(10,71%,35%)' ]

  noTiles = 4
  tileWidth = 25
  tileHeight = 100

     for(let i=0; i<1; i++){
      output.map(element => {
        const rand = Math.floor(Math.random()*colourPallete.length)
        const colour = colourPallete[rand].slice(0,10) + `,${10+element}%)`
        // const colour = element.colour.slice(0,11) + `,${10+ element.signal}%)`
        tilesArray.push({ signal: element, colour: colour})
      })};

  return (
    <div className='tileRoot'>      
      {tilesArray?.map(tile => {
        return(
          <div className='tile' style={{backgroundColor: `${tile.colour}`, width: `${tileWidth}vw`, height: `${tileHeight}vh` }}/>
        )})}
      </div>
  );
}

// borderRadius: `${tile.signal}px`,