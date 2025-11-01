import { Row, Container } from 'react-bootstrap';
// Importamos el nuevo componente
import IntegranteCard from "../components/IntegranteCard";

const integrantesData = [
    {
        id: 1,
        nombre: "Juan Pérez",
        rol: "Desarrollador Frontend",
        datosExtra: "Le gusta el React.",
        image: "ruta/a/imagen/juan.jpg"
    },
    {
        id: 2,
        nombre: "María López",
        rol: "Diseñadora UX/UI",
        datosExtra: "Experta en CSS y Bootstrap.",
        image: "ruta/a/imagen/maria.jpg"
    },
    {
        id: 3,
        nombre: "Carlos Gómez",
        rol: "Backend/Database",
        datosExtra: "Maneja Node.js y MongoDB.",
        image: "ruta/a/imagen/carlos.jpg"
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