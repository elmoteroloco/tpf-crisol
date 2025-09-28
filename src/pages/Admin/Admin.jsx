import { Link, Navigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext.jsx"
import { Container, Row, Col } from "react-bootstrap"
import { BsCardList, BsPlusCircle, BsTags } from "react-icons/bs"
import "./Admin.css"

export default function Admin() {
    const { admin } = useAuthContext()

    if (!admin) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            <title>Panel de Administración - Crisol</title>
            <meta
                name="description"
                content="Panel de control para administradores. Gestioná productos, categorías y más."
            />
            <Container className="my-5">
                <h2 className="text-center mb-5">Panel de Administración</h2>
                <Row className="justify-content-center">
                    <Col md={6} lg={4} className="mb-3">
                        <Link to="/admin/productos" className="btn btn-admin-panel w-100">
                            <BsCardList className="me-2" />
                            Gestionar Productos
                        </Link>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Link to="/admin/agregarProducto" className="btn btn-success w-100">
                            <BsPlusCircle className="me-2" />
                            Agregar Producto
                        </Link>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Link to="/admin/categorias" className="btn btn-admin-panel w-100">
                            <BsTags className="me-2" />
                            Gestionar Categorías
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
