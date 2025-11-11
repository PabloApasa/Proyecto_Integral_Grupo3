import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function Games() {
  const juegos = [
    {
      id: 1,
      titulo: "🎨 Juego 01 - Botón Color",
      descripcion: "Haz clic en el color correcto según la palabra mostrada.",
      ruta: "/juego01",
    },
    {
      id: 2,
      titulo: "🖼️ Juego 02 - Imágenes",
      descripcion: "Selecciona la imagen correcta según la palabra dada.",
      ruta: "/juego02",
    },
    {
      id: 3,
      titulo: "🔢 Juego 03 - Números",
      descripcion: "Responde correctamente las operaciones con números.",
      ruta: "/juego03",
    },
    {
      id: 4,
      titulo: "⏰ Juego 04 - Días/Semana",
      descripcion: "Relaciona los días y horarios en inglés correctamente.",
      ruta: "/juego04",
    },
    {
      id: 5,
      titulo: "🧠 Diagnóstico",
      descripcion: "Completa un breve test con los 4 juegos para evaluar tu nivel.",
      ruta: "/diagnostico",
    },
  ];

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">🎮 Zona de Juegos</h1>
      <p className="mb-5">Selecciona un juego para comenzar tu desafío.</p>

      <Row xs={1} sm={2} md={3} lg={3} className="g-4 justify-content-center">
        {juegos.map((juego) => (
          <Col key={juego.id}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="fs-4">{juego.titulo}</Card.Title>
                <Card.Text className="text-muted">{juego.descripcion}</Card.Text>
                <Button as={Link} to={juego.ruta} variant="primary">
                  Jugar →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Games;