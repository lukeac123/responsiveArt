import React, {useState, useRef, useEffect} from 'react';
import Sketch from "react-p5";

export default function App(){

    // const audio = useRef()

    // useEffect(() => {
    //     const audioNode = audio.current
    //     console.log(audioNode)


    // })

    const audio = new Audio;
     audio.src = '/audioFile.mp3';
    // const audioContext = new AudioContext();
 



    // const [audio, setAudio] = useState(document.getElementById('audioNode'))
 


    // const source = audioContext.createMediaElementSource(audio);
    // let gainNode = audioContext.createGain();
    // source.connect(gainNode);
    // gainNode.connect(audioContext.destination);

    //const canvas = newCanvas(webgl, {depth: false, alpha: true})

    // const setup = (p5) => {
    //     p5.circle(10,10,100)
    // } 

    function handleClick(){
        audio.play()
        console.log(audio)
    }

    return(
        <div>
            {/* <audio ref={audio} id='audioNode' src='/audioFile.mp3' /> */}
            <button onClick={handleClick}>
            </button>
            <canvas style={{background: 'blue'}}>
                Canvas1
            </canvas>
            <canvas style={{background: 'red'}}>
                Canvas2
            </canvas>
            <canvas style={{background: 'blue'}}>
                Canvas1
            </canvas>
            {/* <Sketch setup={setup} className="App" /> */}
        </div>
    )
}


