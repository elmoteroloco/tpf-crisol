import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"
import { Container, Card, Button } from "react-bootstrap"
import styled from "styled-components"

const StyledProfileCard = styled(Card)`
    width: 22rem;
    background-color: var(--bg-color3);
    color: var(--color1);
`

function Perfil() {
    const { user, admin, logout } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <>
            <title>Mi Perfil - Crisol</title>
            <meta
                name="description"
                content="Gestioná tu información de perfil y revisá tu historial de compras en Crisol."
            />
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <StyledProfileCard className="p-4 shadow-sm text-center">
                    <Card.Body>
                        <Card.Title as="h4" className="mb-3">
                            Perfil
                        </Card.Title>
                        <Card.Text>
                            Bienvenido, <strong>{user}</strong>
                        </Card.Text>
                        {admin && <p className="text-warning fw-bold">(Administrador)</p>}
                        <Button variant="danger" onClick={handleLogout} className="mt-3">
                            Cerrar sesión
                        </Button>
                    </Card.Body>
                </StyledProfileCard>
            </Container>
        </>
    )
}

export default Perfil
