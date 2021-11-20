import React from "react";
import "./styles.css";

const Cards = ({ selected=false,image,onSelect=()=>{},correct}) => {
  return (
    <div className="Cards" style={{backgroundColor:selected?(correct?'green':'red'):'transparent'}} onClick={onSelect}>
      <img src={image} alt="Icon" id="icon" />
    </div>
  );
};

export default Cards;
