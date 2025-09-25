import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useAuthContext } from "../../contexts/AuthContext"
import { useModalContext } from "../../contexts/ModalContext"
import "./Contacto.css"

function Contacto() {
    const [state, handleSubmit] = useForm("xnnvlnrz")
    const { user } = useAuthContext()
    const { openLoginModal } = useModalContext()

    return (
        <>
            <title>Contacto - Crisol</title>
            <meta
                name="description"
                content="Contactate con Crisol para consultas, pedidos especiales o regalos empresariales. Estamos para ayudarte."
            />
            <Container className="contacto-container my-5">
                <Row className="justify-content-md-center">
                    <Col md={8} lg={6}>
                        {state.succeeded ? (
                            <Card className="text-center p-4 shadow-sm transparent-dark-card">
                                <Card.Body>
                                    <Card.Title as="h2">¡Gracias por tu mensaje!</Card.Title>
                                    <Card.Text>Recibimos tu consulta y te responderemos a la brevedad.</Card.Text>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card className="p-4 shadow-sm contact-form-dark transparent-dark-card">
                                <Card.Body>
                                    <h2 className="text-center mb-4">¡Conectanos!</h2>
                                    <Form onSubmit={handleSubmit}>
                                        {user && <input type="hidden" name="usuario_logueado" value={user} />}
                                        <Form.Group className="mb-3" controlId="nombre">
                                            <Form.Control type="text" name="nombre" placeholder="tu nombre" required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="tu e-mail"
                                                defaultValue={user || ""}
                                                readOnly={!!user}
                                                required
                                            />
                                            <ValidationError
                                                prefix="Email"
                                                field="email"
                                                errors={state.errors}
                                                className="text-danger"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="mensaje">
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="mensaje"
                                                placeholder="tu mensaje o consulta..."
                                                required
                                            />
                                        </Form.Group>

                                        <div className="d-grid">
                                            <Button variant="primary" type="submit" disabled={state.submitting}>
                                                {state.submitting ? "enviando..." : "enviar!"}
                                            </Button>
                                        </div>
                                        {!user && (
                                            <div className="text-center mt-3 pt-2 border-top border-secondary">
                                                <Button variant="link" onClick={openLoginModal}>
                                                    ¿tenés cuenta o querés crear una?
                                                </Button>
                                            </div>
                                        )}
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contacto
