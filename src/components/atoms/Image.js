import React from "react";

const Image = ({ source, style, resizeMode }) => {
  console.log(source, "ss");
  return <img src={source} style={style} resizeMode={resizeMode}></img>;
};

export default Image;
