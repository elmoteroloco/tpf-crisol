import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

function AdminBackgroundManager() {
    const { admin } = useAuthContext()
    const location = useLocation()

    useEffect(() => {
        const isAdminSection = admin && location.pathname.startsWith("/admin")

        if (isAdminSection) {
            document.body.classList.add("admin-background-active")
        } else {
            document.body.classList.remove("admin-background-active")
        }

        return () => {
            document.body.classList.remove("admin-background-active")
        }
    }, [location, admin])

    return null
}

export default AdminBackgroundManager
