import React from "react";

const Image = ({ source, style, resizeMode }) => {
  return <img src={source} style={style} resizeMode={resizeMode}></img>;
};

export default Image;
