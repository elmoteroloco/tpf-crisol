import React from "react"
import { Pagination } from "react-bootstrap"
import "./Paginacion.css"

const Paginacion = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = []

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages <= 1) {
        return null
    }

    const createPageItem = (pageNumber) => (
        <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => paginate(pageNumber)}>
            {pageNumber}
        </Pagination.Item>
    )

    const pageItems = []
    const pageNeighbours = 1

    pageItems.push(createPageItem(1))

    if (currentPage > pageNeighbours + 2) {
        pageItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />)
    }

    const startPage = Math.max(2, currentPage - pageNeighbours)
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

    for (let i = startPage; i <= endPage; i++) {
        pageItems.push(createPageItem(i))
    }

    if (currentPage < totalPages - pageNeighbours - 1) {
        pageItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
    }

    if (totalPages > 1) {
        pageItems.push(createPageItem(totalPages))
    }

    return (
        <nav>
            <Pagination className="justify-content-center pagination-custom">
                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {pageItems}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </nav>
    )
}

export default Paginacion
