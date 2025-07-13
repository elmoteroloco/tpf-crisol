import React, { createContext, useState, useContext, useEffect } from "react"
import { CarritoContext } from "./CarritoContext"

const AuthContext = createContext()
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    const { vaciarCarrito } = useContext(CarritoContext)

    useEffect(() => {
        const storedToken = sessionStorage.getItem("authToken")
        const storedUser = sessionStorage.getItem("authUser")
        if (storedToken && storedUser) {
            setUser(storedUser)
            if (storedUser === "31M073r010c0@gmail.com") {
                setAdmin(true)
            } else {
                setAdmin(false)
            }
        }
        setAuthLoading(false)
    }, [])

    const login = (username) => {
        const token = `fake-token-${username}`
        if (username === "31M073r010c0@gmail.com") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
        sessionStorage.setItem("authToken", token)
        sessionStorage.setItem("authUser", username)
        setUser(username)
    }
    const logout = () => {
        sessionStorage.removeItem("authToken")
        sessionStorage.removeItem("authUser")
        setUser(null)
        setAdmin(false)
        vaciarCarrito()
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, admin, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)
