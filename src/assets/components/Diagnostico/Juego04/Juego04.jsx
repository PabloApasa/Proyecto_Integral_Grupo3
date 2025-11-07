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
function imagenCuerpo ({onClickBotonParteCuerpo}){
  return (
   <div></div>
  )
}
function Juego04() {
 const [palabraActual,setpalabraActual]= useState (partesIngles[0]);
  const [indicePalabra,setindicepalabra]= useState ( 0);
  const [acierta,setacierta]= useState (false);//jugador comienza la partida//
  const [traduccion,settraduccion] = useState ("");//variable para guardar la traduccion de la palabra en caso de que se equivoque el jugador//
  const nuevaPalabraAleatoria = ()=> {
    const indiceAleatorio= Math.floor (Math.random()*partesIngles.length);
    setpalabraActual(partesIngles[indiceAleatorio]);
    setindicepalabra(indiceAleatorio);
   // setacierta(true)//
  }
  return (
    
    <div>
      <h1>Juego de Anatomía en Inglés</h1>
      <p>Identifica las partes del cuerpo en inglés haciendo clic en ellas.</p>
    </div>
  );
}

export default Juego04;