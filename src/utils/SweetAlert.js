import Swal from "sweetalert2"

export const dispararSweetBasico = (
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton = false,
    cancelButtonText = "Cancelar"
) => {
    let confirmButtonClass = "swal2-confirm-button-custom"

    if (icon === "success") {
        confirmButtonClass = "swal2-confirm-button-success"
    } else if (icon === "error") {
        confirmButtonClass = "swal2-confirm-button-error"
    } else if (icon === "warning") {
        confirmButtonClass = "swal2-confirm-button-warning"
    }

    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton,
        cancelButtonText: cancelButtonText,
        timer: 1200,
        timerProgressBar: true,
        customClass: {
            popup: "swal2-popup-dark swal2-popup-custom-size",
            title: "swal2-title-dark",
            htmlContainer: "swal2-html-container-dark",
            confirmButton: confirmButtonClass,
            cancelButton: "swal2-cancel-button-custom"
        },

        showClass: {
            popup: "animate__animated animate__fadeIn animate__faster"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut animate__faster"
        }
    })
}
