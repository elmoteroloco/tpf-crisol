# Proyecto E-commerce - Ejercicio Práctico React

Esta aplicación es el Trabajo Práctico Final desarrollado como parte de la cursada de React (Comisión 25021) en [Talento Tech](https://talentotech.bue.edu.ar/#/).

**Importante:** Este proyecto tiene una finalidad puramente académica y de demostración. No representa una entidad comercial real ni ofrece productos o servicios para la venta.

## Tecnologías Utilizadas

*   **React + Vite:** Como base para la creación de la interfaz de usuario, aprovechando su entorno de desarrollo rápido y optimizado.
*   **Firebase:** Utilizado como Backend-as-a-Service (BaaS) para funcionalidades clave:
    *   **Firestore Database:** Base de datos NoSQL en tiempo real para la gestión completa de Artículos (CRUD) y la administración de Categorías.
    *   **Authentication:** Sistema de registro e inicio de sesión de usuarios, con soporte para Email/Contraseña y proveedores como Google.
*   **React-Bootstrap:** Para la implementación de componentes de UI estilizados y responsivos, basados en el popular framework Bootstrap.
*   **React Router DOM:** Para la gestión de rutas y navegación en esta Single Page Application (SPA).
*   **React Context API:** Para la gestión de estados globales como la información de productos, el carrito de compras y el estado de autenticación del usuario.
*   **Cloudinary:** Empleado como servidor/API para el alojamiento y la entrega optimizada de imágenes de productos.
*   **SweetAlert2:** Integrado para mostrar alertas personalizadas y amigables, mejorando la experiencia de usuario.
*   **React-Toastify:** Para notificaciones no intrusivas en el panel de administrador.
*   **React-Helmet-Async:** Para la gestión dinámica de metadatos de página (títulos, descripciones), mejorando el SEO.
*   **React Icons:** Para la inclusión de una amplia variedad de iconos SVG en la aplicación.
*   **Herramientas Adicionales:** Mención especial a `LS.exe` (2003), una utilidad freeware invaluable para la generación de listas de archivos durante el desarrollo.

## Características Principales

*   **Catálogo de Productos:** Visualización de productos cargados desde Firestore.
*   **Búsqueda y Filtrado:** Funcionalidad de búsqueda por nombre y filtrado por categorías en el catálogo, con paginación dinámica.
*   **Autenticación de Usuarios:** Flujo completo de registro, inicio y cierre de sesión.
*   **Panel de Administración:** Ruta protegida (`/admin`) que permite a los usuarios con rol de administrador realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
*   **Rutas Protegidas:** Uso de un sistema de enrutamiento que restringe el acceso a páginas como `/perfil`, `/carrito` y `/admin` según el estado de autenticación y el rol del usuario.
*   **Carrito de Compras:** Funcionalidad para agregar, visualizar y eliminar productos del carrito.
*   **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla gracias a React-Bootstrap.

---   ---

# E-commerce Project - React Practice Exercise

This application is a practical exercise developed as part of the React course (Commission 25021) at [Talento Tech](https://talentotech.bue.edu.ar/#/).

**Important:** This project is for academic and demonstration purposes only. It doesn't represent a real commercial entity or offer products or services for sale.

---

## Technologies Used

*   **React + Vite:** As the foundation for building the user interface, leveraging its fast and optimized development environment.
*   **Firebase:** Used as a Backend-as-a-Service (BaaS) for key functionalities:
    *   **Firestore Database:** A real-time NoSQL database for complete product management (CRUD).
    *   **Authentication:** User registration and login system, with support for Email/Password and providers like Google.
*   **React-Bootstrap:** For implementing styled and responsive UI components, based on the popular Bootstrap framework.
*   **React Router DOM:** For managing routes and navigation in this Single Page Application (SPA).
*   **React Context API:** For managing global states such as product information, the shopping cart, and user authentication status.
*   **Cloudinary:** Employed as a server/API for hosting and delivering optimized product images.
*   **SweetAlert2:** Integrated to display customized and user-friendly alert boxes, enhancing the user experience.
*   **React-Toastify:** For non-intrusive notifications in the admin panel.
*   **React-Helmet-Async:** For dynamic management of page metadata (titles, descriptions), improving SEO.
*   **React Icons:** For including a wide variety of SVG icons in the application.
*   **Additional Tools:** Special mention to `LS.exe` (2003), an invaluable freeware utility for generating file lists during development.


## Main Features

*   **Product Catalog:** Displays products loaded from Firestore.
*   **Search and Filtering:** Name search and category filtering functionality in the catalog, with dynamic pagination.
*   **User Authentication:** Complete flow for registration, login, and logout.
*   **Admin Panel:** A protected route (`/admin`) that allows users with an administrator role to perform CRUD (Create, Read, Update, Delete) operations on products.
*   **Protected Routes:** A routing system that restricts access to pages like `/profile`, `/cart`, and `/admin` based on authentication status and user role.
*   **Shopping Cart:** Functionality to add, view, and remove products from the cart.
*   **Responsive Design:** An interface adaptable to different screen sizes thanks to React-Bootstrap.

---

## Información Original del Template (React + Vite)

Lo siguiente es la información provista por el template de Vite al iniciar el proyecto:

---

## Original Template Information (React + Vite)

The following is the information provided by the Vite template when initiating the project:

---


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
