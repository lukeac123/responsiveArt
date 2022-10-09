import React from 'react';
import p5 from 'p5'

export default function Tiles({output}) {

  // console.log(output)

    //Take the tile colour and make it vary according to the signal 
    // let colour = data.colour
    // const newColour = colour.slice(0,12) + `${number}%)`

    //Make an array of colours you'd want for the background
    //That then need to be appended to the output array

    //need to figure out how to make the tiles cover the whole screen
    //replicate the p5.js push and pop
    //probaly need to create an array of all the appropriate positions and then merge it with the outputs array

    // console.log(window.innerWidth)


  let tilesArray = output.map(element => {

    let tilesCoordinates = []
    for(let i=0; i<=100; i=i+10){
      tilesCoordinates.push(i)
    }

    // console.log(tilesCoordinates)

    

    //this doesn't work when the hue is 2 digits (<100) need to figure out a different way of taking 'hs' values
    //or define the hsl value from 1-100 
    let colour = element.colour.slice(0,11) + `,${element.signal}%)`

        return(
            { x: element.i*10, y: element.i*10, signal: element.signal, colour: colour } 
        )
      })

  // console.log(tilesArray)
 
  return (
    <div style={{zIndex: -1}}>
      {tilesArray.map(({colour}, i) => {
        return( 
          <div style = {{ display: 'fixed', background: `${colour}`, position: 'absolute', height: `10vh`, width: '10vw', top: `${i*10}vh`, left: `${i*10}vw`, transition: 'width 0.2s, height 0.2s, transform 0.2s'}} /> 
        )
      })}
      </div>
  );
}

//Could use and image and break up into the tiles for the background / pixels
//Adjust size / colour / distortion of pixels according to music

{/* figure out how to center this image, could maybe use an icon instead of an  image
    could also then use the package for a play button */}
           {/* <img src='/smilyface.jpg' width={`${number/2}px`} height={`${number/2}px`} />  */}



