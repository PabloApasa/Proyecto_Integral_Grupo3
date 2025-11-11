
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
//import axios from "axios"

//* validacioin de Contraseña
//const PASSWORD_REGEX ={
//  minLength: /^.{8,}$/,
  //uppercase: /(?=.*[A-Z])/,
  //lowercase: /(?=.*[a-z])/,
 // number: /(?=.*\d)/,
  //isValid: /^(?=.*[a_z])(?=.*[A_Z])(?=.*\d)[A-Z a-z\d]{8,}$/
// };

function Registrar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor completa ambos campos antes de continuar.");
      return;
    }

    navigate("/formularioregistro");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-sm">
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-4">
            Registrarse
          </Card.Title>

          <Form onSubmit={handleContinue}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Continuar →
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registrar;