import React, { useState, useEffect } from "react";

const TemporadaCronometro = ({ fechaFin }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (fechaFin) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [fechaFin]);

  function calculateTimeLeft() {
    const diferencia = new Date(fechaFin) - new Date();
    let timeLeft = {};

    if (diferencia > 0) {
      timeLeft = {
        días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferencia / 1000 / 60) % 60),
        segundos: Math.floor((diferencia / 1000) % 60),
      };
    }

    return timeLeft;
  }
  return (
    <>
      {Object.keys(timeLeft).length ? (
        <div>
          {timeLeft.días}d {timeLeft.horas}h {timeLeft.minutos}m{" "}
          {timeLeft.segundos}s
        </div>
      ) : (
        <>{fechaFin && <span>¡La temporada ha terminado!</span>}</>
      )}
    </>
  );
};

export default TemporadaCronometro;
