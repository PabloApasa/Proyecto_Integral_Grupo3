// Formulario para entrar al juego o pagina de Ingles
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../../css/FormularioRegistroCSS/FormularioRegistro.css";

function FormularioRegistro() {
  const [paso, setPaso] = useState(1); // 1 = datos personales, 2 = encuesta
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [dni, setDni] = useState("");
  const [sexo, setSexo] = useState("");
  const [pais, setPais] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const datosPrevios = location.state || {};
  const { username, password } = datosPrevios;

  // 🔹 Agregá este bloque justo acá:
  useEffect(() => {
    const handleClickOutside = (event) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        activeElement.classList.contains("form-control") &&
        !event.target.classList.contains("form-control")
      ) {
        activeElement.blur();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const handleContinuar = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !email || !fechaNacimiento || !dni || !sexo || !pais) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Pasar los datos al primer juego
    navigate("/diagnostico/juego01", {
      state: {
        username,
        password,
        nombre,
        apellido,
        email,
        fechaNacimiento,
        dni,
        sexo,
        pais,
        respuestas,
      },
    });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card style={{ width: "100%", maxWidth: "500px" }} className="shadow-sm">
        <Card.Body className="p-4 formulario-registro">
  <Card.Title as="h2" className="text-center mb-4 card-title">
    Completa tu Registro
  </Card.Title>

  <Form onSubmit={handleContinuar}>
    <div className="dos-columnas">
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </Form.Group>
    </div>

    <div className="dos-columnas">
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formFechaNacimiento">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </Form.Group>
    </div>

    <div className="dos-columnas">
      <Form.Group controlId="formDni">
        <Form.Label>DNI</Form.Label>
        <Form.Control
          type="number"
          placeholder="Número de documento"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formSexo">
        <Form.Label>Sexo</Form.Label>
        <Form.Select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </Form.Select>
      </Form.Group>
    </div>

    <Form.Group controlId="formPais">
      <Form.Label>País</Form.Label>
      <Form.Control
        type="text"
        placeholder="Ingresa tu país"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
      />
    </Form.Group>

    <Button variant="primary" type="submit" className="boton-continuar mt-3 w-100">
      Continuar →
    </Button>
  </Form>
</Card.Body>
      </Card>
    </Container>
  );
}

export default FormularioRegistro;