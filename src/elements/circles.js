import React from 'react';
// import {useState} from 'react'

export default function Circle({output, src}) {


  console.log(output[0].signal)

  return (
    <div>
          <div 
      style = {{
      position: 'absolute',
      // background: 'pink', 
      width: `100vw`, 
      height: `100vh`,  
      borderRadius: '10px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      display:'flex',
      justifyContent: 'center', 
      // filter: 'hue-rotate(180deg)',
      alignItems: 'center' }} />  
      </div>
  );
}
   

// <img src={src} style={{height: '100%', width: '100%', borderRadius:'10px', opacity: '0.3', filter: 'contrast(50%)'}} />