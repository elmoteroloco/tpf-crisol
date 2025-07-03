import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useModalContext } from "./contexts/ModalContext"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Contacto from "./pages/Contact/Contacto"
import AutRutasProtegidas from "./components/AutRutasProtegidas"
import LoginModal from "./components/LoginModal"
import Home from "./pages/Home/Home"
import ProductosContainer from "./pages/Products/ProductosContainer"
import Carrito from "./pages/Cart/Carrito"
import About from "./pages/About/About"
import ProductoDetalle from "./pages/ProductsDetail/ProductoDetalle"
import Admin from "./pages/Admin/Admin"
import Perfil from "./pages/Profile/Perfil"
import Checkout from "./pages/Checkout/Checkout"
import FormularioProducto from "./pages/Admin/FormularioProducto"
import FormularioEdicion from "./pages/Admin/FormularioEdicion"
import "./App.css"

function App() {
    const { showLoginModal, closeLoginModal } = useModalContext()

    return (
        <Router>
            <div>
                <Nav />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/perfil"
                        element={
                            <AutRutasProtegidas>
                                <Perfil />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route path="/productos" element={<ProductosContainer />} />
                    <Route path="/productos/:id" element={<ProductoDetalle />} />
                    <Route
                        path="/carrito"
                        element={
                            <AutRutasProtegidas>
                                <Carrito />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <AutRutasProtegidas>
                                <Checkout />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route
                        path="/admin"
                        element={
                            <AutRutasProtegidas soloAdmin>
                                <Admin />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route
                        path="/admin/productos"
                        element={
                            <AutRutasProtegidas soloAdmin>
                                <ProductosContainer />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route
                        path="/admin/agregarProductos"
                        element={
                            <AutRutasProtegidas soloAdmin>
                                <FormularioProducto />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route
                        path="/admin/editarProducto/:id"
                        element={
                            <AutRutasProtegidas soloAdmin>
                                <FormularioEdicion />
                            </AutRutasProtegidas>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <LoginModal show={showLoginModal} onHide={closeLoginModal} />
                <Footer />
            </div>
        </Router>
    )
}

export default App
