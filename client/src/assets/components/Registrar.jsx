import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useAutorizacion } from '../hooks/AutorizacionSegura'; // ✅ importante


const PASSWORD_REGEX = {
    minLength: /^.{8,}$/,
    uppercase: /(?=.*[A-Z])/,
    lowercase: /(?=.*[a-z])/,
    number: /(?=.*\d)/,
    isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function Registrar() {
    const [regError, setRegError] = useState('');
    const [validado, setValidado] = useState(false);
    const [erroresPassword, setErroresPassword] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false
    });

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        fechaNac: new Date(),
        estado: true,
        username: '',
        password: '',
        puntaje: 0,
        rol: 'ALUMNO-INGLES'
    });

    const navigate = useNavigate();
    const { buscarUsuarios } = useAutorizacion(); // para refrescar la lista de usuarios en el contexto


    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'password') {
            setErroresPassword({
                minLength: PASSWORD_REGEX.minLength.test(value),
                uppercase: PASSWORD_REGEX.uppercase.test(value),
                lowercase: PASSWORD_REGEX.lowercase.test(value),
                number: PASSWORD_REGEX.number.test(value)
            });
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setRegError('');
        const form = e.currentTarget;
        const passwordValido = PASSWORD_REGEX.isValid.test(usuario.password);


        if (form.checkValidity() === false || !passwordValido) {
            setValidado(true);
            alert('Error en el formulario! ');
        } else {
            alert('Formulario enviado con exito!' + usuario.apellido);

            try {
                const response = await axios.post('/api/registrarUsuario', usuario);

                /***if (response.data.success) {
                    console.log('Usuario registrado con exito en la BD');
                    setUser({
                        username: usuario.username,
                        rol: 'ALUMNO-INGLES',
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                    })
                    alert('¡Formulario enviado con éxito! Redirigiendo al diagnóstico...');
                    // 🚀 Redirige al diagnóstico
                    navigate('/diagnostico');*/

                if (response.data.success) {
                    console.log('Usuario registrado con exito en la BD');

                    // Refrescar usuarios en el contexto sin recargar la página
                    try {
                        if (typeof buscarUsuarios === 'function') {
                            await buscarUsuarios();
                        }
                    } catch (err) {
                        console.warn('No se pudo refrescar lista de usuarios en contexto:', err);
                    }

                    // No iniciar sesión automáticamente: solo registrar en la BD.
                    alert('Usuario registrado con éxito. Por favor, inicia sesión para continuar.');
                    navigate('/login');

                }
                else {
                    setRegError(response.data.message || 'Error desconocido durante el registro');
                }
            } catch (error) {
                console.error('Error de registro o conexion', error);
                setRegError(error.message || 'Fallo de conexion. Intentelo mas tarde');
            }

            setUsuario({ nombre: '', apellido: '', username: '', password: '' });
            setValidado(false);
            setErroresPassword({ minLength: false, uppercase: false, lowercase: false, number: false });
        }
    };

    const passwordInvalido = Object.values(erroresPassword).some(error => error);

    return (
        <>
            <Form noValidate validated={validado} onSubmit={manejarSubmit} className="p-a borderrounded shadow-sm">
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlld="validacionNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nombre"
                            value={usuario.nombre}
                            onChange={manejarCambio}
                            placeholder="Ingrese su Nombre"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese su nombre.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validacionApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="apellido"
                            value={usuario.apellido}
                            onChange={manejarCambio}
                            placeholder="Ingrese su Apellido"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese su apellido.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId='validacionUsername'>
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="username"
                        value={usuario.username}
                        onChange={manejarCambio}
                        placeholder="Ingrese su Nombre de Usuario"
                        minLength="5" //validacion HTML5 para minimo de 5 caracteres
                    />
                    <Form.Control.Feedback type="invalid">
                        El nombre de usuario es requerido y debe tener al menos 5 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        value={usuario.password}
                        onChange={manejarCambio}
                        placeholder="Ingrese su Contraseña"
                        isValid={validado && passwordInvalido}
                    />
                    <Form.Control.Feedback type="invalid">
                        <p className="mb-1 text-bold">La Contraseña debe cumplir con:</p>
                        <small className={erroresPassword.minLength ? 'text-danger' : 'text-success'}>
                            {erroresPassword.minLength ? 'No cumple' : 'Cumple'} Minimo 8 caracteres.
                        </small><br />
                        <small className={erroresPassword.uppercase ? 'text-danger' : 'text-success'}>
                            {erroresPassword.uppercase ? 'No cumple' : 'Cumple'} Al menos una letra mayúscula.
                        </small><br />
                        <small className={erroresPassword.lowercase ? 'text-danger' : 'text-success'}>
                            {erroresPassword.lowercase ? 'No cumple' : 'Cumple'} Al menos una letra minúscula.
                        </small><br />
                        <small className={erroresPassword.number ? 'text-danger' : 'text-success'}>
                            {erroresPassword.number ? 'No cumple' : 'Cumple'} Al menos un número.
                        </small>
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submite">Registrarse</Button>
            </Form>
        </>
    )
}

export default Registrar;