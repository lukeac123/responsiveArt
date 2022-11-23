import Sketch from "react-p5";
import React from 'react';

//TODO: Make different channels so that the volume of different frequency bands can be adjusted easily. Want this to work like a mixer channel

const audio = new Audio();
const audioContext = new AudioContext();

if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({ audio : true, video: false })
        .then((stream) => {
            audio.srcObject = stream;
            audio.onloadedmetadata = (e) => {
                console.log("media is fetched and ready to play")
            };
        })
} else {
    console.log("getUserMedia not supported.")
}

const source = audioContext.createMediaElementSource(audio);
let gainNode = audioContext.createGain();
source.connect(gainNode);
gainNode.connect(audioContext.destination);

//TODO: turn frequencyBands into object so different filter types can be applied to diffrerent frequencies, use low and high pass to book end

function splitAudioDataIntoFrequencyBands(){
  const frequencyBands = [100, 400, 800, 1500]

  let rawFrequencyBandData = frequencyBands.map(frequency => {

    const analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 1;
    const analyserData = new Float32Array(analyserNode.fftSize);


    //TODO: look into the biquad filter and other potential alternatives, biqud filter might not work to do the raw data
    const filterNode = audioContext.createBiquadFilter();
    filterNode.frequency.value = frequency;
    filterNode.Q.value = 1;
    filterNode.type = "bandpass";
    source.connect(filterNode);
    filterNode.connect(analyserNode);
    return {analyserData, analyserNode}
  })
  return rawFrequencyBandData
}

function signalsUpdate(rawFrequencyBandData){
  let normalisedFrequencyBandData = rawFrequencyBandData.map(({analyserData, analyserNode}) => {
    analyserNode.getFloatTimeDomainData(analyserData);
    let signal = rootMeanSquaredSignal(analyserData); 
    // signal = Math.floor(signal*1000)
    return signal
  })
  return normalisedFrequencyBandData
};


export default function CircularMotion () {

  function setup (p5, canvasParentRef){
    let xyz = p5.createCanvas(500, 500).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    let z = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y, z)
  };
    
  function draw(p5){
      // returns raw frequency band data
    let rawFrequencyBandData = splitAudioDataIntoFrequencyBands()
      // return average data
    let normalisedFrequencyBandData = signalsUpdate(rawFrequencyBandData)
      console.log(normalisedFrequencyBandData)
};


return (
    <div className="App">
      Hello World
      <Sketch setup={setup} draw={draw} className="App" />
    </div>
)};


function rootMeanSquaredSignal(data) {
  let rms = 0;
  for (let i = 0; i < data.length; i++) {
    rms += data[i] * data[i];
  }
  return Math.sqrt(rms / data.length);
}




    //split the raw data into frequency bands
    //pass the raw data into signals update
    //signals update normalises the signal and returns a singal value
    //want to be able to pass down both the raw data and normalised to enable different effects



  // "eslintConfig": {
  //   "extends": [
  //     "react-app",
  //     "react-app/jest"
  //   ]
  // },