import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import LoadingBar from "./LoadingBar"

function AutRutasProtegidas({ children, soloAdmin = false }) {
    const { user, admin, authLoading } = useAuthContext()

    if (authLoading) {
        return <LoadingBar />
    }

    if (!user) {
        // Si no hay usuario, no hay acceso a ninguna ruta protegida.
        return <Navigate to="/" replace />
    }

    if (soloAdmin) {
        // Si la ruta es solo para admin, verificamos el rol.
        return admin ? children : <Navigate to="/" replace />
    }
    return children
}
export default AutRutasProtegidas
