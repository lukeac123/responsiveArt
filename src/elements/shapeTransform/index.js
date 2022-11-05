import React from 'react';
import './styles.css'

const borderRadiusByVariant = {
  circle: 1000,
  square: 0
}

export default function ShapeTransform({output, height, width, colour, variant}){ 

  const borderRadius = borderRadiusByVariant[variant]

  return(
         <div className='shapeTransformRoot' style={{ width: `${10 + output[0].signal}%`, height: `${output[0].signal}%`, borderRadius: `${borderRadius}`}} />
  )
};

   
//     boxShadow: inset -1px -1px 5px 5px white
// <img src={src} style={{height: '100%', width: '100%', borderRadius:'10px', opacity: '0.3', filter: 'contrast(50%)'}} />