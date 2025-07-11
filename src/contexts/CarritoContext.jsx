import React, { createContext, useState } from "react"

export const CarritoContext = createContext()

export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([])

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find((p) => p.id === producto.id)
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad }
                    return productoActualizado
                } else {
                    return p
                }
            })
            setProductosCarrito(carritoActualizado)
        } else {
            const nuevoCarrito = [...productosCarrito, producto]
            setProductosCarrito(nuevoCarrito)
        }
    }

    const vaciarCarrito = () => {
        setProductosCarrito([])
    }

    const actualizarCantidad = (productoId, nuevaCantidad) => {
        setProductosCarrito((productosActuales) =>
            productosActuales.map((producto) => {
                if (producto.id === productoId) {
                    const cantidadFinal = Math.max(1, nuevaCantidad)
                    return { ...producto, cantidad: cantidadFinal }
                }
                return producto
            })
        )
    }

    function borrarProductoCarrito(id) {
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id)
        setProductosCarrito(nuevoCarrito)
    }

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito,
                agregarAlCarrito,
                vaciarCarrito,
                borrarProductoCarrito,
                actualizarCantidad
            }}>
            {children}
        </CarritoContext.Provider>
    )
}
