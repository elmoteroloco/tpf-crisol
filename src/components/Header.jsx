import React, { useState, useEffect } from "react"
import Carousel from "react-bootstrap/Carousel"
import "./Header.css"

const CAROUSEL_ITEMS = [
    {
        id: 1,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148660/crisol-01-mamboreta_ldxq2i.jpg"
    },
    {
        id: 2,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148660/crisol-02-ouroboros_fugrr5.jpg"
    },
    {
        id: 3,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148662/crisol-03-cthulhu_peu9fy.jpg"
    },
    {
        id: 4,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148661/crisol-05-chimango_d4m6rl.jpg"
    },
    {
        id: 5,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148662/crisol-06-violinista_ewmzmd.jpg"
    },
    {
        id: 6,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148663/crisol-07-smaug_wkmaur.jpg"
    },
    {
        id: 7,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148661/crisol-04-hamadrias_fdlmmc.jpg"
    },
    {
        id: 8,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148664/crisol-08-hamadrias_bibwjt.jpg"
    },
    {
        id: 9,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1749148665/crisol-09-hamadrias_ryw8oy.jpg"
    }
]
const NUM_CAROUSEL_ITEMS = CAROUSEL_ITEMS.length
const CAROUSEL_AUTO_PLAY_INTERVAL = 3333

function Header() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPausedByUser, setIsPausedByUser] = useState(false)

    const handleSelect = (selectedIndex, event) => {
        if (event) setIsPausedByUser(true)
        setActiveIndex(selectedIndex)
    }

    useEffect(() => {
        if (isPausedByUser || NUM_CAROUSEL_ITEMS <= 1) return
        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => {
                let newIndex = prevIndex
                let newDirection = direction
                if (newDirection === 1) {
                    newIndex = prevIndex === NUM_CAROUSEL_ITEMS - 1 ? prevIndex - 1 : prevIndex + 1
                    if (prevIndex === NUM_CAROUSEL_ITEMS - 1) newDirection = -1
                } else {
                    newIndex = prevIndex === 0 ? prevIndex + 1 : prevIndex - 1
                    if (prevIndex === 0) newDirection = 1
                }
                if (direction !== newDirection) setDirection(newDirection)
                return Math.max(0, Math.min(newIndex, NUM_CAROUSEL_ITEMS - 1))
            })
        }, CAROUSEL_AUTO_PLAY_INTERVAL)
        return () => clearTimeout(timer)
    }, [activeIndex, direction, isPausedByUser])

    return (
        <>
            <div className="header-banner">
                <h1 className="header-title">Crisol</h1>
            </div>
            <div className="carousel-wrapper">
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
                            {CAROUSEL_ITEMS.map((item) => (
                                <Carousel.Item key={item.id}>
                                    <img
                                        className="d-block carousel-image"
                                        src={item.imageUrl}
                                        alt={`Imagen de producto ${item.id}`}
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
