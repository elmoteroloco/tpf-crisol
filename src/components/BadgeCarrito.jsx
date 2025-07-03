import React, { useContext } from "react"
import Badge from "react-bootstrap/Badge"
import styled from "styled-components"
import { CarritoContext } from "../contexts/CarritoContext"

const StyledBadge = styled(Badge)`
    background-color: var(--bg-color4);
    color: var(--color1);
`

function BadgeCarrito() {
    const { productosCarrito } = useContext(CarritoContext)

    const totalItems = productosCarrito.reduce((acc, producto) => {
        const cantidad =
            typeof producto.cantidad === "number"
                ? producto.cantidad
                : parseInt(producto.cantidad, 10)
        return acc + (isNaN(cantidad) ? 0 : cantidad)
    }, 0)

    if (totalItems === 0) {
        return null
    }

    return (
        <StyledBadge pill bg={null}>
            {totalItems}
        </StyledBadge>
    )
}

export default BadgeCarrito
