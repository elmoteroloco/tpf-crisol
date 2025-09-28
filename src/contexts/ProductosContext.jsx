import React, { createContext, useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { useAuthContext } from "./AuthContext"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ProductosContext = createContext()

export const useProductosContext = () => useContext(ProductosContext)

export const ProductosProvider = ({ children }) => {
    const { user } = useAuthContext()
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [productoEncontrado, setProductoEncontrado] = useState(null)

    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas")
    const [busquedaFiltro, setBusquedaFiltro] = useState("")

    const fetchDatos = async () => {
        setCargando(true)
        setError(null)
        try {
            const [resProductos, resCategorias] = await Promise.all([
                fetch(`${API_BASE_URL}/products`),
                fetch(`${API_BASE_URL}/categories`),
            ])

            if (!resProductos.ok || !resCategorias.ok) {
                throw new Error("Error al conectar con el servidor.")
            }

            const dataProductos = await resProductos.json()
            const dataCategorias = await resCategorias.json()

            setProductosOriginales(dataProductos)
            setCategorias(["Todas", ...dataCategorias])
        } catch (err) {
            console.error("Error al cargar datos iniciales:", err)
            setError("No se pudieron cargar los datos. Por favor, intentá de nuevo más tarde.")
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        fetchDatos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let productosFiltrados = [...productosOriginales]

        if (categoriaFiltro !== "Todas") {
            productosFiltrados = productosFiltrados.filter((p) => p.categoria === categoriaFiltro)
        }

        if (busquedaFiltro) {
            productosFiltrados = productosFiltrados.filter((p) =>
                p.nombre.toLowerCase().includes(busquedaFiltro.toLowerCase()),
            )
        }

        setProductos(productosFiltrados)
    }, [productosOriginales, categoriaFiltro, busquedaFiltro])

    const filtrarPorCategoria = (categoria) => {
        setCategoriaFiltro(categoria)
    }

    const buscarPorNombre = (termino) => {
        setBusquedaFiltro(termino)
    }

    const obtenerProducto = async (id) => {
        const producto = productosOriginales.find((p) => p.id === id)
        if (producto) {
            setProductoEncontrado(producto)
            return producto
        } else {
            // Si no está en la lista, intentar buscarlo en la API (puede ser un producto nuevo)
            try {
                const res = await fetch(`${API_BASE_URL}/products`)
                if (!res.ok) throw new Error("Producto no encontrado en el servidor.")
                const allProducts = await res.json()
                const foundProduct = allProducts.find((p) => p.id === id)
                if (foundProduct) {
                    setProductoEncontrado(foundProduct)
                    return foundProduct
                }
                throw new Error("Producto no encontrado")
            } catch (err) {
                console.error("Error al obtener producto individual:", err)
                setProductoEncontrado(null)
                throw err
            }
        }
    }

    const getAuthHeaders = () => {
        const token = user?.stsTokenManager?.accessToken
        if (!token) {
            toast.error("No estás autenticado.")
            throw new Error("Token de autenticación no encontrado.")
        }
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    const agregarProducto = async (nuevoProducto) => {
        try {
            const headers = getAuthHeaders()
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: "POST",
                headers,
                body: JSON.stringify(nuevoProducto),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Error al agregar el producto.")

            if (!data.simulated) {
                await fetchDatos() // Recargar todos los datos
            }
            return data
        } catch (error) {
            console.error("Error en agregarProducto:", error)
            throw error
        }
    }

    const actualizarProducto = async (id, productoActualizado) => {
        try {
            const headers = getAuthHeaders()
            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(productoActualizado),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Error al actualizar el producto.")

            if (!data.simulated) {
                await fetchDatos()
            }
            return data
        } catch (error) {
            console.error("Error en actualizarProducto:", error)
            throw error
        }
    }

    const eliminarProducto = async (id) => {
        try {
            const headers = getAuthHeaders()
            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "DELETE",
                headers,
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Error al eliminar el producto.")

            if (!data.simulated) {
                await fetchDatos()
            }
            return data
        } catch (error) {
            console.error("Error en eliminarProducto:", error)
            throw error
        }
    }

    const value = {
        productos,
        categorias,
        cargando,
        error,
        productoEncontrado,
        filtrarPorCategoria,
        buscarPorNombre,
        obtenerProducto,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        fetchDatos,
    }

    return <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>
}
