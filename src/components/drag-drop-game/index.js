import React from "react";
import Container from "../container";
import dragObjects from "./data";
import DragItems from "./dragItems";
import DropArea from "./dropContainer";
import "./styles.css"

const DragDropGame = () => {
  return (
    <Container>
      {dragObjects.map((item) => {
        return (
          <DragItems targetKey="box" label={item.name} image={item.image} />
        );
      })}
      <DropArea/>
    </Container>
  );
};

export default DragDropGame;
