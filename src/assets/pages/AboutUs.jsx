import { Card, Row, Col } from 'react-bootstrap';

function AboutUs() {
    const data = [
        { title: "Misión", text: "Nuestra misión es explorar el mundo de la tecnologia diceñarla y moldearla para que la sociedad la hacepte en sus vidas" },
        { title: "Visión", text: "Nuestra visión es mejorar eh innobar la sociedad humana mediante la tecnologia y el reconocimiento por lo nuevos logros que haremos " },
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