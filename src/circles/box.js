import React from 'react';
// import {useState} from 'react'

export default function Box({data}) {

  const number = data.signal
  let colour = data.colour
  const newColour = colour.slice(0,12) + `${number}%)`

  console.log(newColour)
  //figure out how to normalise the singal between 100 so the hsl colour is always decent
  //this normalisation could be applied to the whole system to maintain consistency
  //The total signal should porbably always be 100 split across the different frequency bands
 


  return (
    <div>
      <div 
      style = {{
      // position: 'absolute',
      background: colour, 
      width: `${number}px`, 
      height: `${number}px`,  
      borderRadius: '1000px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      }} /> 
      </div>
  );
}

{/* figure out how to center this image, could maybe use an icon instead of an  image
    could also then use the package for a play button */}
           {/* <img src='/smilyface.jpg' width={`${number/2}px`} height={`${number/2}px`} />  */}
   

