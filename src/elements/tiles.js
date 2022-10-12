import React, {useState, useEffect }from 'react';


export default function Tiles({ output }) {

  const [characterImgSrc, setCharacterimgSrc] = useState('/alice.png')

  //why does not work properly, might need to take outside of function ?
  setTimeout(()=>{
    const characters = ['/alice.png', '/rabbit.png', '/hatter.png']
    const rand = Math.floor(Math.random()*characters.length)
    console.log('hi')
    // setCharacterimgSrc(characters[rand])
  }, 10000)





  
 


    //Take the tile colour and make it vary according to the signal 
    // let colour = data.colour
    // const newColour = colour.slice(0,12) + `${number}%)`

    //Make an array of colours you'd want for the background
    //That then need to be appended to the output array

    //need to figure out how to make the tiles cover the whole screen
    //replicate the p5.js push and pop
    //probaly need to create an array of all the appropriate positions and then merge it with the outputs array

    // console.log(window.innerWidth)


//   let tilesArray = output.map(element => {

//     // let tilesCoordinates = []
//     // for(let i=0; i<=100; i=i+10){
//     //   tilesCoordinates.push(i)
//     // }
//     // console.log(tilesCoordinates)

  
//     //this doesn't work when the hue is 2 digits (<100) need to figure out a different way of taking 'hs' values
//     //or define the hsl value from 1-100 
//     let colour = element.colour.slice(0,11) + `,${element.signal}%)`

// //Logic to assign different colours from those in signals/output array
//     // const colourPallete = ['hsl(80,75%,19%)', 'hsl(81,69%,42%)', 'hsl(66,90%,74%)', 'hsl(90,71%,35%)' ]
//     // let colour = `${colourPallete[element.i]}`
//     // colour = colour.slice(0,10) + `,${element.signal}%)`


//         return(
//             { x: element.i*10, y: element.i*10, signal: element.signal, colour: colour } 
//         )
//       })

let tilesArray=[];
const colourPallete = ['hsl(100,20%,50%)', 'hsl(200,30%,50%)', 'hsl(300,30%,50%)', 'hsl(400,90%,50%)' ]

     for(let i=0; i<90; i++){
       tilesArray.push(i)
     }


  // console.log(tilesArray)
 
 
  return (
    <div style={{background: 'blue', width:'100vw', height:'100vh', display: 'block'}}>
      {tilesArray?.map(element => {
         const rand = Math.floor(Math.random()*colourPallete.length)
         const colour = colourPallete[rand]
         console.log(colour)
        return(
          <div style={{display: 'inline-block', backgroundColor: colour, width: '10vw', height: '10vh', marginBottom: '10px', boxShadow: '0.1px 0.1px 5px 5px' }}>
             <img src={characterImgSrc} style={{height: '100%', width: '100%', opacity: '0.3', filter: 'contrast(50%)'}} />
          </div>
        )})}


      {/* {tilesArray.map(({colour}, i) => {
        return( 
          <div>
            <div style = {{ display: 'fixed', background: `${colour}`, position: 'absolute', height: `50vh`, width: '25vw', top: `${0}vh`, left: `${i*25}vw`, borderRadius: '100px', overflow: 'hidden', transition: 'width 0.2s, height 0.2s, transform 0.2s'}} >
            <img src={characterImgSrc} style={{height: `50vh`, width: '25vw', opacity: '0.3', filter: 'contrast(50%)'}} />
            </div>
            <div style = {{ display: 'fixed', background: `${colour}`, position: 'absolute', height: `50vh`, width: '25vw', top: `${50}vh`, left: `${i*25}vw`, overflow: 'hidden', borderRadius: '100px', transition: 'width 0.2s, height 0.2s, transform 0.2s'}} >
            <img src='/rabbit.png' style={{height: `50vh`, width: '25vw', backgroundColor: 'pink', opacity: '0.3',  filter: 'contrast(50%)'}} />
            </div> 
          </div>
        )})} */}
      </div>
  );
}

//Could use and image and break up into the tiles for the background / pixels
//Adjust size / colour / distortion of pixels according to music

{/* figure out how to center this image, could maybe use an icon instead of an  image
    could also then use the package for a play button */}
           {/* <img src='/smilyface.jpg' width={`${number/2}px`} height={`${number/2}px`} />  */}



