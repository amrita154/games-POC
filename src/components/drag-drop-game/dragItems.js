import React from "react";
import { DragDropContainer } from "react-drag-drop-container";

const DragItems = ({targetKey,label, image }) => {

     const { innerWidth: width, innerHeight: height } = window;

    var randomtop = Math.floor(Math.random() *(300));
    var randomleft = Math.floor(Math.random() * (400));
   

    console.log("randome",randomleft,randomtop,width,height)
  
    return (
    <DragDropContainer
      targetKey={targetKey}
      dragData={{ label: label }}
      // onDrop={some method}
      // onDragStart={some method}
      // onDrag={some method}
      // onDragEnd={some method}
    >
      <div style={{ 
        //   position:'absolute',
          marginTop: randomtop,
        marginLeft: randomleft,
        // zIndex:2
        }}>
        <img src={image} height={100} width={100} />
      </div>
    </DragDropContainer>
  );
};

export default DragItems;
