import React from 'react';
// import {useState} from 'react'

export default function Box({data}) {

  const colour = data.colour
  const number = data.signal
 

  // colour = `rgb(287, 36, ${signal})`

  return (
    <div 
    style = {{
      background: colour, 
      width: `${number}px`, 
      height: `${number}px`, 
      borderRadius: '1000px', 
      boxShadow: `inset -1px -1px 5px 5px white`, 
      transitionTimingFunction: 'ease-in-out'}} /> 
  );
}

{/* figure out how to center this image, could maybe use an icon instead of an  image
    could also then use the package for a play button */}
    {/* <img src='/smilyface.jpg' width={`${signal/2}px`} height={`${signal/2}px`} /> */}

