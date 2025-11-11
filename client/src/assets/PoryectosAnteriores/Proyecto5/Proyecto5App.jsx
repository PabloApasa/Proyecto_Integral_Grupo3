import  { Link } from 'react-router-dom';
import { Container, Button  } from "react-bootstrap";
import FormJuego from "../../PoryectosAnteriores/Proyecto5/Formulario/FormJuego";
import AtraparEstrellas from "../../PoryectosAnteriores/Proyecto5/AtraparEstrellas/AtraparEstrellas";

function Proyecto5App() {
  return (
    <Container fluid>
      <div style={{ padding: '20px', textAlign: 'left' }}>
        <Button
          as={Link} 
          to="/"  
          variant="primary" 
        >
          Volver al Home del Portal
        </Button>
      </div>

      <h1 className="my-4">Contenido del Proyecto Grupal 5</h1>

      <FormJuego />

      <AtraparEstrellas />

    </Container>
  );
}

export default Proyecto5App;