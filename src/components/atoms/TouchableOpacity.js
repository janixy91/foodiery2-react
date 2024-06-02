import React from "react";

const TouchableOpacity = ({ onPress, children, style }) => {
  return (
    <div style={style} onClick={onPress}>
      {children}
    </div>
  );
};

export default TouchableOpacity;
