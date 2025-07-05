import React from "react"
import { Link } from "react-router-dom"
import { NavDropdown } from "react-bootstrap"
import styled from "styled-components"
import { IoSettingsOutline } from "react-icons/io5"

const StyledTitle = styled.span`
    color: var(--color1);
`

function BotoneraAdmin({ handleCloseOffcanvas }) {
    return (
        <NavDropdown
            title={
                <StyledTitle>
                    <IoSettingsOutline className="me-1" />
                    Administrar artículos
                </StyledTitle>
            }
            id="admin-dropdown"
            menuVariant="dark">
            <NavDropdown.Item as={Link} to="/admin/productos" onClick={handleCloseOffcanvas}>
                Editar y Eliminar artículos
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/agregarProductos" onClick={handleCloseOffcanvas}>
                Agregar artículos
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/categorias" onClick={handleCloseOffcanvas}>
                Gestionar Categorías
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/admin" onClick={handleCloseOffcanvas}>
                Panel de administración
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default BotoneraAdmin
