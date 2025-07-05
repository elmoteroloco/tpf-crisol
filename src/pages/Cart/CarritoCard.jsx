import React from "react"
import { Card, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { BsCartDash } from "react-icons/bs"
import SelectorCantidad from "../../components/SelectorCantidad"
import "./CarritoCard.css"

function CarritoCard({ producto, funcionDisparadora, onCantidadChange }) {
    function borrarDelCarrito() {
        funcionDisparadora(producto.id)
    }
    const handleSumar = () => {
        onCantidadChange(producto.id, producto.cantidad + 1)
    }

    const handleRestar = () => {
        onCantidadChange(producto.id, producto.cantidad - 1)
    }

    return (
        <Card className="carrito-card-custom mb-3 p-2 d-flex flex-row align-items-center">
            <Row className="g-0 w-100 align-items-center flex-wrap">
                {/* Mobile
                            Producto (Imagen, Nombre y Descripción) */}
                <Col xs={12} className="d-flex align-items-center d-md-none">
                    <Col xs={4} sm={3} className="text-center">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid carrito-image-thumb"
                        />
                    </Col>
                    <Col xs={8} sm={9} className="text-md-start">
                        <h5 className="mb-0 carrito-card-title">{producto.nombre}</h5>
                        <p className="mb-0 carrito-card-description">{producto.descripcion}</p>
                    </Col>
                </Col>

                {/* Desktop
                            Producto (Imagen y Nombre) */}
                <Col md={5} className="d-none d-md-flex align-items-center order-md-0 ps-3">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid carrito-image-thumb"
                    />
                    <div className="ms-3">
                        <h5 className="mb-1 text-start carrito-card-title">{producto.nombre}</h5>
                        <p className="mb-0 carrito-card-description">{producto.descripcion}</p>
                    </div>
                </Col>

                {/* Desktop/Mobile
                                    Cantidad */}
                <Col
                    xs={12}
                    md={2}
                    className="d-flex justify-content-center align-items-center mt-2 mt-md-0 px-1 order-md-1">
                    <SelectorCantidad
                        cantidad={producto.cantidad}
                        onSumar={handleSumar}
                        onRestar={handleRestar}
                        disabledRestar={producto.cantidad <= 1}
                    />
                </Col>

                {/* Desktop/Mobile
                                    Precio unitario */}
                <Col
                    xs={12}
                    md={2}
                    className="d-flex justify-content-center align-items-center mt-2 mt-md-0 px-1 order-md-2">
                    <div className="carrito-item-wrapper d-flex align-items-center w-100">
                        <span className="carrito-item-label d-md-none">P. Unit:</span>
                        <span className="carrito-item-value ms-auto">$ {producto.precio}</span>
                    </div>
                </Col>

                {/* Desktop/Mobile
                                    Subtotal */}
                <Col
                    xs={12}
                    md={2}
                    className="d-flex justify-content-center align-items-center mt-2 mt-md-0 px-1 order-md-3">
                    <div className="carrito-item-wrapper d-flex align-items-center w-100">
                        <span className="carrito-item-label d-md-none">Subtotal:</span>
                        <span className="carrito-item-value ms-auto">
                            $ {(producto.cantidad * producto.precio).toFixed(2)}
                        </span>
                    </div>
                </Col>

                {/* Desktop/Mobile
                                    Botón */}
                <Col
                    xs={12}
                    md={1}
                    className="d-flex justify-content-center align-items-center mt-2 mt-md-0 order-md-4">
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip id={`tooltip-eliminar-${producto.id}`}>
                                Eliminar artículo
                            </Tooltip>
                        }>
                        <Button
                            onClick={borrarDelCarrito}
                            className="btn-remove-from-cart"
                            aria-label={`Eliminar ${producto.nombre} del carrito`}>
                            <BsCartDash />
                        </Button>
                    </OverlayTrigger>
                </Col>
            </Row>
        </Card>
    )
}

export default CarritoCard
