import React, { createContext, useState, useContext, useEffect } from "react"
import {
    obtenerProductosFirebase,
    obtenerProductoPorIdFirebase,
    agregarProductoFirebase,
    actualizarProductoFirebase,
    eliminarProductoFirebase
} from "../firebase/firebase"

const ProductosContext = createContext()

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState(null)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
    const [terminoBusqueda, setTerminoBusqueda] = useState("")

    function obtenerProductos() {
        return new Promise((res, rej) => {
            obtenerProductosFirebase()
                .then((productosData) => {
                    setProductos(productosData)
                    setProductosOriginales(productosData)
                    res(productosData)
                })
                .catch((error) => {
                    console.error("Error en contexto al obtener productos:", error)
                    rej(error)
                })
        })
    }

    const agregarProducto = (producto) => {
        return new Promise((res, rej) => {
            agregarProductoFirebase(producto)
                .then((nuevoProducto) => {
                    setProductosOriginales((prev) => [...prev, nuevoProducto])
                    setProductos((prev) => [...prev, nuevoProducto])
                    res(nuevoProducto)
                })
                .catch((error) => {
                    console.error("Error en contexto al agregar producto:", error)
                    rej(error)
                })
        })
    }

    function obtenerProducto(id) {
        return new Promise((res, rej) => {
            const productoEnEstado = productos.find((p) => p.id === id)
            if (productoEnEstado) {
                setProductoEncontrado(productoEnEstado)
                return res(productoEnEstado)
            }

            obtenerProductoPorIdFirebase(id)
                .then((data) => {
                    setProductoEncontrado(data)
                    res(data)
                })
                .catch((error) => {
                    console.error("Error en contexto al obtener producto por ID:", error)
                    rej(error)
                })
        })
    }

    const actualizarProducto = (id, productoActualizado) => {
        return new Promise((res, rej) => {
            actualizarProductoFirebase(id, productoActualizado)
                .then((productoConId) => {
                    setProductosOriginales((prev) =>
                        prev.map((p) => (p.id === id ? productoConId : p))
                    )
                    setProductos((prev) => prev.map((p) => (p.id === id ? productoConId : p)))
                    if (productoEncontrado && productoEncontrado.id === id) {
                        setProductoEncontrado(productoConId)
                    }
                    res(productoConId)
                })
                .catch((error) => {
                    console.error("Error en contexto al actualizar producto:", error)
                    rej(error)
                })
        })
    }

    const eliminarProducto = (id) => {
        return new Promise((res, rej) => {
            eliminarProductoFirebase(id)
                .then((respuesta) => {
                    setProductosOriginales((prev) => prev.filter((p) => p.id !== id))
                    setProductos((prev) => prev.filter((p) => p.id !== id))
                    if (productoEncontrado && productoEncontrado.id === id) {
                        setProductoEncontrado(null)
                    }
                    res(respuesta)
                })
                .catch((error) => {
                    console.error("Error en contexto al eliminar producto:", error)
                    rej(error)
                })
        })
    }

    useEffect(() => {
        let productosFiltrados = [...productosOriginales]

        if (categoriaSeleccionada && categoriaSeleccionada !== "Todas") {
            productosFiltrados = productosFiltrados.filter(
                (p) => p.categoria === categoriaSeleccionada
            )
        }

        if (terminoBusqueda && terminoBusqueda.trim() !== "") {
            productosFiltrados = productosFiltrados.filter((p) =>
                p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
            )
        }

        setProductos(productosFiltrados)
    }, [productosOriginales, categoriaSeleccionada, terminoBusqueda])

    const filtrarPorCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria)
    }

    const buscarPorNombre = (termino) => setTerminoBusqueda(termino)

    return (
        <ProductosContext.Provider
            value={{
                obtenerProductos,
                productos,
                agregarProducto,
                obtenerProducto,
                productoEncontrado,
                actualizarProducto,
                eliminarProducto,
                filtrarPorCategoria,
                buscarPorNombre
            }}>
            {children}
        </ProductosContext.Provider>
    )
}
export const useProductosContext = () => useContext(ProductosContext)
