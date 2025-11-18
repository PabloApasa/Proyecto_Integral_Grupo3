
import React, { useEffect, useState } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";

function Resultados() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Leer usuarios del localStorage
        const data = JSON.parse(localStorage.getItem("usuarios")) || [];
        // Mostrar solo registros que contienen puntaje (resultados del diagnóstico)
        const resultados = data.filter((u) => typeof u.puntaje === 'number');

        // Crear mapa de cuentas para completar nombre/apellido cuando falten
        const cuentas = new Map();
        data.forEach(item => {
            if (!item) return;
            const esCuenta = item.password || (item.username && (item.nombre || item.email)) && typeof item.puntaje !== 'number';
            if (item.username && esCuenta) cuentas.set(item.username, item);
        });

        const enriquecidos = resultados.map(u => {
            const cuenta = u.username ? cuentas.get(u.username) : null;
            return {
                ...u,
                nombre: u.nombre || (cuenta && cuenta.nombre) || u.username || '-',
                apellido: u.apellido || (cuenta && cuenta.apellido) || '-',
            };
        });

        // Ordenar por puntaje descendente
        const ordenados = enriquecidos.slice().sort((a, b) => b.puntaje - a.puntaje);
        setUsuarios(ordenados);
    }, []);

    const eliminarTodos = () => {
        if (!confirm('¿Seguro que quieres eliminar TODOS los resultados? Esta acción no se puede deshacer.')) return;
        // Eliminamos únicamente las entradas que tienen `puntaje`, conservando las cuentas registradas (sin puntaje)
        const data = JSON.parse(localStorage.getItem('usuarios')) || [];
        const filtrados = data.filter((u) => typeof u.puntaje !== 'number');
        localStorage.setItem('usuarios', JSON.stringify(filtrados));
        setUsuarios([]);
    };

    const eliminarRegistro = (username) => {
        // Eliminar SOLO la entrada de resultado asociada a este username, no las cuentas sin puntaje
        const data = JSON.parse(localStorage.getItem('usuarios')) || [];
        const filtrados = data.filter((u) => !(u.username === username && typeof u.puntaje === 'number'));
        localStorage.setItem('usuarios', JSON.stringify(filtrados));
        const resultados = filtrados.filter((u) => typeof u.puntaje === 'number');
        const ordenados = resultados.slice().sort((a, b) => b.puntaje - a.puntaje);
        setUsuarios(ordenados);
    };

    const actualizarResultados = () => {
        const data = JSON.parse(localStorage.getItem('usuarios')) || [];
        const ordenados = data.slice().sort((a, b) => {
            const pa = typeof a.puntaje === 'number' ? a.puntaje : -1;
            const pb = typeof b.puntaje === 'number' ? b.puntaje : -1;
            return pb - pa;
        });
        setUsuarios(ordenados);
    };

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <h2 className="text-center mb-4">📊 Resultados del Diagnóstico</h2>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-center mb-0">📊 Resultados del Diagnóstico</h2>
                    {usuarios.length > 0 && (
                        <div>
                            <Button variant="secondary" className="me-2" onClick={actualizarResultados}>Actualizar</Button>
                            <Button variant="danger" onClick={eliminarTodos}>Eliminar todos</Button>
                        </div>
                    )}
                </div>

                {usuarios.length === 0 ? (
                    <p className="text-center text-muted">
                        No hay resultados registrados todavía.
                    </p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th>USUARIO</th>
                                <th>EMAIL</th>
                                <th>Puntaje</th>
                                <th>Respuestas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{u.nombre || u.username || "-"}</td>
                                    <td>{u.apellido || "-"}</td>
                                    <td>{u.username || u.email || (u.nombre ? `${u.nombre}${u.apellido ? ' ' + u.apellido : ''}` : "-")}</td>
                                    <td>{u.email || "-"}</td>
                                    <td><strong>{typeof u.puntaje === 'number' ? u.puntaje : "-"}</strong></td>
                                    <td style={{ minWidth: 220 }}>
                                        {u.respuestas && typeof u.respuestas === 'object' ? (
                                            <details>
                                                <summary style={{ cursor: 'pointer' }}>Ver respuestas</summary>
                                                <div style={{ textAlign: 'left', marginTop: 8 }}>
                                                    {Object.entries(u.respuestas).map(([k, v]) => (
                                                        <div key={k}><strong>{k}:</strong> {v}</div>
                                                    ))}
                                                </div>
                                            </details>
                                        ) : (
                                            <span className="text-muted">-</span>
                                        )}
                                    </td>
                                    <td style={{ minWidth: 140 }}>
                                        <Button variant="outline-danger" size="sm" onClick={() => eliminarRegistro(u.username)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </Container>
    );
}

export default Resultados;
