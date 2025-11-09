import React, { useState } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";


//creo una lista y coloco partes del cuerpo en ingles//
const partesIngles= ["head", "eye","nose","mouth","eyebrown","hear"];
//creo una lista pero con las traducciones de la lista anterior//
const partesEspañol= ["cabeza","ojo","nariz","boca","ceja","cabello"];
  //creo una funcion que retorna un mensaje en caso del que jugador se equivoque le devuelve la traduccion en español
function mensajeError({palabraIngles,traducciónEspañol,continuar}){

  return(<div>
    <h2>"No es correcto, vuelve a intentarlo!</h2>
    <p> <strong>{palabraIngles}</strong> significa: <strong>{traducciónEspañol}</strong> </p>
    <button onClick={continuar}> continuar?</button>
  </div>);

}
function BotonParteCuerpo({nombre,arriba,izquierda,onClick}){
  return(
    <button onClick={()=>onClick(nombre)} style={{top:arriba,left:izquierda}}>   </button>
  )
}
function ImagenCuerpo({ onClickBotonParteCuerpo }) {
  const posiciones = [
    { top: "10%", left: "50%" }, // head
    { top: "18%", left: "43%" }, // eye
    { top: "24%", left: "50%" }, // nose
    { top: "32%", left: "50%" }, // mouth
    { top: "15%", left: "58%" }, // eyebrown
    { top: "4%", left: "50%" },  // hear (cabello)
  ];

  return (
    <div className="contenedor-imagen">
      <img
        src="/img-Juego04/cuerpo humano.jpg"
        alt="Cuerpo humano"
        className="imagen-cuerpo"
      />
      {partesIngles.map((parte, i) => (
        <BotonParteCuerpo
          key={parte}
          nombre={parte}
          arriba={posiciones[i].top}
          izquierda={posiciones[i].left}
          onClick={onClickBotonParteCuerpo}
        />
      ))}
    </div>
  );
}

function Juego04() {
  const [palabraActual, setPalabraActual] = useState(partesIngles[0]);
  const [indicePalabra, setIndicePalabra] = useState(0);
  const [mostrarError, setMostrarError] = useState(false);
  const [traduccion, setTraduccion] = useState("");

  const nuevaPalabraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * partesIngles.length);
    setPalabraActual(partesIngles[indiceAleatorio]);
    setIndicePalabra(indiceAleatorio);
    setMostrarError(false);
  };

  const manejarClickParte = (nombreParte) => {
    if (nombreParte === palabraActual) {
      nuevaPalabraAleatoria();
    } else {
      setTraduccion(partesEspañol[indicePalabra]);
      setMostrarError(true);
    }
  };

  return (
    <div className="juego04-contenedor">
      <h1>Juego de Anatomía en Inglés</h1>
      <p>Identifica las partes del cuerpo en inglés haciendo clic en ellas.</p>

      <p>
        Busca:{" "}
        <span className="palabra-actual">
          {palabraActual.toUpperCase()}
        </span>
      </p>

      <ImagenCuerpo onClickBotonParteCuerpo={manejarClickParte} />

      {mostrarError && (
        <MensajeError
          palabraIngles={palabraActual}
          traduccionEspanol={traduccion}
          continuar={nuevaPalabraAleatoria}
        />
      )}
    </div>
  );
}

export default Juego04;