import "bootstrap/dist/css/bootstrap.min.css"
import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useModalContext } from "./contexts/ModalContext"
import Nav from "./components/Nav"
import BackgroundVideo from "./components/BackgroundVideo"
import LoadingBar from "./components/LoadingBar"
import Footer from "./components/Footer"
import AutRutasProtegidas from "./components/AutRutasProtegidas"
import LoginModal from "./components/LoginModal"
import "./App.css"

const Home = lazy(() => import("./pages/Home/Home"))
const ProductosContainer = lazy(() => import("./pages/Products/ProductosContainer"))
const Carrito = lazy(() => import("./pages/Cart/Carrito"))
const About = lazy(() => import("./pages/About/About"))
const Contacto = lazy(() => import("./pages/Contact/Contacto"))
const ProductoDetalle = lazy(() => import("./pages/ProductsDetail/ProductoDetalle"))
const Admin = lazy(() => import("./pages/Admin/Admin"))
const Perfil = lazy(() => import("./pages/Profile/Perfil"))
const Checkout = lazy(() => import("./pages/Checkout/Checkout"))
const FormularioProducto = lazy(() => import("./pages/Admin/FormularioProducto"))
const FormularioEdicion = lazy(() => import("./pages/Admin/FormularioEdicion"))
const GestionCategorias = lazy(() => import("./pages/Admin/GestionCategorias"))

function App() {
    const { showLoginModal, closeLoginModal } = useModalContext()

    return (
        <Router>
            <div className="app-container">
                <BackgroundVideo videoName="fireChackuezgifcomgiftomp4converter_ynccdi" />

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
                <main className="content-wrapper">
                    <Suspense fallback={<LoadingBar />}>
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
                            <Route
                                path="/admin/categorias"
                                element={
                                    <AutRutasProtegidas soloAdmin>
                                        <GestionCategorias />
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
                    </Suspense>
                </main>
                <LoginModal show={showLoginModal} onHide={closeLoginModal} />
                <Footer />
            </div>
        </Router>
    )
}

export default App
