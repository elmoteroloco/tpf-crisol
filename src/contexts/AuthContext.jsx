import React, { createContext, useState, useContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { CarritoContext } from "./CarritoContext"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const { vaciarCarrito } = useContext(CarritoContext)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const idTokenResult = await firebaseUser.getIdTokenResult()
                setUser(firebaseUser)
                setAdmin(idTokenResult.claims.admin === true)
            } else {
                setUser(null)
                setAdmin(false)
            }
            setAuthLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = async () => {
        try {
            await auth.signOut()
            setUser(null)
            setAdmin(false)
            vaciarCarrito()
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return <AuthContext.Provider value={{ user, admin, authLoading, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
