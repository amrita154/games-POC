import React from "react";
import "./styles.css";

const Container = ({children}) => {
  return (
    <div className="Container">
     {children}
    </div>
  );
};

export default Container;
