// Formulario para entrar al juego o pagina de Ingles

import { useState, useEffect } from "react";
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

  // Preguntas de la encuesta
  const [respuestas, setRespuestas] = useState({
    ingles: "",
    motivacion: "",
    practica: "",
    origen: "",
    objetivo: "",
    dificultad: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const datosPrevios = location.state || {};
  const { username, password } = datosPrevios;

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

  const handleContinuarDatos = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email || !fechaNacimiento || !dni || !sexo || !pais) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setPaso(2); // Avanza a las preguntas
  };

  const handleChangeRespuesta = (pregunta, valor) => {
    setRespuestas((prev) => ({ ...prev, [pregunta]: valor }));
  };

  const handleContinuarDiagnostico = () => {
    const todasContestadas = Object.values(respuestas).every((r) => r !== "");
    if (!todasContestadas) {
      alert("Por favor, responde todas las preguntas antes de continuar.");
      return;
    }

    navigate("/diagnostico", {
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

  // 🔹 Paso 1: Datos personales
  if (paso === 1) {
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

            <Form onSubmit={handleContinuarDatos}>
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
                  <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
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

  // 🔹 Paso 2: Encuesta previa
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f9ff" }}
    >
      <Card style={{ width: "100%", maxWidth: "700px" }} className="shadow-sm">
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-4" style={{ fontSize: "1.8rem" }}>
            📝 Encuesta previa al diagnóstico
          </Card.Title>

          <Form style={{ fontSize: "1.1rem" }}>
            <Form.Group className="mb-4">
              <Form.Label>1️⃣ ¿Cuánto sabes de inglés?</Form.Label>
              {["Nada", "Básico", "Intermedio", "Avanzado"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="ingles"
                  label={op}
                  checked={respuestas.ingles === op}
                  onChange={() => handleChangeRespuesta("ingles", op)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>2️⃣ ¿Qué te motivó a aprender inglés?</Form.Label>
              {["Trabajo", "Estudios", "Viajes", "Interés personal"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="motivacion"
                  label={op}
                  checked={respuestas.motivacion === op}
                  onChange={() => handleChangeRespuesta("motivacion", op)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>3️⃣ ¿Cuántas veces al día practicas inglés?</Form.Label>
              {["Nunca", "1 vez", "2-3 veces", "Más de 3 veces"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="practica"
                  label={op}
                  checked={respuestas.practica === op}
                  onChange={() => handleChangeRespuesta("practica", op)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>4️⃣ ¿Dónde conociste la página?</Form.Label>
              {["Redes sociales", "Recomendación", "Google", "Otro"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="origen"
                  label={op}
                  checked={respuestas.origen === op}
                  onChange={() => handleChangeRespuesta("origen", op)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>5️⃣ ¿Cuál es tu principal objetivo con el inglés?</Form.Label>
              {["Hablar mejor", "Entender películas", "Viajar", "Aprobar exámenes"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="objetivo"
                  label={op}
                  checked={respuestas.objetivo === op}
                  onChange={() => handleChangeRespuesta("objetivo", op)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>6️⃣ ¿Qué aspecto te resulta más difícil?</Form.Label>
              {["Gramática", "Escucha", "Pronunciación", "Vocabulario"].map((op) => (
                <Form.Check
                  key={op}
                  type="radio"
                  name="dificultad"
                  label={op}
                  checked={respuestas.dificultad === op}
                  onChange={() => handleChangeRespuesta("dificultad", op)}
                />
              ))}
            </Form.Group>

            <Button
              variant="success"
              className="mt-4 w-100"
              style={{ fontSize: "1.2rem", padding: "10px" }}
              onClick={handleContinuarDiagnostico}
            >
              Continuar al Diagnóstico →
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FormularioRegistro;