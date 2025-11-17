
import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "react-bootstrap";

function Resultados() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Leer usuarios del localStorage
        const data = JSON.parse(localStorage.getItem("usuarios")) || [];
        //setUsuarios(usuarios.sort((a, b) => b.puntaje - a.puntaje));
        setUsuarios(data);
    }, []);

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <h2 className="text-center mb-4">📊 Resultados del Diagnóstico</h2>

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
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido} {u.apellido}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td><strong>{u.puntaje ?? "-"}</strong></td>
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
