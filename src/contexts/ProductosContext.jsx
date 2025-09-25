import React, { createContext, useState, useContext, useEffect } from "react"
import { obtenerProductosFirebase, obtenerProductoPorIdFirebase, obtenerCategoriasFirebase } from "../firebase/firebase"
import { useAuthContext } from "./AuthContext"

const API_BASE_URL = "http://localhost:3000"

const ProductosContext = createContext()

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState(null)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
    const [terminoBusqueda, setTerminoBusqueda] = useState("")
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    function obtenerProductos() {
        return new Promise((res, rej) => {
            const promesas = [obtenerProductosFirebase(), obtenerCategoriasFirebase()]

            Promise.all(promesas)
                .then(([productosData, categoriasData]) => {
                    setProductos(productosData)
                    setProductosOriginales(productosData)
                    setCategorias(["Todas", ...categoriasData])
                    res({ productos: productosData, categorias: categoriasData })
                })
                .catch((error) => {
                    console.error("Error en contexto al obtener productos:", error)
                    rej(error)
                })
        })
    }

    useEffect(() => {
        setCargando(true)
        obtenerProductos()
            .catch((err) => {
                setError("No se pudieron cargar los datos iniciales.")
                console.error(err)
            })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    const agregarProducto = async (producto) => {
        if (!user) throw new Error("Usuario no autenticado.")
        const idToken = await user.getIdToken()

        const response = await fetch(`${API_BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(producto),
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || "Error al agregar producto en el backend.")
        }

        const nuevoProducto = await response.json()
        setProductosOriginales((prev) => [...prev, nuevoProducto])
        setProductos((prev) => [...prev, nuevoProducto])
        return nuevoProducto
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

    const actualizarProducto = async (id, productoActualizado) => {
        if (!user) throw new Error("Usuario no autenticado.")
        const idToken = await user.getIdToken()

        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(productoActualizado),
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || "Error al actualizar producto en el backend.")
        }

        const productoConId = await response.json()
        setProductosOriginales((prev) => prev.map((p) => (p.id === id ? productoConId : p)))
        setProductos((prev) => prev.map((p) => (p.id === id ? productoConId : p)))
        if (productoEncontrado && productoEncontrado.id === id) {
            setProductoEncontrado(productoConId)
        }
        return productoConId
    }

    const eliminarProducto = async (id) => {
        if (!user) throw new Error("Usuario no autenticado.")
        const idToken = await user.getIdToken()

        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || "Error al eliminar producto en el backend.")
        }

        const respuesta = await response.text()
        setProductosOriginales((prev) => prev.filter((p) => p.id !== id))
        setProductos((prev) => prev.filter((p) => p.id !== id))
        if (productoEncontrado && productoEncontrado.id === id) {
            setProductoEncontrado(null)
        }
        return respuesta
    }

    const agregarCategoria = async (nombreCategoria) => {
        if (!user) throw new Error("Usuario no autenticado.")
        const idToken = await user.getIdToken()

        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ nombre: nombreCategoria }),
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || "Error al agregar categoría en el backend.")
        }

        const categoriasData = await obtenerCategoriasFirebase()
        setCategorias(["Todas", ...categoriasData])
    }

    const eliminarCategoria = async (nombreCategoria) => {
        if (!user) throw new Error("Usuario no autenticado.")
        const idToken = await user.getIdToken()

        const response = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(nombreCategoria)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || "Error al eliminar categoría en el backend.")
        }

        const categoriasData = await obtenerCategoriasFirebase()
        setCategorias(["Todas", ...categoriasData])
    }

    useEffect(() => {
        let productosFiltrados = [...productosOriginales]

        if (categoriaSeleccionada && categoriaSeleccionada !== "Todas") {
            productosFiltrados = productosFiltrados.filter((p) => p.categoria === categoriaSeleccionada)
        }

        if (terminoBusqueda && terminoBusqueda.trim() !== "") {
            productosFiltrados = productosFiltrados.filter((p) =>
                p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()),
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
                cargando,
                error,
                categorias,
                agregarProducto,
                obtenerProducto,
                productoEncontrado,
                actualizarProducto,
                eliminarProducto,
                agregarCategoria,
                eliminarCategoria,
                filtrarPorCategoria,
                buscarPorNombre,
            }}
        >
            {children}
        </ProductosContext.Provider>
    )
}
export const useProductosContext = () => useContext(ProductosContext)
