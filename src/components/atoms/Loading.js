import React from "react";

const LoadingSpinner = ({ loading }) => {
  const spinnerStyle = {
    display: "inline-block",
    width: "50px",
    height: "50px",
    border: "3px solid rgba(0, 0, 0, 0.3)",
    borderTop: "3px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      {loading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#f0f0f061",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6000,
          }}
        >
          <div style={spinnerStyle}></div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
