import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChooseImage from "../components/choose-image";
import DragDropGame from "../components/drag-drop-game";
import Home from "../components/home";
import SpeechToText from "../components/speech-game";

const Navigation = () => {
  return (
   
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/games-POC"  element={<Home/>}/>
            <Route path="/game1" element={<DragDropGame/>} />
            <Route path="/game2" element={<SpeechToText/>} />
           <Route path="/game3" element={<ChooseImage/>} />
          </Routes>
        </div>
      </BrowserRouter>
   
  );
};

export default Navigation;
