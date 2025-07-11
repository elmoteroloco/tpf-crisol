import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import App from "./App.jsx"
import { CarritoProvider } from "./contexts/CarritoContext.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { ProductosProvider } from "./contexts/ProductosContext.jsx"
import { ModalProvider } from "./contexts/ModalContext.jsx"
import "animate.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <ModalProvider>
                <ProductosProvider>
                    <CarritoProvider>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </CarritoProvider>
                </ProductosProvider>
            </ModalProvider>
        </HelmetProvider>
    </StrictMode>
)
