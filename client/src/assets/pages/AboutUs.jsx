import { Container } from 'react-bootstrap';
import InfoCard from '../components/InfoCard';

function AboutUs() {
    const data = [
        { title: "Misión", text: "Nuestra misión es explorar el mundo de la tecnologia diceñarla y moldearla para que la sociedad la hacepte en sus vidas" },
        { title: "Visión", text: "Nuestra visión es mejorar eh innobar la sociedad humana mediante la tecnologia y el reconocimiento por lo nuevos logros que haremos " },
        { title: "Valores", text: "Honestidad, Pasión, Innovación." },
    ];


    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Conócenos</h2>
            <div className="info-list">
                {data.map((item, index) => (
                    <InfoCard
                        key={index}
                        info={item}
                    />
                ))}
            </div>
        </Container>

    );
}

export default AboutUs;