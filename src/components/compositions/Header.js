import React from "react";

const Header = ({ title, right, left, style }) => {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 60,
        zIndex: 4000,
        top: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: "20%",
          paddingLeft: 16,
        }}
      >
        {left}
      </div>
      <div>
        <span
          className="title"
          style={{
            color: "white",
            fontSize: 20,
            width: "100%",
            height: 60,
            ...style,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          width: "20%",
          textAlign: "right",
        }}
      >
        {right}
      </div>
    </div>
  );
};

export default Header;
