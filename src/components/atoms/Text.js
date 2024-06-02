import React from "react";

const Text = ({ style, children, classname }) => {
  return (
    <span className={classname} style={style}>
      {children}
    </span>
  );
};

export default Text;
