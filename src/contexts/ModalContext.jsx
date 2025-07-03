import React, { createContext, useState, useContext, useCallback } from "react"

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const openLoginModal = useCallback(() => setShowLoginModal(true), [])
    const closeLoginModal = useCallback(() => setShowLoginModal(false), [])

    return (
        <ModalContext.Provider value={{ showLoginModal, openLoginModal, closeLoginModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)
