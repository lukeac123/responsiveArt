import React from 'react';
// import {useState} from 'react'

export default function Circle({output, src}) {


  console.log(output)
  return (
      <div>
         {output.map(element => {
        return(
          <div style = {{ justifyContent:'center', alignItems: 'center', display: 'flex'
            
          }} >
<div 
      style = {{
      position: 'absolute',
      background: 'pink', 
      width: `${50 + element.signal}vw`, 
      height: `${50 + element.signal}vh`,  
      borderRadius: '10px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      display:'flex',
      justifyContent: 'center', 
      // filter: 'hue-rotate(180deg)',
      alignItems: 'center' }} />  
      <div 
      style = {{
      position: 'absolute',
      background: 'blue', 
      width: `${40 + element.signal}vw`, 
      height: `${40 + element.signal}vh`,  
      borderRadius: '10px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      display:'flex',
      justifyContent: 'center', 
      // filter: 'hue-rotate(180deg)',
      alignItems: 'center' }} />  
      <div 
      style = {{
      position: 'absolute',
      background: 'red', 
      width: `${30 + element.signal}vw`, 
      height: `${30 + element.signal}vh`,  
      borderRadius: '10px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      display:'flex',
      justifyContent: 'center', 
      // filter: 'hue-rotate(180deg)',
      alignItems: 'center' }} />  
      <div 
      style = {{
      position: 'absolute',
      background: 'green', 
      width: `${20 + element.signal}vw`, 
      height: `${20 + element.signal}vh`,  
      borderRadius: '10px', 
      // boxShadow: `inset -1px -1px 5px 5px white`, 
      transition: 'width 0.2s, height 0.2s, transform 0.2s',
      display:'flex',
      justifyContent: 'center', 
      // filter: 'hue-rotate(180deg)',
      alignItems: 'center' }} />    
      </div>     
      )})} 

      

    <img src={src} style={{height: '100%', width: '100%', borderRadius:'10px', opacity: '0.3', filter: 'contrast(50%)'}} />
      </div>

  );
}
   

