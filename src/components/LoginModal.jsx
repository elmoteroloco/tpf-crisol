import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { crearUsuario, iniciarSesion, iniciarSesionConGoogle } from "../firebase/firebase"
import { dispararSweetBasico } from "../utils/SweetAlert"
import { Modal, Button, Form } from "react-bootstrap"
import { FcGoogle } from "react-icons/fc"
import { useAuthContext } from "../contexts/AuthContext"
import "./LoginModal.css"

function LoginModal({ show, onHide }) {
    const { login } = useAuthContext()
    const location = useLocation()
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [isLoginView, setIsLoginView] = useState(true)

    const handleLogin = async (e) => {
        e.preventDefault()
        iniciarSesion(usuario, password)
            .then(() => {
                login(usuario)
                dispararSweetBasico("Inicio exitoso", "", "success", "Confirmar")
                onHide()
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar")
                } else {
                    dispararSweetBasico("Error", "Ocurrió un error inesperado.", "error", "Cerrar")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        crearUsuario(usuario, password)
            .then(() => {
                login(usuario)
                dispararSweetBasico("Registro exitoso", "Ya podés comprar.", "success", "Confirmar")
                onHide()
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    dispararSweetBasico(
                        "Contraseña débil",
                        "La contraseña debe tener al menos 6 caracteres",
                        "error",
                        "Cerrar"
                    )
                } else if (error.code === "auth/email-already-in-use") {
                    dispararSweetBasico(
                        "Email en uso",
                        "El email ingresado ya está registrado.",
                        "error",
                        "Cerrar"
                    )
                } else {
                    dispararSweetBasico("Error", "Ocurrió un error inesperado.", "error", "Cerrar")
                }
            })
    }

    const handleGoogleLogin = () => {
        iniciarSesionConGoogle()
            .then((userCredential) => {
                login(userCredential.email)
                dispararSweetBasico("Inicio exitoso con Google", "", "success", "Confirmar")
                onHide()
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con Google:", error)
                dispararSweetBasico(
                    "Error con Google",
                    "No se pudo iniciar sesión con Google.",
                    "error",
                    "Cerrar"
                )
            })
    }

    const toggleView = () => setIsLoginView(!isLoginView)

    const handleExited = () => {
        setUsuario("")
        setPassword("")
        setIsLoginView(true)
    }

    useEffect(() => {
        if (show) {
            onHide()
        }
    }, [location, onHide])

    return (
        <Modal
            show={show}
            onHide={onHide}
            onExited={handleExited}
            centered
            className="login-modal-custom">
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>{isLoginView ? "Ingresá" : "Creá tu cuenta"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoginView ? (
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="modalLoginEmail">
                            <Form.Control
                                type="email"
                                placeholder="e-mail"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="modalLoginPassword">
                            <Form.Control
                                type="password"
                                placeholder="contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            continuar
                        </Button>
                        <Button variant="link" onClick={toggleView} className="w-100">
                            crear cuenta
                        </Button>
                        <hr />
                        <Button
                            variant="outline-primary"
                            className="w-100 d-flex align-items-center justify-content-center"
                            onClick={handleGoogleLogin}>
                            <FcGoogle className="me-2" />
                            seguí con tu cuenta Google
                        </Button>
                    </Form>
                ) : (
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="modalRegisterEmail">
                            <Form.Control
                                type="email"
                                placeholder="e-mail"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="modalRegisterPassword">
                            <Form.Control
                                type="password"
                                placeholder="contraseña (mín. 6 caracteres)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="secondary" type="submit" className="w-100 mb-3">
                            crear cuenta
                        </Button>
                        <Button variant="link" onClick={toggleView} className="w-100">
                            ya tengo una cuenta
                        </Button>
                        <hr />
                        <Button
                            variant="outline-secondary"
                            className="w-100 d-flex align-items-center justify-content-center"
                            onClick={handleGoogleLogin}>
                            <FcGoogle className="me-2" />
                            seguí con tu cuenta Google
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal
