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

const LayeredVideo = styled.video`
    width: 100%;
    height: 100%;
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${(props) => props.zIndex};
    opacity: ${(props) => props.opacity || 1};
    object-fit: cover;
`

export default function Admin() {
    const { user } = useAuthContext()

    if (!user) {
        return <Navigate to="/" replace />
    }

    const cloudName = "dy5u2krtv"
    const transformations = "q_auto,f_auto"

    const videoKnightUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/knightcodeezgifcomgiftomp4converter_fjycc8`
    const videoMatrixUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/Digital_rain_animation_small_letters_clear_wikiezgifcomgiftomp4converter_xk6wsw`

    return (
        <AdminContainer>
            <LayeredVideo zIndex={1} autoPlay loop muted playsInline>
                <source src={videoKnightUrl} />
            </LayeredVideo>
            <LayeredVideo zIndex={2} opacity={0.6} autoPlay loop muted playsInline>
                <source src={videoMatrixUrl} />
            </LayeredVideo>
        </AdminContainer>
    )
}
