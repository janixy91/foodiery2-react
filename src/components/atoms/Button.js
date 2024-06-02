import React from "react";

import Text from "./Text";
import { SECOND_COLOR2 } from "../../constants/colors";

const Button = ({
  text,
  onPress,
  style,
  disabled = false,
  background = SECOND_COLOR2,
  title = false,
  className,
}) => {
  return (
    <div
      style={{
        opacity: disabled ? 0.7 : 1,
        backgroundColor: background,
        fontSize: title ? 22 : 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...styles.button,
        ...style,
      }}
      onClick={!disabled ? onPress : () => {}}
      disabled={disabled}
      className={`button ${className}`}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </div>
  );
};

const styles = {
  button: {
    padding: 6,
    borderRadius: 8,
    // height: 40,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Button;
