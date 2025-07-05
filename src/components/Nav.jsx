import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Nav as NavBS, OverlayTrigger, Tooltip } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import BadgeCarrito from "./BadgeCarrito"
import { useAuthContext } from "../contexts/AuthContext"
import { useModalContext } from "../contexts/ModalContext"
import BotoneraAdmin from "./BotoneraAdmin"
import { TbShoppingCartOff, TbUserCircle } from "react-icons/tb"
import { BsCartCheck } from "react-icons/bs"
import { LuSquareArrowRight } from "react-icons/lu"
import "./Nav.css"

function Nav() {
    const { user, admin } = useAuthContext()
    const { openLoginModal, closeLoginModal } = useModalContext()

    const [showOffcanvas, setShowOffcanvas] = useState(false)
    const handleShow = () => setShowOffcanvas(true)
    const handleClose = () => setShowOffcanvas(false)

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Toggle
                    aria-label="Navegar desde lateral"
                    aria-controls="offcanvas-navbar"
                    onClick={handleShow}
                    className="d-lg-none"
                />
                <NavBS className="navbar-nav justify-content-evenly d-none d-lg-flex w-100">
                    {/* desktop */}
                    <NavBS.Link as={Link} to="/" onClick={closeLoginModal}>
                        Inicio
                    </NavBS.Link>

                    {user && !admin && (
                        <NavBS.Link as={Link} to="/productos">
                            Productos
                        </NavBS.Link>
                    )}

                    {user && admin && <BotoneraAdmin />}

                    {!user && (
                        <NavBS.Link as={Link} to="/productos" state={{ showLogin: true }}>
                            <TbShoppingCartOff className="me-1" /> Productos
                        </NavBS.Link>
                    )}

                    {user && !admin && (
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip id="cart-tooltip-desktop">Ir al carrito</Tooltip>}>
                            <NavBS.Link
                                as={Link}
                                to="/carrito"
                                className="nav-link-carrito"
                                aria-label="Ir al carrito">
                                <BsCartCheck className="mx-2" />
                                <LuSquareArrowRight className="mx-2" />
                                <BadgeCarrito />
                            </NavBS.Link>
                        </OverlayTrigger>
                    )}

                    <NavBS.Link as={Link} to="/nosotros" onClick={closeLoginModal}>
                        Nosotros
                    </NavBS.Link>
                    <NavBS.Link as={Link} to="/contacto" onClick={closeLoginModal}>
                        Contacto
                    </NavBS.Link>
                    {user ? (
                        <NavBS.Link as={Link} to="/perfil">
                            <TbUserCircle className="me-1" />
                            Perfil
                        </NavBS.Link>
                    ) : (
                        <NavBS.Link onClick={openLoginModal} className="nav-link-ingresar">
                            <TbUserCircle className="me-1" />
                            Ingresar
                        </NavBS.Link>
                    )}
                </NavBS>

                {/* mobile */}
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    aria-labelledby="offcanvas-navbar-label"
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-navbar-label">Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <NavBS className="justify-content-evenly d-lg-none">
                            <NavBS.Link
                                as={Link}
                                to="/"
                                onClick={() => {
                                    handleClose()
                                    closeLoginModal()
                                }}>
                                Inicio
                            </NavBS.Link>

                            {user && !admin && (
                                <NavBS.Link as={Link} to="/productos" onClick={handleClose}>
                                    Productos
                                </NavBS.Link>
                            )}

                            {user && admin && <BotoneraAdmin />}

                            {!user && (
                                <NavBS.Link
                                    as={Link}
                                    to="/productos"
                                    state={{ showLogin: true }}
                                    onClick={handleClose}>
                                    <TbShoppingCartOff className="me-1" /> Productos
                                </NavBS.Link>
                            )}

                            {user && !admin && (
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="cart-tooltip-mobile">Ir al carrito</Tooltip>
                                    }>
                                    <NavBS.Link
                                        as={Link}
                                        to="/carrito"
                                        className="nav-link-carrito"
                                        aria-label="Ir al carrito"
                                        onClick={handleClose}>
                                        <BsCartCheck className="mx-2" />
                                        <LuSquareArrowRight className="mx-2" />
                                        <BadgeCarrito />
                                    </NavBS.Link>
                                </OverlayTrigger>
                            )}

                            <NavBS.Link
                                as={Link}
                                to="/nosotros"
                                onClick={() => {
                                    handleClose()
                                    closeLoginModal()
                                }}>
                                Nosotros
                            </NavBS.Link>
                            <NavBS.Link
                                as={Link}
                                to="/contacto"
                                onClick={() => {
                                    handleClose()
                                    closeLoginModal()
                                }}>
                                Contacto
                            </NavBS.Link>
                            {user ? (
                                <NavBS.Link as={Link} to="/perfil" onClick={handleClose}>
                                    <TbUserCircle className="me-1" />
                                    Perfil
                                </NavBS.Link>
                            ) : (
                                <NavBS.Link
                                    onClick={() => {
                                        openLoginModal()
                                        handleClose()
                                    }}
                                    className="nav-link-ingresar">
                                    <TbUserCircle className="me-1" />
                                    Ingresar
                                </NavBS.Link>
                            )}
                        </NavBS>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Nav
