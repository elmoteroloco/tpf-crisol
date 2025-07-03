import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"
import { useAuthContext } from "../../contexts/AuthContext"
import { CarritoContext } from "../../contexts/CarritoContext"
import { crearOrdenDeCompra } from "../../firebase/firebase"
import { dispararSweetBasico } from "../../utils/SweetAlert"

function Checkout() {
    const { user } = useAuthContext()
    const { productosCarrito, vaciarCarrito } = useContext(CarritoContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        direccion: ""
    })

    const total = productosCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.nombre || !formData.telefono || !formData.direccion) {
            dispararSweetBasico(
                "Campos incompletos",
                "Por favor, completá todos los datos para continuar.",
                "warning",
                "Ok"
            )
            return
        }

        const orden = {
            comprador: {
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: user,
                direccion: formData.direccion
            },
            items: productosCarrito,
            total: total
        }

        try {
            const ordenId = await crearOrdenDeCompra(orden)
            vaciarCarrito()
            await dispararSweetBasico(
                "¡Compra exitosa!",
                `Tu orden ha sido generada con el ID: ${ordenId}`,
                "success",
                "¡Genial!"
            )
            navigate("/")
        } catch (error) {
            console.error("Error al crear la orden: ", error)
            dispararSweetBasico(
                "Error",
                "No se pudo completar la compra. Por favor, intentá de nuevo.",
                "error",
                "Cerrar"
            )
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow-lg">
                        <h2 className="text-center mb-4">Tu compra</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Domicilio de envío</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Confirmá tu compra, son $ {total.toFixed(2)}
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Checkout
