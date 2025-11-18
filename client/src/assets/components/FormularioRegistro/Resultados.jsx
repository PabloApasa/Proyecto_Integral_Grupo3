
import React, { useEffect, useState, useCallback } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import { useAutorizacion } from "../../hooks/AutorizacionSegura";

function Resultados() {
    const [usuarios, setUsuarios] = useState([]);

    const cargarDesdeLocalStorage = useCallback(() => {
        const data = JSON.parse(localStorage.getItem("usuarios")) || [];
        // Filtrar sólo entradas que tengan puntaje o que provengan del formulario
        const filtrados = data.filter(u => u && (u.puntaje !== undefined || u.username));
        filtrados.sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
        setUsuarios(filtrados);
    }, []);

    useEffect(() => {
        cargarDesdeLocalStorage();

        // Escuchar cambios en localStorage (si otra pestaña actualiza)
        const onStorage = (e) => {
            if (e.key === 'usuarios') cargarDesdeLocalStorage();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [cargarDesdeLocalStorage]);

    const { user } = useAutorizacion() || {};

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="mb-0">📊 Resultados del Diagnóstico</h2>
                        {user?.username && (
                            <small className="text-muted">Sesión: <strong>{user.nombre ? `${user.nombre} ${user.apellido || ''}` : user.username}</strong></small>
                        )}
                    </div>
                    <Button variant="outline-primary" size="sm" onClick={cargarDesdeLocalStorage}>
                        Actualizar
                    </Button>
                </div>

                {usuarios.length === 0 ? (
                    <p className="text-center text-muted">No hay resultados registrados todavía.</p>
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
                            {usuarios.map((u, index) => {
                                const isCurrent = user && u.username && user.username === u.username;
                                return (
                                    <tr key={u.username || index} className={isCurrent ? 'table-primary' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{u.nombre || '-'}</td>
                                        <td>{u.apellido || '-'}</td>
                                        <td>{u.username || '-'}</td>
                                        <td>{u.email || '-'}</td>
                                        <td><strong>{u.puntaje ?? "-"}</strong></td>
                                        <td>
                                            {u.respuestas && typeof u.respuestas === 'object' ? (
                                                <details>
                                                    <summary style={{ cursor: 'pointer' }}>Ver</summary>
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                )}
            </Card>
        </Container>
    );
}

export default Resultados;
