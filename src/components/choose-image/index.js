import React, { useRef, useState } from "react";
import Cards from "../../base-components/cards";
import Speech from "react-speech";

import Container from "../container";
import dummyData from "./data";

const ChooseImage = () => {
  const [id, setId] = useState(0);
  const [selectedImage, setSelectedImage] = useState(-1);
  const speechRef = useRef(null);

  const onPressNext = () => {
    if (id < dummyData.length - 1) {
      setId(id + 1);
    } else {
      setId(-1);
    }
    setSelectedImage(-1);
  };

  const onSelectCard = (index) => {
    setSelectedImage(index);
    if (index === dummyData[id].correctImage) {
      if (speechRef.current) {
        speechRef.current.play();
      }
    }
  };

  console.log(selectedImage, "id");
  return (
    <Container>
      {id >= 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1> Choose the right picture for {dummyData[id].name}</h1>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {dummyData[id].image.map((img, index) => {
              const selected = index === selectedImage;
              const correct =
                selected && selectedImage === dummyData[id].correctImage;
              return (
                <Cards
                  image={img}
                  selected={selected}
                  onSelect={() => onSelectCard(index)}
                  correct={correct}
                />
              );
            })}
          </div>
          <button onClick={onPressNext}>Next</button>
          <div style={{ opacity: 0 }}>
            <Speech
              text={dummyData[id].name}
              ref={speechRef}
              voice="Google UK English Female"
            />
          </div>
        </div>
      ) : (
        <h1>Completed</h1>
      )}
    </Container>
  );
};

export default ChooseImage;
