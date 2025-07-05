import React, { useState, useEffect, useRef } from "react"
import Carousel from "react-bootstrap/Carousel"
import "./Header.css"

const CAROUSEL_ITEMS = [
    {
        id: 1,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148660/crisol-01-mamboreta_ldxq2i.jpg",
        altText: "Broche artesanal de diseño 'Mamboretá'"
    },
    {
        id: 2,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148660/crisol-02-ouroboros_fugrr5.jpg",
        altText: "Anillo de plata patinada 'Ouroboros'"
    },
    {
        id: 3,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148662/crisol-03-cthulhu_peu9fy.jpg",
        altText: "Anillo de plata patinada 'Tentáculos'"
    },
    {
        id: 4,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148661/crisol-05-chimango_d4m6rl.jpg",
        altText: "Llavero articulado 'Chimango'"
    },
    {
        id: 5,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148662/crisol-06-violinista_ewmzmd.jpg",
        altText: "Llavero articulado 'Violinista'"
    },
    {
        id: 6,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148663/crisol-07-smaug_wkmaur.jpg",
        altText: "Llavero/pendiente 'Smaug'"
    },
    {
        id: 7,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148661/crisol-04-hamadrias_fdlmmc.jpg",
        altText: "Accesorio soporte para celular 'Hamadrias'"
    },
    {
        id: 8,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148664/crisol-08-hamadrias_bibwjt.jpg",
        altText: "Accesorio soporte para celular 'Hamadrias'"
    },
    {
        id: 9,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148665/crisol-09-hamadrias_ryw8oy.jpg",
        altText: "Accesorio soporte para celular 'Hamadrias'"
    }
]
const NUM_CAROUSEL_ITEMS = CAROUSEL_ITEMS.length
const CAROUSEL_AUTO_PLAY_INTERVAL = 3333

const getOptimizedImageUrl = (url) => {
    if (url.includes("res.cloudinary.com")) {
        return url.replace("/upload/", "/upload/w_1000,q_auto,f_auto,dpr_auto/")
    }
    return url
}

function Header() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const carouselWrapperRef = useRef(null)

    const handleSelect = (selectedIndex, event) => {
        if (event) setIsPaused(true)
        setActiveIndex(selectedIndex)
    }

    useEffect(() => {
        if (isPaused || NUM_CAROUSEL_ITEMS <= 1) return
        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % NUM_CAROUSEL_ITEMS)
        }, CAROUSEL_AUTO_PLAY_INTERVAL)
        return () => clearTimeout(timer)
    }, [activeIndex, isPaused])

    return (
        <>
            <div className="header-banner">
                <h1 className="header-title">Crisol</h1>
            </div>
            <div className="carousel-wrapper" ref={carouselWrapperRef}>
                <section className="carousel-section">
                    {NUM_CAROUSEL_ITEMS > 0 && (
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null}
                            controls={false}
                            indicators={false}
                            pause={false}
                            fade={true}
                            className="h-100">
                            {CAROUSEL_ITEMS.map((item, index) => (
                                <Carousel.Item key={item.id}>
                                    <img
                                        className="d-block carousel-image"
                                        src={getOptimizedImageUrl(item.imageUrl)}
                                        alt={item.altText}
                                        loading={index > 0 ? "lazy" : undefined}
                                        fetchPriority={index === 0 ? "high" : undefined}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </section>
            </div>
        </>
    )
}

export default Header
