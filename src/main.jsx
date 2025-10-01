import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { CarritoProvider } from "./contexts/CarritoContext.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { ProductosProvider } from "./contexts/ProductosContext.jsx"
import { ModalProvider } from "./contexts/ModalContext.jsx"
import "animate.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CarritoProvider>
            <AuthProvider>
                <ProductosProvider>
                    <ModalProvider>
                        <App />
                    </ModalProvider>
                </ProductosProvider>
            </AuthProvider>
        </CarritoProvider>
    </StrictMode>,
)
