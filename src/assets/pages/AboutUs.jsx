import { Card, Row, Col } from 'react-bootstrap';

function AboutUs() {
    const data = [
        { title: "Misión", text: "Nuestra misión es..." },
        { title: "Visión", text: "Nuestra visión es..." },
        { title: "Valores", text: "Honestidad, Pasión, Innovación." },
    ];

    return (
        <>
            <h2>Conócenos</h2>
            <Row xs={1} md={3} className="g-4">
                {/* Crea 3 columnas para las cards en pantallas medianas o grandes */}
                {data.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default AboutUs;