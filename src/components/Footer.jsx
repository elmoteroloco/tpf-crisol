import { Container, Row, Col } from "react-bootstrap"
import { IconContext } from "react-icons"
import { BsYoutube, BsReddit, BsGithub, BsWhatsapp } from "react-icons/bs"
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer-container">
            <Container fluid>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
                        <p className="mb-1">&copy; 2025 - Crisol E-commerce</p>
                        <p className="mb-0 footer-disclaimer">
                            Este sitio web es un proyecto personal desarrollado con fines educativos
                            y de demostración. No representa una entidad comercial real ni ofrece
                            productos/servicios para la venta.
                        </p>
                    </Col>
                    <IconContext.Provider
                        value={{
                            color: "var(--color1)",
                            size: "2em"
                        }}>
                        <Col md={6} className="text-md-end text-center">
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light me-3"
                                aria-label="Visitanos en Youtube">
                                <BsYoutube />
                            </a>
                            <a
                                href="https://reddit.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light me-3"
                                aria-label="Visitanos en Reddit">
                                <BsReddit />
                            </a>
                            <a
                                href="https://Github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light me-3"
                                aria-label="Visitanos en Github">
                                <BsGithub />
                            </a>
                            <a
                                href="https://whatsapp.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light"
                                aria-label="Contactanos por Whatsapp">
                                <BsWhatsapp />
                            </a>
                        </Col>
                    </IconContext.Provider>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer
