import React, { useState, useMemo } from "react"
import { useProductosContext } from "../../contexts/ProductosContext"
import { Container, Table, Form, InputGroup, Button, Image, OverlayTrigger, Tooltip, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsPencilSquare, BsTrash, BsArrowsFullscreen } from "react-icons/bs"
import Paginacion from "../../components/Paginacion"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import "./AdminProductos.css"

const PRODUCTOS_POR_PAGINA = 10

function AdminProductos() {
    const { productos, categorias, filtrarPorCategoria, buscarPorNombre, eliminarProducto } = useProductosContext()
    const [paginaActual, setPaginaActual] = useState(1)
    const [showImageModal, setShowImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleShowImage = (imageUrl) => {
        setSelectedImage(imageUrl)
        setShowImageModal(true)
    }
    const handleCloseImage = () => setShowImageModal(false)

    const handleFiltroCategoria = (e) => {
        filtrarPorCategoria(e.target.value)
        setPaginaActual(1)
    }

    const handleBusqueda = (e) => {
        buscarPorNombre(e.target.value)
        setPaginaActual(1)
    }

    const productosPaginados = useMemo(() => {
        const primerIndice = (paginaActual - 1) * PRODUCTOS_POR_PAGINA
        const ultimoIndice = primerIndice + PRODUCTOS_POR_PAGINA
        return productos.slice(primerIndice, ultimoIndice)
    }, [productos, paginaActual])

    const handleCambioPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }

    const handleEliminar = async (producto) => {
        const result = await Swal.fire({
            title: `Eliminar "${producto.nombre}"`,
            html: `Para confirmar, por favor escribí: <b>${producto.nombre}</b>`,
            input: "text",
            inputPlaceholder: "Escribí el nombre acá",
            inputAttributes: {
                autocapitalize: "off",
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
                cancelButton: "swal2-cancel-button-custom-detalle",
            },
            preConfirm: (inputValue) => {
                if (inputValue !== producto.nombre) {
                    Swal.showValidationMessage("El nombre ingresado no coincide.")
                    return false
                }
                return inputValue
            },
            allowOutsideClick: () => !Swal.isLoading(),
        })

        if (result.isConfirmed) {
            try {
                const respuesta = await eliminarProducto(producto.id)
                if (respuesta?.simulated) {
                    toast.info(`(Dry-Run) ${respuesta.message}`)
                } else {
                    toast.success(`El producto "${producto.nombre}" ha sido eliminado.`)
                }
            } catch (error) {
                console.error("Error al eliminar producto desde AdminProductos:", error)
                toast.error(error.message || "No se pudo eliminar el producto.")
            }
        }
    }

    return (
        <>
            <title>Gestionar Productos - Crisol</title>
            <Container className="my-5">
                <h2 className="text-center mb-4 admin-title">Gestión de Productos</h2>

                <div className="filtros-admin-container mb-4">
                    <InputGroup>
                        <Form.Control placeholder="Buscar por nombre..." onChange={handleBusqueda} />
                    </InputGroup>
                    <Form.Select aria-label="Filtrar por categoría" onChange={handleFiltroCategoria}>
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat === "Todas" ? "Todas las Categorías" : cat}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <Table bordered hover responsive variant="dark" className="admin-productos-table shadow-sm">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosPaginados.length > 0 ? (
                            productosPaginados.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="text-center align-middle">
                                        <div
                                            className="thumbnail-admin-container"
                                            onClick={() => handleShowImage(producto.imagen)}
                                        >
                                            <Image
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                className="thumbnail-admin"
                                            />
                                            <BsArrowsFullscreen className="thumbnail-zoom-icon" />
                                        </div>
                                    </td>
                                    <td className="align-middle">{producto.nombre}</td>
                                    <td className="align-middle">{producto.categoria}</td>
                                    <td className="align-middle text-end">${producto.precio}</td>
                                    <td className="align-middle col-descripcion">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`tooltip-desc-${producto.id}`}>
                                                    {producto.descripcion}
                                                </Tooltip>
                                            }
                                        >
                                            <span>{producto.descripcion}</span>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="text-center align-middle">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link
                                                to={`/admin/editarProducto/${producto.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                                title="Editar"
                                            >
                                                <BsPencilSquare />
                                            </Link>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                title="Eliminar"
                                                onClick={() => handleEliminar(producto)}
                                            >
                                                <BsTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No se encontraron productos con los filtros aplicados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {productos.length > 0 && (
                    <Paginacion
                        itemsPerPage={PRODUCTOS_POR_PAGINA}
                        totalItems={productos.length}
                        paginate={handleCambioPagina}
                        currentPage={paginaActual}
                    />
                )}
            </Container>

            <Modal show={showImageModal} onHide={handleCloseImage} centered size="lg" className="image-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Vista Previa de Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={selectedImage} fluid />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AdminProductos
