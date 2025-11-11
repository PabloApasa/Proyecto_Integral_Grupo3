import { Container, Card } from "react-bootstrap";

function NoAutorizado() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="text-center p-5">
        <h1>🚫 Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </Card>
    </Container>
  );
}

export default NoAutorizado;