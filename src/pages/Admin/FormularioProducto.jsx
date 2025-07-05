import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"
import { useProductosContext } from "../../contexts/ProductosContext"
import { Form, Button, Container, Card, Dropdown } from "react-bootstrap"
import { toast } from "react-toastify"
import "./FormularioProducto.css"

function FormularioProducto() {
    const { admin } = useAuthContext()
    const { agregarProducto } = useProductosContext()

    const categorias = [
        "Barbería",
        "Billeteros",
        "Bolsos",
        "Bufandas",
        "Joyería",
        "Oficina",
        "Varios"
    ]

    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        categoria: ""
    })

    const validarFormulario = () => {
        if (!producto.nombre.trim()) {
            return "El nombre es obligatorio."
        }
        if (!producto.categoria) {
            return "Debes seleccionar una categoría."
        }
        if (!producto.precio || producto.precio <= 0) {
            return "El precio debe ser mayor a 0."
        }
        if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
            return "La descripción debe tener al menos 10 caracteres."
        }
        if (!producto.imagen.trim()) {
            return "La url de la imagen no debe estar vacía"
        } else {
            return true
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProducto({ ...producto, [name]: value })
    }

    const handleCategorySelect = (eventKey) => {
        setProducto({ ...producto, categoria: eventKey })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validarForm = validarFormulario()
        if (validarForm === true) {
            agregarProducto(producto)
                .then((data) => {
                    toast.success("Artículo agregado con éxito")
                    setProducto({
                        nombre: "",
                        precio: "",
                        descripcion: "",
                        imagen: "",
                        categoria: ""
                    })
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message || "Error desconocido"}`)
                })
        } else {
            toast.error(validarForm)
        }
    }

    if (!admin) {
        return <Navigate to="/login" replace />
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg form-add-card">
                <h2 className="text-center mb-4">Agregar artículos</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNombreProducto">
                        <Form.Label className="form-add-label">Nombre:</Form.Label>
                        <Form.Control
                            className="form-add-input"
                            type="text"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            placeholder="Denominación"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCategoriaProducto">
                        <Form.Label className="form-add-label">Categoría:</Form.Label>
                        <Dropdown onSelect={handleCategorySelect} className="d-block">
                            <Dropdown.Toggle
                                className="dropdown-add-toggle w-100"
                                variant="secondary"
                                id="dropdown-categoria-agregar">
                                {producto.categoria || "Selecciona una categoría"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-add-menu">
                                {categorias.map((cat) => (
                                    <Dropdown.Item key={cat} eventKey={cat}>
                                        {cat}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImagenProducto">
                        <Form.Label className="form-add-label">URL de Imagen:</Form.Label>
                        <Form.Control
                            className="form-add-input"
                            type="text"
                            name="imagen"
                            value={producto.imagen}
                            onChange={handleChange}
                            placeholder="URL de imagen"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrecioProducto">
                        <Form.Label className="form-add-label">Precio:</Form.Label>
                        <Form.Control
                            className="form-add-input"
                            type="number"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="Precio"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescripcionProducto">
                        <Form.Label className="form-add-label">Descripción:</Form.Label>
                        <Form.Control
                            className="form-add-input"
                            as="textarea"
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Descripción"
                        />
                    </Form.Group>

                    <Button type="submit" className="w-100 mt-3 form-add-button">
                        Actualizar dB
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default FormularioProducto
