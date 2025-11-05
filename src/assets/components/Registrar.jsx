

// se usa una libreria para ver los iconos
// npm install react-bootstrap-icons


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

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

    // 🔹 Guarda temporalmente los datos o pásalos por estado, si lo necesitás luego.
    // Ejemplo: navigate("/formularioregistro", { state: { username, password } });
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

            <Button
              variant="success"
              type="submit"
              className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
            >
              Continuar <ArrowRight />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registrar;