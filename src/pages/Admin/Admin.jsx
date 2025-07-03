import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext.jsx"
import styled from "styled-components"

const AdminContainer = styled.div`
    position: relative;
    width: 50vw;
    max-width: 700px;
    margin: 4rem auto;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LayeredImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: ${(props) => props.objectFit || "cover"};
    z-index: ${(props) => props.zIndex};
    opacity: ${(props) => props.opacity || 1};
`

export default function Admin() {
    const { user } = useAuthContext()

    if (!user) {
        return <Navigate to="/" replace />
    }
    return (
        <AdminContainer>
            <LayeredImage
                src="https://res.cloudinary.com/dy5u2krtv/image/upload/v1749147265/knight-code_vbs055.gif"
                alt="Knight code"
                zIndex={1}
            />
            <LayeredImage
                src="https://res.cloudinary.com/dy5u2krtv/image/upload/v1749214060/Digital_rain_animation_small_letters_clear_wiki_f7qrn7.gif"
                alt="Matrix code"
                objectFit="contain"
                zIndex={2}
                opacity={0.6}
            />
        </AdminContainer>
    )
}
