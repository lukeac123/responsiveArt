/* 
- Stream Audio from URL / connect to computer audio input
- Create AudioPlayerBar Component to import 
- Change from JS into Typescript
- map the maximum volume to the window height / width 
*/

import React from 'react';
import {useState, useEffect} from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Tiles from '../elements/tiles'
import Circle from '../elements/circles'

let signals;
let audioContext;


const frequencyBands = [
    { frequency: 100, colour: 'hsl(100,50%,50%)'}, 
    { frequency: 400, colour: 'hsl(200,60%,50%)'},
    { frequency: 800, colour: 'hsl(300,40%,50%)'}, 
    { frequency: 1500, colour: 'hsl(400,70%,50%)'}, 
  ];

  const audio = new Audio();
    audioContext = new AudioContext();

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          audio.srcObject = stream;
          audio.onloadedmetadata = (e) => {
            console.log(e)
            console.log("media is fetched and ready to play")
          };
        })   
      } else {
        console.log("getUserMedia not supported.")
      }

      // getUserMedia({
      //   audio: {
      //     deviceId: {
      //       exact: myExactCameraOrBustDeviceId
      //     }
      //   }
      // })
      


    const source = audioContext.createMediaElementSource(audio);
    let gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

  signals = frequencyBands.map(({ frequency, colour }) => {
    const analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 1;
    const analyserData = new Float32Array(analyserNode.fftSize);
    const filterNode = audioContext.createBiquadFilter();
    filterNode.frequency.value = frequency;
    filterNode.Q.value = 2;
    filterNode.type = "bandpass";
    source.connect(filterNode);
    filterNode.connect(analyserNode);

    return {
      analyserNode,
      colour,
      analyserData
    };
  });

export default function App() {
  const [playing, setPlaying] = useState(false)
  const [output, setOutput] = useState([])
  const [analyserData, setAnalyserData] = useState([])

  function handlePlay(){
    if (!playing){
      audio.play();
      setPlaying(true);
    } else {
    audio.pause();
    setPlaying(false);
  }}

      useEffect(() => {
        if (audio){        
        audio.addEventListener('timeupdate', signalsUpdate)
        }
        return () => {
         if(audio){
          audio.removeEventListener('timeupdate', signalsUpdate)
        }}
      },[audio])


//there's probably a clean what to do this
      function signalsUpdate(){
       let data = signals.map(({analyserNode, analyserData, colour}, i) => {
          analyserNode.getFloatTimeDomainData(analyserData);
          let signal = rootMeanSquaredSignal(analyserData); //Take array of data and convert into average
          signal = signal*window.innerHeight*3 //Make the signal proportional to the height / width of the screen
          setAnalyserData(analyserData) 
          return {signal, colour, i, analyserData}
      });
      setOutput(data)   
    }

    // console.log(analyserData)


// can this be intergrate into the signals update function ?
    const bass = output[0]
    const lowMids = output[1]
    const highMids = output[2]
    const highs = output[3]



  return (
    <div style = {{display: 'flex'}}>
      <button onClick = {handlePlay} style = {{position:'absolute', right: '0px', top:'0px', zIndex: 1, height: '30px'}}>
        <PlayCircleIcon />
      </button>
      {bass && (
           <div style = {{background: 'black', position: 'absolute', height: '100vh', width: '100vw', display: 'flex', zIndex: -99}}>
             {/* {analyserData.map(element => {
               console.log(element)
               return(
                 <div style={{background: 'pink', zIndex: 1, height: '100vh', left: element[0]}}>
                 </div>
               )
             })} */}
           <div style={{position: 'absolute', zIndex: -2}}>
            <Tiles output={output} />
            </div>
          <div style = {{position: 'absolute', height: '99vh', width: '99vw', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: -1}}>
            <Circle data={bass} />
            <Circle data={lowMids} />
            <Circle data={highMids} />
            <Circle data={highs} />
          </div>
          </div>
      )}
    </div>
  );
}

  function rootMeanSquaredSignal(data) {
    let rms = 0;
    for (let i = 0; i < data.length; i++) {
      rms += data[i] * data[i];
    }
    return Math.sqrt(rms / data.length);
  }


