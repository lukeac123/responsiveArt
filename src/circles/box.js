import React from 'react';
// import {useState} from 'react'

export default function Box({data}) {

  // const colour = data.colour
  const number = data.signal
 

  const colour = `rgb(287, 36, ${number})`

  return (
    <div>
      <div 
      style = {{
      display: 'absolute',
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
   

