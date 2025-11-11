import { Card, Col } from 'react-bootstrap';

// El componente recibe un objeto 'integrante' como prop
function IntegranteCard({ integrante }) {
    return (
        <Col>
            <Card className="shadow-sm h-100">
                <Card.Img
                    variant="top"
                    // Usa la ruta de la imagen o un placeholder
                    src={integrante.image || 'https://via.placeholder.com/150'}
                    style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title className="text-primary">{integrante.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{integrante.rol}</Card.Subtitle>
                    <Card.Text>
                        **Datos Adicionales:** {integrante.datosExtra}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Grupo N°3</small>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default IntegranteCard;