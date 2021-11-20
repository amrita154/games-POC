import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../container";

const Home = () => {
  return (
      <Container>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
      <NavLink to="/game1">Game 1</NavLink>
      <NavLink to="/game2">Game 2</NavLink>
       <NavLink to="/game3">Game 3</NavLink>
    </div>
    </Container>
  );
};

export default Home;
