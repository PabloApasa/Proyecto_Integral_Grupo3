import { useState, useEffect } from "react";

export function useJuegoEstrellas() {
  const [puntaje, setPuntaje] = useState(0);
  const [posicionEstrella, setPosicionEstrella] = useState({ y: 0, x: 0 });
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [juegoActivo, setJuegoActivo] = useState(true);

  const posicionAlAzar = () => {
    const y = Math.random() * 80 + 10;
    const x = Math.random() * 80 + 10;
    return { y, x };
  };

  useEffect(() => {
    if (!juegoActivo) {
      setVisible(false);
      return;
    }

    let timeoutId;
    const intervalo = setInterval(() => {
      setPosicionEstrella(posicionAlAzar());
      setVisible(true);

      timeoutId = setTimeout(() => setVisible(false), 1000);
    }, 2000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(timeoutId);
    };
  }, [juegoActivo]);

  useEffect(() => {
    if (puntaje >= 10) {
      setJuegoActivo(false);
      setMensaje("¡Ganaste!");
    }
  }, [puntaje]);

  const agarrarEstrella = () => {
    setPuntaje((prev) => prev + 1);
    setVisible(false);
  };

  const reiniciarJuego = () => {
    setPuntaje(0);
    setMensaje("");
    setJuegoActivo(true);
    setVisible(false);
  };

  return {
    puntaje,
    posicionEstrella,
    visible,
    mensaje,
    juegoActivo,
    agarrarEstrella,
    reiniciarJuego,
  };
}
