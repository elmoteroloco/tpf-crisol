import React, { useState, useContext } from "react"
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"
import { useAuthContext } from "../../contexts/AuthContext"
import { CarritoContext } from "../../contexts/CarritoContext"
import { crearOrdenDeCompra } from "../../firebase/firebase"
import "./Checkout.css"
import { dispararSweetBasico } from "../../utils/SweetAlert"

function Checkout() {
    const { user } = useAuthContext()
    const { productosCarrito, vaciarCarrito } = useContext(CarritoContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        direccion: "",
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
                "Ok",
            )
            return
        }

        const orden = {
            comprador: {
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: user,
                direccion: formData.direccion,
            },
            items: productosCarrito,
            total: total,
        }

        try {
            const ordenId = await crearOrdenDeCompra(orden)
            vaciarCarrito()
            await dispararSweetBasico(
                "¡Compra exitosa!",
                `Tu orden ha sido generada con el ID: ${ordenId}`,
                "success",
                "¡Genial!",
            )
            navigate("/")
        } catch (error) {
            console.error("Error al crear la orden: ", error)
            dispararSweetBasico(
                "Error",
                "No se pudo completar la compra. Por favor, intentá de nuevo.",
                "error",
                "Cerrar",
            )
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
            <Card className="p-4 shadow-lg checkout-card">
                <h2 className="text-center mb-4">Finalizar Compra</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="checkoutNombre">
                        <Form.Label className="checkout-label">Nombre completo</Form.Label>
                        <Form.Control
                            className="checkout-input"
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Cómo figura en tu DNI"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkoutTelefono">
                        <Form.Label className="checkout-label">Teléfono</Form.Label>
                        <Form.Control
                            className="checkout-input"
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Código de área sin 0 y sin 15"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkoutDireccion">
                        <Form.Label className="checkout-label">Domicilio de envío</Form.Label>
                        <Form.Control
                            className="checkout-input"
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Calle, número, piso, depto, etc."
                            required
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button type="submit" className="checkout-button mt-3">
                            Confirmar Compra por ${total.toFixed(2)}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Checkout
