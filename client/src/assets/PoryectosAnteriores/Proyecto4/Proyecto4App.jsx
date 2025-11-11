import { Link } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";
import styles from '../../css/P_4/styles/App.module.css'
import { Saludo } from '../../PoryectosAnteriores/Proyecto4/punto01/saludo.jsx'
import EjercicioBotones from '../../PoryectosAnteriores/Proyecto4/punto02/EjercicioBotones.jsx'
import AppPunto3 from '../../PoryectosAnteriores/Proyecto4/punto03/App.jsx'

function Proyecto4App() {
    let aN = "Navarro Ana Florencia, Apasa Pablo Ariel, Cappiello Andrea Victoria, Gutierrez Efrain, Quiroga Aldana Rocio"
    let aA = "3"

    return (
        <div className={styles.root}>
            <div style={{ padding: '20px', textAlign: 'left' }}>
                <Button
                    as={Link}
                    to="/"
                    variant="primary"
                >
                    Volver al Home del Portal
                </Button>
                <h1 className="my-4">Contenido del Proyecto Grupal 5</h1>

                < Saludo aN={aN} aA={aA} />
                <div className={styles['gif-container']}>
                    <img src="../../../public/img-proyecto4/Helpy.gif" alt="Helpy" className={styles['img-responsive']} />
                </div>
            </div>

            < EjercicioBotones />
            <AppPunto3 />
        </div>
    )
}

export default Proyecto4App