import { Row, Container } from 'react-bootstrap';
// Importamos el nuevo componente
import IntegranteCard from "../components/IntegranteCard";

const integrantesData = [
    {
        id: 1,
        nombre: "---",
        rol: "---",
        datosExtra: "----",
        image: "----"
    },
    {
        id: 2,
        nombre: "---",
        rol: "----",
        datosExtra: "-----",
        image: "----"
    },
    {
        id: 3,
        nombre: "-----",
        rol: "-----",
        datosExtra: "-----",
        image: "----"
    },
];

function InfoPersonal() {
    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Información Personal de los Integrantes</h1>

            <Row xs={1} md={2} lg={3} className="g-4">
                {/* Iteramos sobre los datos y usamos el componente IntegranteCard */}
                {integrantesData.map((integrante) => (
                    <IntegranteCard
                        key={integrante.id}
                        integrante={integrante}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default InfoPersonal;