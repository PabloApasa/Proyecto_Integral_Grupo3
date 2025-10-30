import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAutorizacion } from "../hooks/AutorizacionSegura";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const { login, isAuthenticated, user } = useAutorizacion();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.rol === 'ADMINISTRATIVO') {
                navigate('/proyectos', { replace: true });
            } else if (user?.rol === 'ALUMNO') {
                navigate('/games', { replace: true });
            } else {
                navigate('/error', { replace: true });
            }
        }
    }, [isAuthenticated, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!username || !password) {
            setLoginError('Por favor, ingresa usuario y contraseña.');
            return;
        }

        const result = await login({ username, password });

        if (!result.success) {
            setLoginError(result.message || 'Error de autenticación desconocido.');
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
        >
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-sm">
                <Card.Body className="p-4">
                    <Card.Title as="h2" className="text-center mb-4">
                        Iniciar Sesión
                    </Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {loginError && (
                            <Alert variant="danger" className="mt-3">
                                {loginError}
                            </Alert>
                        )}

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;