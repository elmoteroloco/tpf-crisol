import React from "react"
import { InputGroup, Button, Form } from "react-bootstrap"
import "./SelectorCantidad.css"

function SelectorCantidad({ cantidad, onSumar, onRestar, disabledRestar = false }) {
    return (
        <InputGroup className="selector-cantidad-group">
            <Button
                className="selector-cantidad-btn btn-restar"
                onClick={onRestar}
                disabled={disabledRestar}>
                -
            </Button>
            <Form.Control
                aria-label="Cantidad"
                value={cantidad}
                readOnly
                className="text-center selector-cantidad-input"
            />
            <Button className="selector-cantidad-btn btn-sumar" onClick={onSumar}>
                +
            </Button>
        </InputGroup>
    )
}

export default SelectorCantidad
