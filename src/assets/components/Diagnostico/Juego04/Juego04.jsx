//creo una lista y coloco partes del cuerpo en ingles//
const partesIngles= ["head", "eye","nose","mouth","eyebrown","hear"];
//creo una lista pero con las traducciones de la lista anterior//
const partesEspañol= ["cabeza","ojo","nariz","boca","ceja","cabello"];
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