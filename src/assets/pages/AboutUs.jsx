import { Container } from 'react-bootstrap';
import InfoCard from '../components/InfoCard';

function AboutUs() {
    const data = [
        { title: "Misión", text: "Nuestra misión es...", icon: "🎯" },
        { title: "Visión", text: "Nuestra visión es...", icon: "🔮" },
        { title: "Valores", text: "Honestidad, Pasión, Innovación.", icon: "💎" },
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