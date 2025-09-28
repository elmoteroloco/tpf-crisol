import React, { useState } from "react"
import { Link } from "react-router-dom"
import { NavDropdown, Modal } from "react-bootstrap"
import styled from "styled-components"
import { IoSettingsOutline } from "react-icons/io5"

const StyledTitle = styled.span`
    color: var(--color1);
`

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Proporción 16:9 */
    background-color: #000;
    border-radius: 0.5rem;
    overflow: hidden;
`

const LayeredVideo = styled.video`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: ${(props) => props.opacity || 1};
`

function BotoneraAdmin({ handleCloseOffcanvas }) {
    const [showEasterEgg, setShowEasterEgg] = useState(false)

    const handleShowEasterEgg = () => {
        if (handleCloseOffcanvas) handleCloseOffcanvas() // Cierra el menú mobile si está abierto
        setShowEasterEgg(true)
    }
    const handleCloseEasterEgg = () => setShowEasterEgg(false)

    const cloudName = "dy5u2krtv"
    const transformations = "q_auto,f_auto"
    const videoKnightUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/knightcodeezgifcomgiftomp4converter_fjycc8`
    const videoMatrixUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/Digital_rain_animation_small_letters_clear_wikiezgifcomgiftomp4converter_xk6wsw`

    return (
        <>
            <NavDropdown
                title={
                    <StyledTitle>
                        <IoSettingsOutline className="me-1" />
                        Administrar
                    </StyledTitle>
                }
                id="admin-dropdown"
                menuVariant="dark"
            >
                <NavDropdown.Item as={Link} to="/admin/productos" onClick={handleCloseOffcanvas}>
                    Gestionar Productos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/agregarProducto" onClick={handleCloseOffcanvas}>
                    Agregar Producto
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/categorias" onClick={handleCloseOffcanvas}>
                    Gestionar Categorías
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShowEasterEgg}>Panel de administración</NavDropdown.Item>
            </NavDropdown>

            <Modal
                show={showEasterEgg}
                onHide={handleCloseEasterEgg}
                centered
                size="lg"
                dialogClassName="easter-egg-modal"
            >
                <Modal.Body className="p-0">
                    <VideoContainer>
                        <LayeredVideo zIndex={1} autoPlay loop muted playsInline>
                            <source src={videoKnightUrl} type="video/mp4" />
                        </LayeredVideo>
                        <LayeredVideo zIndex={2} opacity={0.6} autoPlay loop muted playsInline>
                            <source src={videoMatrixUrl} type="video/mp4" />
                        </LayeredVideo>
                    </VideoContainer>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BotoneraAdmin
