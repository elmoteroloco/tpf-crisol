import React, { useState } from "react"
import { useProductosContext } from "../../contexts/ProductosContext"
import { Container, Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { BsTrash } from "react-icons/bs"
import "./GestionCategorias.css"

function GestionCategorias() {
    const { categorias, agregarCategoria, eliminarCategoria } = useProductosContext()
    const [nuevaCategoria, setNuevaCategoria] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!nuevaCategoria.trim()) {
            toast.warn("El nombre de la categoría no puede estar vacío.")
            return
        }
        try {
            const respuesta = await agregarCategoria(nuevaCategoria)
            if (respuesta?.simulated) {
                toast.info(`(Dry-Run) ${respuesta.message}`)
            } else {
                toast.success(`Categoría "${nuevaCategoria}" agregada con éxito.`)
            }
            setNuevaCategoria("")
        } catch (error) {
            toast.error(`Error al agregar categoría: ${error.message}`)
        }
    }

    const handleEliminar = async (categoria) => {
        const result = await Swal.fire({
            title: `¿Eliminar "${categoria}"?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, ¡eliminar!",
            cancelButtonText: "Cancelar",
        })

        if (result.isConfirmed) {
            try {
                const respuesta = await eliminarCategoria(categoria)
                if (respuesta?.simulated) {
                    toast.info(`(Dry-Run) ${respuesta.message}`)
                } else {
                    toast.success(`Categoría "${categoria}" eliminada.`)
                }
            } catch (error) {
                toast.error(`Error al eliminar: ${error.message}`)
            }
        }
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card className="p-4 shadow-lg gestion-categorias-card">
                <h2 className="text-center mb-4">Gestionar Categorías</h2>
                <Form onSubmit={handleSubmit} className="mb-4">
                    <Row className="align-items-end">
                        <Col>
                            <Form.Group controlId="formNuevaCategoria">
                                <Form.Label className="gestion-categorias-label">Nueva Categoría</Form.Label>
                                <Form.Control
                                    className="gestion-categorias-input"
                                    type="text"
                                    value={nuevaCategoria}
                                    onChange={(e) => setNuevaCategoria(e.target.value)}
                                    placeholder="Nombre de la categoría"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" className="gestion-categorias-button">
                                Agregar
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <div className="category-list-wrapper">
                    <ListGroup>
                        {categorias
                            .filter((cat) => cat !== "Todas")
                            .map((cat) => (
                                <ListGroup.Item key={cat} className="d-flex justify-content-between align-items-center">
                                    {cat}
                                    <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(cat)}>
                                        <BsTrash />
                                    </Button>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            </Card>
        </Container>
    )
}

export default GestionCategorias
