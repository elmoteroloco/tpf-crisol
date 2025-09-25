import React, { useContext } from "react"
import CarritoCard from "./CarritoCard.jsx"
import { Navigate, Link } from "react-router-dom"
import { CarritoContext } from "../../contexts/CarritoContext.jsx"
import { useAuthContext } from "../../contexts/AuthContext.jsx"
import { Container, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap"
import "./Carrito.css"
import { BsCartX } from "react-icons/bs"

export default function Carrito() {
    const { user } = useAuthContext()
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito, actualizarCantidad } = useContext(CarritoContext)

    const total = productosCarrito.reduce((subTotal, producto) => subTotal + producto.precio * producto.cantidad, 0)

    function funcionDisparadora(id) {
        borrarProductoCarrito(id)
    }

    function funcionDisparadora2() {
        vaciarCarrito()
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <title>Mi Carrito - Crisol</title>
            <meta
                name="description"
                content="Revisá los productos en tu carrito de compras, ajustá las cantidades y preparate para finalizar tu pedido en Crisol."
            />
            <Container className="my-4 carrito-page-container">
                <div className="d-flex justify-content-end mb-3">
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="tooltip-vaciar-carrito">Vaciar carrito</Tooltip>}
                    >
                        <Button onClick={funcionDisparadora2} className="btn-vaciar-carrito">
                            <BsCartX />
                        </Button>
                    </OverlayTrigger>
                </div>

                {productosCarrito.length > 0 ? (
                    <>
                        {/* Desktop Encabezado */}
                        <Row className="carrito-titulos-row mb-2 pb-2 d-none d-md-flex">
                            <Col md={5} className="text-center ps-4">
                                Producto
                            </Col>
                            <Col md={2} className="text-center">
                                Cant.
                            </Col>
                            <Col md={2} className="text-center">
                                P. Unit.
                            </Col>
                            <Col md={2} className="text-center">
                                Subtotal
                            </Col>
                            {/* Eliminar */}
                            <Col md={1} className="text-center"></Col>
                        </Row>
                        {productosCarrito.map((producto) => (
                            <CarritoCard
                                key={producto.id}
                                producto={producto}
                                funcionDisparadora={funcionDisparadora}
                                onCantidadChange={actualizarCantidad}
                            />
                        ))}
                        <div className="text-end mt-4">
                            <span className="fs-4 fw-bold carrito-total me-3">Total a pagar: $ {total.toFixed(2)}</span>
                            <Button as={Link} to="/checkout" variant="success" size="lg">
                                Completar datos del pago
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="text-center mt-5 fs-5 carrito-vacio-mensaje">Tu carrito está vacío.</p>
                )}
            </Container>
        </>
    )
}
