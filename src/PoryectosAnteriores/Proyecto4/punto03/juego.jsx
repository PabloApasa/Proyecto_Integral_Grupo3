import React from "react";
import styles from '../../../assets/css/P_4/styles/estiloAdivinarNumero.module.css';
import { juegoAdivinarNumero } from "./juegoAdivinar";
import Mensaje from "./Mensaje";
import Intentos from "./Intentos";
import IngresarNumero from "./IngresarNumero";
import Controles from "./Controles";

export default function Juego() {

  const {
    numeroIngresado,
    setNumeroIngresado,
    mensaje,
    intentos,
    juegoTerminado,
    validarNumero,
    rendirse,
    reiniciarJuego,
  } = juegoAdivinarNumero();

  return (

    <div className={styles['juego-container']}>
      <h3>Componente Juego funcionando</h3>
      <Mensaje mensaje={mensaje} />
      <IngresarNumero
        numeroIngresado={numeroIngresado}
        setNumeroIngresado={setNumeroIngresado}
        validarNumero={validarNumero}
        juegoTerminado={juegoTerminado}
      />
      <Intentos intentos={intentos} />
      <Controles
        rendirse={rendirse}
        reiniciarJuego={reiniciarJuego}
        juegoTerminado={juegoTerminado}
      />
    </div>
  );
}
