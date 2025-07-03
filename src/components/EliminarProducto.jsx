import React, { useState } from "react"
import { useProductosContext } from "../contexts/ProductosContext"
import { dispararSweetBasico } from "../assets/SweetAlert"
import { Form, Button, Container, Card, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../styles/EliminarProducto.css"

function EliminarProducto() {
    const { eliminarProducto } = useProductosContext()
    const [idAEliminar, setIdAEliminar] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setIdAEliminar(e.target.value)
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!idAEliminar.trim()) {
            dispararSweetBasico(
                "ID Requerido",
                "Por favor, ingresa el ID del producto a eliminar.",
                "warning",
                "Entendido"
            )
            return
        }

        try {
            await eliminarProducto(idAEliminar)
            dispararSweetBasico(
                "Producto Eliminado!",
                `El producto con ID ${idAEliminar} se eliminó exitosamente.`,
                "success",
                "Ok"
            )
            setIdAEliminar("")
            navigate("/productos")
        } catch (err) {
            console.error("Error al eliminar:", err)
            setError(err.message || "Hubo un problema al eliminar el producto.")
            dispararSweetBasico(
                "Error al Eliminar",
                err.message || "Hubo un problema al eliminar el producto.",
                "error",
                "Cerrar"
            )
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg eliminar-producto-card">
                <h2 className="text-center mb-4">Eliminar Producto</h2>
                {error && (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formIdProducto">
                        <Form.Label className="eliminar-producto-label">
                            ID del Producto:
                        </Form.Label>
                        <Form.Control
                            className="eliminar-producto-input"
                            type="text"
                            name="id"
                            value={idAEliminar}
                            onChange={handleChange}
                            placeholder="Ej: 1, 2, 3..."
                            required
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mt-3">
                        Eliminar Producto
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default EliminarProducto
