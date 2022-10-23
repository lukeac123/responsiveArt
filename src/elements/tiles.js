import React from 'react';

const colourPallete = ['hsl(80,75%,19%)', 'hsl(81,69%,42%)', 'hsl(66,90%,74%)', 'hsl(90,71%,35%)' ]

//fix hsl, currently can only apply signal when hue is 3 digits, could define hue from 1-100

export default function Tiles({ output }) {

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
    <div style={{width:'100vw', height:'100vh', display: 'block', zIndex: -1, marginTop:'5px' }}>
      {tilesArray?.map(element => {
        return(
          <div style={{display: 'inline-block', backgroundColor: `${element.colour}` , width: '10vw', height: '10vh', marrgin: '-12px, 0px', boxShadow: '0.1px 0.1px 5px 5px' }}/>
        )})}
      </div>
  );
}

     
          //  setTimeout(()=>{
          //    const characters = ['/alice.png', '/rabbit.png', '/hatter.png']
          //    const rand = Math.floor(Math.random()*characters.length)
          //    console.log('hi')
          //    // setCharacterimgSrc(characters[rand])
          //  }, 10000)