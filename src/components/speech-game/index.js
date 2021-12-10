import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import gameData from './data';
import Container from "../container";
import { useAudioRecorder } from "../audio/hook";

const SpeechToText = () => {
 
  const containerRef = useRef(null);
  const [id,setId]=useState(0);

  const {detectAudio=false}=useAudioRecorder();

  const onPressNext=()=>{
      if(id<2){
          setId(id+1);
      }
      else{
          setId(0);
      }
      lottie.destroy("animation");
  }

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current,
      animationData: gameData[id].animation,
      loop:true,
      autoplay:true,
      name:"animation"
    });
      return () => lottie.stop();
  },[id]);

  useEffect(() => { 
    if (detectAudio) {
      lottie.play("animation");
    } else {
      lottie.pause("animation");
     
    }
  }, [detectAudio,id]);



  return (
    <Container>
      <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
      <h1> Speak {gameData[id].object} to {gameData[id].action}</h1>
      <div id="animation" ref={containerRef} style={{height:'20%',width:'20%',}}/>
      <button onClick={onPressNext}>Next</button>
      </div>
    </Container>
  );
};

export default SpeechToText;
