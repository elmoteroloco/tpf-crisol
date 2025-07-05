import React, { useEffect, useState, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { CarritoContext } from "../../contexts/CarritoContext"
import { useAuthContext } from "../../contexts/AuthContext"
import { useProductosContext } from "../../contexts/ProductosContext"
import Meta from "../../components/Meta"
import "./ProductoDetalle.css"
import LoadingBar from "../../components/LoadingBar"
import SelectorCantidad from "../../components/SelectorCantidad"
import { BsCartPlus, BsPencilSquare, BsTrash } from "react-icons/bs"
import { toast } from "react-toastify"
import { Container, Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap"
import Swal from "sweetalert2"
import { dispararSweetBasico } from "../../utils/SweetAlert"

function ProductoDetalle() {
    const { admin } = useAuthContext()
    const { agregarAlCarrito } = useContext(CarritoContext)
    const { productoEncontrado, obtenerProducto } = useProductosContext()
    const { eliminarProducto } = useProductosContext()

    const { id } = useParams()
    const navigate = useNavigate()
    const [cantidad, setCantidad] = useState(1)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerProducto(id)
            .then(() => {
                setCargando(false)
            })
            .catch((err) => {
                if (err && err.message === "Producto no encontrado") {
                    setError("Producto no encontrado")
                } else {
                    setError("Hubo un error al obtener el producto.")
                }
                console.error("Error al obtener el producto:", err)
                setCargando(false)
            })
    }, [id, obtenerProducto])

    function funcionCarrito() {
        if (cantidad < 1) {
            dispararSweetBasico(
                "Cantidad Inválida",
                "Por favor, selecciona al menos una unidad del producto.",
                "warning",
                "Entendido"
            )
            return
        }
        dispararSweetBasico(
            "Producto Agregado",
            "El producto fue agregado al carrito con éxito",
            "success",
            "Cerrar"
        )
        agregarAlCarrito({ ...productoEncontrado, cantidad })
    }

    function sumarContador() {
        setCantidad((prevCantidad) => prevCantidad + 1)
    }

    function restarContador() {
        setCantidad((prevCantidad) => (prevCantidad > 1 ? prevCantidad - 1 : 1))
    }

    const handleEliminarProducto = async () => {
        const result = await Swal.fire({
            title: `Eliminar "${productoEncontrado.nombre}"`,
            html: `Para confirmar, por favor escribí: <b>${productoEncontrado.nombre}</b>`,
            input: "text",
            inputPlaceholder: "Escribí el nombre acá",
            inputAttributes: {
                autocapitalize: "off"
            },
            icon: "warning",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            background: "var(--bg-color3)",
            color: "var(--color1)",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swal2-popup-dark-detalle",
                confirmButton: "swal2-confirm-button-custom-detalle",
                cancelButton: "swal2-cancel-button-custom-detalle"
            },
            preConfirm: (inputValue) => {
                if (inputValue !== productoEncontrado.nombre) {
                    Swal.showValidationMessage("El nombre ingresado no coincide.")
                    return false
                }
                return inputValue
            },
            allowOutsideClick: () => !Swal.isLoading()
        })

        if (result.isConfirmed) {
            try {
                await eliminarProducto(productoEncontrado.id)
                toast.success(`El producto "${productoEncontrado.nombre}" ha sido eliminado.`)
                navigate("/admin/productos", { replace: true })
            } catch (error) {
                console.error("Error al eliminar producto desde ProductoDetalle:", error)
                toast.error(error.message || "No se pudo eliminar el producto.")
            }
        }
    }

    if (cargando) {
        return <LoadingBar />
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Card className="p-4 shadow-lg detalle-card-error">
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver a Inicio
                    </Link>
                </Card>
            </Container>
        )
    }

    if (!productoEncontrado) {
        return (
            <Container className="text-center mt-5">
                <Card className="p-4 shadow-lg detalle-card-error">
                    <p>No se pudo cargar la información del producto.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver al inicio
                    </Link>
                </Card>
            </Container>
        )
    }

    return (
        <>
            <Meta
                title={`${productoEncontrado.nombre} - Crisol`}
                description={productoEncontrado.descripcion}
                keywords={`${productoEncontrado.categoria}, ${productoEncontrado.nombre}, regalos, diseño`}
            />
            <Container className="my-5">
                {" "}
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 shadow-lg detalle-card">
                            <Row className="g-0">
                                <Col
                                    md={5}
                                    className="d-flex align-items-center justify-content-center">
                                    <img
                                        className="img-fluid rounded-start"
                                        src={productoEncontrado.imagen}
                                        alt={productoEncontrado.nombre}
                                    />
                                </Col>
                                <Col md={7}>
                                    <Card.Body>
                                        <Card.Title className="text-center mb-3">
                                            {productoEncontrado.nombre}
                                        </Card.Title>
                                        <Card.Text className="text-center mb-4">
                                            {productoEncontrado.descripcion}
                                        </Card.Text>
                                        <Card.Text className="text-center fw-bold fs-4 detalle-precio">
                                            $ {productoEncontrado.precio}
                                        </Card.Text>

                                        <Row className="mb-3 justify-content-center">
                                            <Col xs="auto">
                                                <SelectorCantidad
                                                    cantidad={cantidad}
                                                    onSumar={sumarContador}
                                                    onRestar={restarContador}
                                                    disabledRestar={cantidad <= 1}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-3 justify-content-center">
                                            <Col xs={12} className="d-grid gap-2">
                                                {admin ? (
                                                    <div className="d-flex flex-column flex-sm-row gap-2">
                                                        <Link
                                                            to={`/admin/editarProducto/${id}`}
                                                            className="btn flex-grow-1 btn-admin-detalle btn-editar-detalle">
                                                            <BsPencilSquare className="me-2" />
                                                            Editar artículo
                                                        </Link>
                                                        <Button
                                                            onClick={handleEliminarProducto}
                                                            className="btn flex-grow-1 btn-admin-detalle btn-eliminar-detalle">
                                                            <BsTrash className="me-2" />
                                                            Eliminar artículo
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        className="btn-agregar-carrito"
                                                        onClick={funcionCarrito}>
                                                        <BsCartPlus className="me-2" /> Agregar al
                                                        carrito
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductoDetalle
