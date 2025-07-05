import "./Card.css"
import { Link } from "react-router-dom"
import { Card as BootstrapCard, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { RiSearchEyeLine } from "react-icons/ri"

function Card({ producto, isInteractive }) {
    const getOptimizedImageUrl = (url) => {
        if (url.includes("res.cloudinary.com")) {
            return url.replace("/upload/", "/upload/w_400,q_auto/")
        }
        return url
    }

    const linkProps = !isInteractive
        ? {
              "aria-disabled": true,
              onClick: (e) => e.preventDefault(),
              tabIndex: -1
          }
        : {}
    return (
        <BootstrapCard
            className={`producto-card ${!isInteractive ? "producto-card-disabled" : ""}`}>
            <Link to={`/productos/${producto.id}`} {...linkProps}>
                <BootstrapCard.Img
                    variant="top"
                    src={getOptimizedImageUrl(producto.imagen)}
                    alt={producto.nombre}
                />
            </Link>
            <BootstrapCard.Body>
                <BootstrapCard.Title className="producto-nombre">
                    {producto.nombre}
                </BootstrapCard.Title>
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Tooltip id={`tooltip-ver-detalle-${producto.id}`}>Ver detalle</Tooltip>
                    }>
                    <Button
                        as={Link}
                        to={`/productos/${producto.id}`}
                        className="producto-ver-mas-btn"
                        disabled={!isInteractive}
                        aria-label={`Ver detalle de ${producto.nombre}`}
                        {...linkProps}>
                        <RiSearchEyeLine />
                    </Button>
                </OverlayTrigger>
            </BootstrapCard.Body>
        </BootstrapCard>
    )
}

export default Card
