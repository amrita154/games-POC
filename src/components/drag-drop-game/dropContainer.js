import React, { useRef, useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import Speech from "react-speech";

const DropArea = () => {
  const [items, setItems] = useState([]);
  const speechRef = useRef(null);

  const onHit = (e) => {
    setItems((prev) => [...prev, e.dragData.label]);
    console.log("ref", speechRef.current);
    if (speechRef.current) {
      speechRef.current.play();
    }
    e.containerElem.style.visibility = "hidden";
  };

  return (
    <DropTarget targetKey="box" onHit={onHit}>
      <div
        style={{
          height: 200,
          width: 200,
          borderWidth: 1,
          borderStyle: "dashed",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {items.map((item) => {
          return <p>{item}</p>;
        })}
        <div style={{opacity:0}}>
        <Speech
          text={items.length > 0 ? items[items.length - 1] : ""}
          ref={speechRef}
          voice="Google UK English Female"
        />
        </div>
      </div>
    </DropTarget>
  );
};

export default DropArea;
