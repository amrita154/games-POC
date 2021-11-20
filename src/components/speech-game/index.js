import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import gameData from './data';
import Container from "../container";

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const containerRef = useRef(null);
  const [id,setId]=useState(0);

  const onPressNext=()=>{
      if(id<2){
          setId(id+1);
      }
      else{
          setId(0);
      }
      resetTranscript();
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
      console.log("transcript",transcript);
      let temp=[];
     temp=transcript.split(' ');
    if (temp[temp.length-1]===gameData[id].object.toLowerCase()||temp[temp.length-1]===gameData[id].object) {
      lottie.play("animation");
    } else {
      lottie.pause("animation");
      resetTranscript();
    }
  }, [transcript,id]);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser does not support speech recognition");
    }
    SpeechRecognition.startListening({ continuous: true });
    console.log("Now listening...");
    return () => {
      SpeechRecognition.stopListening();
      console.log("Stopped Listening");
    };
  }, []);


  return (
    <Container>
      <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
      <h1> Speak {gameData[id].object} to {gameData[id].action}</h1>
      <h3>{transcript}</h3>
      <div id="animation" ref={containerRef} style={{height:'20%',width:'20%',}}/>
      <button onClick={onPressNext}>Next</button>
      </div>
    </Container>
  );
};

export default SpeechToText;
