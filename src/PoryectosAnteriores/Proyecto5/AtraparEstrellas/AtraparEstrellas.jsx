import styles from "../../../assets/css/P_5/Proyecto5App.module.css";
import Estrella from "../AtraparEstrellas/Estrella";
import { useJuegoEstrellas } from "../AtraparEstrellas/useJuegoEstrellas";

export default function AtraparEstrellas() {
  const {
    puntaje,
    posicionEstrella,
    visible,
    mensaje,
    juegoActivo,
    agarrarEstrella,
    reiniciarJuego,
  } = useJuegoEstrellas();

  return (
    <div className={styles["proyecto5-app"]}>
      <div className={styles["contenedor-juego"]}>
        <h1>Atrapa las Estrellas</h1>
        <p>Puntaje: {puntaje}</p>
        {mensaje && <h2>{mensaje}</h2>}

        <div className={styles["juego-area"]}>
          {visible && juegoActivo && (
            <Estrella
              top={posicionEstrella.y}
              left={posicionEstrella.x}
              onClick={agarrarEstrella}
            />
          )}
        </div>

        <button className={styles["boton-reiniciar"]} onClick={reiniciarJuego}>
          Reiniciar juego
        </button>
      </div>
    </div>
  );
}

/*esto es el codigo anterioir que estaba en este archivo antes de dividirlo en componentes*/

/*import { useState, useEffect } from "react";
import "../../css/App.css";

export default function AtraparEstrellas() {
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

      timeoutId = setTimeout(() => {
        setVisible(false);
      }, 700);
    }, 1200);

    return () => {
      clearInterval(intervalo);
      clearTimeout(timeoutId);
    };
  }, [juegoActivo]);

  const agarrarEstrella = () => {
    setPuntaje((prev) => prev + 1);
    setVisible(false);
  };

  useEffect(() => {
    if (puntaje >= 10) {
      setJuegoActivo(false);
      setMensaje("¡Ganaste!");
    }
  }, [puntaje]);

  const reiniciarJuego = () => {
    setPuntaje(0);
    setMensaje("");
    setJuegoActivo(true);
    setVisible(false);
  };

  return (
    <div className="contenedor-juego">
      <h1>Atrapa las Estrellas</h1>
      <p>Puntaje: {puntaje}</p>

      {mensaje && <h2>{mensaje}</h2>}

      <div className="juego-area">
        {visible && juegoActivo && (
          <div
            className="estrella aparecer"
            style={{
              top: `${posicionEstrella.y}%`,
              left: `${posicionEstrella.x}%`,
            }}
            onClick={agarrarEstrella}
          >
            ★
          </div>
        )}
      </div>

      <button className="boton-reiniciar" onClick={reiniciarJuego}>Reiniciar juego</button>
    </div>
  );
}*/