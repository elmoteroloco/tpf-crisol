import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"
import { useProductosContext } from "../../contexts/ProductosContext"
import { useModalContext } from "../../contexts/ModalContext"
import Card from "../../components/Card"
import Meta from "../../components/Meta"
import Paginacion from "../../components/Paginacion"
import { Container, Row, Col, Form } from "react-bootstrap"
import "./ProductosContainer.css"
import LoadingBar from "../../components/LoadingBar"

function ProductosContainer() {
    const { user } = useAuthContext()
    const { productos, obtenerProductos, filtrarPorCategoria, buscarPorNombre } =
        useProductosContext()
    const { openLoginModal } = useModalContext()
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    useEffect(() => {
        setLoading(true)
        obtenerProductos()
            .catch((err) => {
                setError("No se pudieron cargar los productos.")
                console.error(err)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (location.state?.showLogin && !user) {
            openLoginModal()
        }
    }, [location.state, user, openLoginModal])

    const categorias = [
        "Todas",
        "Barbería",
        "Billeteros",
        "Bolsos",
        "Bufandas",
        "Joyería",
        "Oficina",
        "Varios"
    ]

    const handleCategoriaChange = (e) => {
        const categoriaSeleccionada = e.target.value
        filtrarPorCategoria(categoriaSeleccionada)
        setCurrentPage(1)
    }

    const handleBusquedaChange = (e) => {
        const termino = e.target.value
        buscarPorNombre(termino)
        setCurrentPage(1)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProductos = productos.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <LoadingBar />
            </Container>
        )
    }

    return (
        <>
            <Meta
                title="Productos - Crisol"
                description="Explorá nuestro catálogo de productos de diseño artesanal. Encontrá el regalo perfecto."
            />
            <Container fluid className="mt-4 pt-3">
                <Row className="mb-4 justify-content-between align-items-center">
                    <Col md={5} lg={4}>
                        <Form.Group controlId="busquedaProducto">
                            <Form.Label className="visually-hidden">Buscar por nombre</Form.Label>
                            <Form.Control
                                type="text"
                                className="filtro-input"
                                placeholder="Buscar por nombre..."
                                onChange={handleBusquedaChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} lg={3} className="mt-3 mt-md-0">
                        <Form.Group controlId="filtroCategoria">
                            <Form.Label className="visually-hidden">
                                Filtrar por categoría
                            </Form.Label>
                            <Form.Select
                                className="filtro-select"
                                onChange={handleCategoriaChange}
                                aria-label="Filtrar por categoría">
                                {categorias.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {currentProductos.length > 0 ? (
                        currentProductos.map((producto) => (
                            <Col key={producto.id} sm={12} md={6} lg={3} className="mb-4">
                                <Card producto={producto} isInteractive={!!user} />
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                        </Col>
                    )}
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Paginacion
                            itemsPerPage={itemsPerPage}
                            totalItems={productos.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductosContainer
