import { Container } from 'react-bootstrap';
// Importamos el nuevo componente
import IntegranteCard from "../components/IntegranteCard";

const integrantesData = [
    {
        id: 1,
        nombre: "Navarro Ana Florencia",
        rol: "Diseñador UI/UX",
        datosExtra: "Experiencia en diseño de interfaces",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/mineroFI"
    },
    {
        id: 2,
        nombre: "Quiroga Aldana Rocio",
        rol: "Desarrolladora Backend",
        datosExtra: "Experiencia en Node.js y Express",
        image: "public/image/profileUserAldana.jpeg",
        github: "https://github.com/AldiRQ"
    },
    {
        id: 3,
        nombre: "Gutierrez Efrain Julio Alberto",
        rol: "Desarrollador Full Stack",
        datosExtra: "Experiencia en MERN stack",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/xxx2131N"
    },
    {
        id: 4,
        nombre: "Apasa Pablo Ariel",
        rol: "Desarrollador Backend",
        datosExtra: "Experiencia en Python y Django",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/PabloApasa"
    },
    {
        id: 5,
        nombre: "Cappiello Andrea Victoria",
        rol: "Desarrolladora Frontend",
        datosExtra: "Experiencia en React y Redux",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/Andycap98"
    }
];

function InfoPersonal() {
    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Información Personal de los Integrantes</h1>

            <div className="integrantes-list">
                {/* Iteramos sobre los datos y usamos el componente IntegranteCard */}
                {integrantesData.map((integrante) => (
                    <IntegranteCard
                        key={integrante.id}
                        integrante={integrante}
                    />
                ))}
            </div>
        </Container>
    );
}

export default InfoPersonal;