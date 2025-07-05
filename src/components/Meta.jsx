import React from "react"
import { Helmet } from "react-helmet-async"

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "| TPF-React-Crisol",
    description:
        "Crisol: Regalería de alta gama y empresarial. Encontrá artículos de diseño artesanal, clips billeteros, bolsos, y accesorios de oficina exclusivos.",
    keywords:
        "regalos, diseño, artesanal, oficina, empresarial, clips billeteros, joyería, bolsos, bufandas"
}

export default Meta
