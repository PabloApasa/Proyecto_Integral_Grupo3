import { useState } from "react";

export function juegoAdivinarNumero() {
  const [numeroIngresado, setNumeroIngresado] = useState("");
  const [mensaje, setMensaje] = useState("Ingrese número por favor");
  const [intentos, setIntentos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [numeroRandom, setNumeroRandom] = useState(() =>
    Math.floor(Math.random() * 100) + 1
  );

  const validarNumero = () => {
    if (juegoTerminado) return;

    const numero = parseInt(numeroIngresado);
    if (isNaN(numero)) {
      setMensaje("Ingrese un número válido");
      return;
    }

    setIntentos((prev) => prev + 1);

    if (numero === numeroRandom) {
      setMensaje(`¡Acertaste! El número era ${numeroRandom}.`);
      setJuegoTerminado(true);
    } else if (numero < numeroRandom) {
      setMensaje("El número secreto es mayor al ingresado");
    } else {
      setMensaje("El número secreto es menor al ingresado");
    }
  };

  const rendirse = () => {
    setMensaje(`Te rendiste. El número secreto era ${numeroRandom}.`);
    setJuegoTerminado(true);
  };

  const reiniciarJuego = () => {
    setJuegoTerminado(false);
    setNumeroIngresado("");
    setIntentos(0);
    setMensaje("Ingrese número por favor");
    setNumeroRandom(Math.floor(Math.random() * 100) + 1);
  };

  return {
    numeroIngresado,
    setNumeroIngresado,
    mensaje,
    intentos,
    juegoTerminado,
    validarNumero,
    rendirse,
    reiniciarJuego,
  };
}
