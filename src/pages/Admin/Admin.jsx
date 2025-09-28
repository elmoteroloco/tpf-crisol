import React from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import { Navigate, Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { BsBoxSeam, BsPlusCircle, BsTags } from "react-icons/bs"
import "../AdminProductos/AdminProductos.css"

export default function Admin() {
    const { user, admin } = useAuthContext()

    if (!user || !admin) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            <title>Panel de Administración - Crisol</title>
            <Container className="my-5 admin-dashboard">
                <h2 className="text-center mb-5 admin-title">Panel de Administración</h2>
                <Row>
                    <Col md={4} className="text-center admin-link-card">
                        <Link to="/admin/productos" className="admin-link">
                            <BsBoxSeam size={50} />
                            <h3>Gestionar Productos</h3>
                        </Link>
                    </Col>
                    <Col md={4} className="text-center admin-link-card">
                        <Link to="/admin/agregarProducto" className="admin-link">
                            <BsPlusCircle size={50} />
                            <h3>Agregar Producto</h3>
                        </Link>
                    </Col>
                    <Col md={4} className="text-center admin-link-card">
                        <Link to="/admin/categorias" className="admin-link">
                            <BsTags size={50} />
                            <h3>Gestionar Categorías</h3>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
