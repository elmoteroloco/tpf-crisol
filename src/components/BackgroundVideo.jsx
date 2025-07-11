import React from "react"
import "./BackgroundVideo.css"

const BackgroundVideo = ({ videoName }) => {
    const cloudName = "dy5u2krtv"
    const transformations = "q_80,f_auto"

    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${videoName}`

    return (
        <div className="video-background">
            <video autoPlay loop muted playsInline>
                <source src={videoUrl} />
            </video>
        </div>
    )
}

export default BackgroundVideo
