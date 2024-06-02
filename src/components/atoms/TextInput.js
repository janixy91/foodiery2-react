import React from "react";

const TextInput = ({ onChangeText, ...props }) => {
  return (
    <input
      onChange={
        onChangeText ? (e) => onChangeText(e.target.value) : props.onChange
      }
      {...props}
    />
  );
};

export default TextInput;
