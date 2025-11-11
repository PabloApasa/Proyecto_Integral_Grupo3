export function Saludo({ aN, aA }) {
    return (
        <div>
            <h1>Saludos, este es el componente</h1>
            <h2>Integrantes: </h2>
            <p>{aN}</p>
            <h2>Numero de Grupo: </h2>
            <p>{aA}</p>
        </div>
    )
}