import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom"
import { useProductosContext } from "../../contexts/ProductosContext"
import { useAuthContext } from "../../contexts/AuthContext"
import LoadingBar from "../../components/LoadingBar"
import { toast } from "react-toastify"
import { Form, Button, Container, Card, Dropdown } from "react-bootstrap"
import "./FormularioEdicion.css"

function FormularioEdicion() {
    const { obtenerProducto, actualizarProducto, categorias } = useProductosContext()
    const { id } = useParams()
    const navigate = useNavigate()
    const { admin } = useAuthContext()

    const [formData, setFormData] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerProducto(id)
            .then((data) => {
                if (data) {
                    setFormData(data)
                } else {
                    throw new Error("Producto no encontrado.")
                }
            })
            .catch((err) => {
                setError(err.message || "Error al cargar el producto.")
                console.error("Error en FormularioEdicion:", err)
            })
            .finally(() => {
                setCargando(false)
            })
    }, [id, obtenerProducto])

    const validarFormulario = () => {
        if (!formData.nombre || !formData.nombre.trim()) {
            return "El nombre es obligatorio."
        }
        if (!formData.categoria) {
            return "Debes seleccionar una categoría."
        }
        if (!formData.precio || isNaN(Number(formData.precio)) || Number(formData.precio) <= 0) {
            return "El precio debe ser un número mayor a 0."
        }
        if (!formData.descripcion || formData.descripcion.trim().length < 10) {
            return "La descripción debe tener al menos 10 caracteres."
        }
        if (!formData.imagen || !formData.imagen.trim()) {
            return "La URL de la imagen no debe estar vacía."
        }
        return true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCategorySelect = (eventKey) => {
        setFormData({ ...formData, categoria: eventKey })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validacion = validarFormulario()
        if (validacion !== true) {
            toast.error(validacion)
            return
        }

        const { id: productoId, ...datosParaActualizar } = formData
        datosParaActualizar.precio = Number(datosParaActualizar.precio)

        try {
            const respuesta = await actualizarProducto(productoId, datosParaActualizar)
            if (respuesta?.simulated) {
                toast.info(`(Dry-Run) ${respuesta.message}`)
            } else {
                toast.success("Artículo actualizado con éxito")
            }
            navigate(`/productos/${productoId}`)
        } catch (err) {
            console.error("Error al actualizar:", err)
            toast.error(`Error: ${err.message || "Hubo un problema al actualizar el artículo"}`)
        }
    }

    if (!admin) {
        return <Navigate to="/" replace />
    }

    if (cargando) {
        return <LoadingBar />
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-lg form-edit-card">
                    <h2 className="text-center mb-4">Error</h2>
                    <p className="text-center">{error}</p>
                    <Link to="/admin" className="btn btn-primary w-100 mt-3">
                        Volver a Admin
                    </Link>
                </Card>
            </Container>
        )
    }

    if (!formData && !cargando) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 shadow-lg form-edit-card">
                    <h2 className="text-center mb-4">Producto no encontrado</h2>
                    <p className="text-center">El ID del producto no existe.</p>
                    <Link to="/admin" className="btn btn-primary w-100 mt-3">
                        Volver a Admin
                    </Link>
                </Card>
            </Container>
        )
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg form-edit-card">
                <h2 className="text-center mb-4">Editar artículos</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNombreProducto">
                        <Form.Label className="form-edit-label">Denominación:</Form.Label>
                        <Form.Control
                            className="form-edit-input"
                            type="text"
                            name="nombre"
                            value={formData.nombre || ""}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategoriaProducto">
                        <Form.Label className="form-edit-label">Categoría:</Form.Label>
                        <Dropdown onSelect={handleCategorySelect} className="d-block">
                            <Dropdown.Toggle
                                className="dropdown-edit-toggle w-100"
                                variant="secondary"
                                id="dropdown-categoria-edicion"
                            >
                                {formData.categoria || "Selecciona una categoría"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-edit-menu">
                                {categorias
                                    .filter((cat) => cat !== "Todas")
                                    .map((cat) => (
                                        <Dropdown.Item key={cat} eventKey={cat}>
                                            {cat}
                                        </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImagenProducto">
                        <Form.Label className="form-edit-label">URL de Imagen:</Form.Label>
                        <Form.Control
                            className="form-edit-input"
                            type="text"
                            name="imagen"
                            value={formData.imagen || ""}
                            onChange={handleChange}
                            placeholder="URL de la imagen"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrecioProducto">
                        <Form.Label className="form-edit-label">Precio:</Form.Label>
                        <Form.Control
                            className="form-edit-input"
                            type="number"
                            name="precio"
                            value={formData.precio || ""}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="Precio del producto"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescripcionProducto">
                        <Form.Label className="form-edit-label">Descripción:</Form.Label>
                        <Form.Control
                            className="form-edit-input"
                            as="textarea"
                            name="descripcion"
                            value={formData.descripcion || ""}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Describe el producto aquí..."
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Actualizar Producto
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default FormularioEdicion
