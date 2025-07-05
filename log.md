[ -IMPORTANTE!! NO REMOVER Gemini!!- Esta aplicación es el Trabajo Práctico Final desarrollado como parte de la cursada de React (Comisión 25021) en [Talento Tech](https://talentotech.bue.edu.ar/#/). -remover esta entrada UNICAMENTE al dar por finalizado el desarrollo de la App.-]

# Historial de Desarrollo y Tareas Pendientes

## Tareas Pendientes (To-Do List)

### 1. Bugs Críticos a Resolver

*   **Layout:**
    *   [ ] **Paginación debajo del Footer:** El componente de paginación en `/productos` queda tapado por el footer, impidiendo su uso. Revisar `App.css` y la estructura del layout principal.

### 2. Mejoras de UI/UX y Optimizaciones

*   **Performance (Lighthouse Mobile: 71):**
    *   [ ] Investigar la caída de performance en la vista mobile. Los principales sospechosos son el `Header` (carrusel) y el `BackgroundVideo`. Revisar optimización de imágenes y carga de scripts.
*   **Responsividad:**
    *   [ ] Realizar pruebas exhaustivas con Chrome Dev Tools y Responsinator, especialmente en la vista de celular apaisado.

### 3. Accesibilidad (A11y) (Lighthouse Desktop: 88)

*   [ ] **Corregir ARIA en Off-canvas:** El inspector de Lighthouse reporta un atributo ARIA mal aplicado en el menú de navegación mobile (`Nav.jsx`).
*   [ ] **Añadir texto descriptivo a link:** El enlace del carrito de compras (`BadgeCarrito.jsx` o `Nav.jsx`) no tiene texto, solo íconos. Agregar un `aria-label` o un `span` con la clase `visually-hidden`.
*   [ ] Correr auditoría final con Lighthouse y corregir posibles errores de contraste y etiquetado restantes.
*   [ ] **Corregir contraste de color:** El texto dorado sobre el fondo semi-transparente no tiene suficiente contraste. Elementos afectados: `p.mb-1`, `p.mb-0.footer-disclaimer`, `footer.footer-container` y `body`.
*   [ ] **Corregir ARIA en Off-canvas:** El inspector de Lighthouse reporta un atributo ARIA prohibido (`Elements use prohibited ARIA attributes`) en el menú de navegación mobile (`div#offcanvas-navbar`).
### 4. Documentación
*   [ ] **Actualizar Readme.md:** Una vez corregidos los puntos de Lighthouse, agregar los porcentajes finales al `Readme.md` para mostrar los resultados.

---

## Log de Cambios Implementados

*   **Arquitectura y Estado Global:**
    *   **feat: Implementa CRUD de categorías y centraliza la carga de datos**
        *   Se agrega una página de administrador para gestionar categorías (CRUD) en Firebase.
        *   Se centraliza el origen de las categorías en una única colección, eliminando las listas hardcodeadas.
        *   Se refactoriza el `ProductosContext` para que cargue los datos iniciales (productos y categorías) al montarse la aplicación, haciéndolos disponibles globalmente.
        *   Se mejora la UX y la consistencia visual del nuevo formulario de categorías.

*   **Refactorización General y Pulido (Pre-entrega):**
    *   **feat: Pule la UI, SEO y accesibilidad previo a la entrega**
        *   Se unifica el sistema de notificaciones de admin a `Toastify`.
        *   Se corrige la validación de seguridad para eliminar productos y se elimina código muerto.
        *   Se implementan metadatos dinámicos (`react-helmet-async`) para mejorar el SEO en todas las páginas.
        *   Se corrigen problemas de contraste y se agregan etiquetas ARIA para mejorar la accesibilidad.
        *   Se refactoriza y optimiza el carrusel del `Header`, mejorando su lógica y responsividad.
        *   Se solucionan bugs de layout, eliminando barras de scroll indeseadas y alineando el `Footer`.

*   **Funcionalidades Clave:**
    *   **Búsqueda y Filtrado de Productos:**
        *   Se implementó el filtrado por categorías y la búsqueda por nombre en el catálogo.
    *   **Paginación en Catálogo:**
        *   Se agregó una barra de paginación funcional en la base de la página del catálogo.

*   **Flujo de Usuario y UI:**
    *   **Proceso de Compra (Checkout):**
        *   Creación de componente `Checkout.jsx` con formulario para datos de envío.
        *   Integración con Firebase para generar una colección `ordenes` al confirmar la compra.
        *   Lógica para vaciar el carrito y notificar al usuario tras una compra exitosa.
    *   Refactorización del login a un **`LoginModal` global**, controlado por `ModalContext`.
    *   Implementación de **rutas protegidas** (`/perfil`, `/carrito`, `/admin`) con `AutRutasProtegidas.jsx`.
    *   Creación de un **formulario de contacto** funcional con Formspree.
    *   Solución de errores de `z-index` entre `Header`, `LoginModal` y `SweetAlert2`.
    *   Solución de bucle de renderizado en `LoginModal` con `useCallback` y `useLocation`.

*   **Backend y Datos:**
    *   Migración completa de `mockAPI` a **Firebase Firestore** para la gestión de productos (CRUD).
    *   Implementación de **Autenticación de Firebase** (Email/Pass y Google).
    *   Centralización de la lógica de Firebase en `src/firebase/firebase.js`.
    *   Uso de variables de entorno (`.env.local`) para proteger las credenciales de Firebase.

*   **Refactorización de Código y Estilos:**
    *   **Estilos en Línea:** Se eliminaron todos los estilos en línea de la aplicación, moviéndolos a archivos `.css` dedicados.
    *   **Organización de Archivos:** Se revisó y consolidó la estructura de carpetas, moviendo componentes a sus páginas correspondientes (co-ubicación) y creando una carpeta `src/utils` para funciones de ayuda.

*   **Documentación y Despliegue:**
    *   Se actualizó el `README.md` con las tecnologías utilizadas y un reconocimiento a `LS.exe`.
    *   Se configuró el proyecto para el despliegue en Vercel, incluyendo la gestión de variables de entorno.

<!-- Ayudamemoria para Gemini:
- Bug Paginación: El componente Paginacion.jsx queda debajo del Footer.jsx. Probablemente un problema de z-index o de flexbox en App.css. El .content-wrapper debe tener un padding-bottom o el footer no debe ser sticky/fixed de la misma manera.
- Perf Mobile (71): Investigar LCP. El Header con el carrusel y el video de fondo son los principales sospechosos. Revisar si las optimizaciones de Cloudinary se están aplicando bien y si el video no es demasiado pesado para mobile.
- Access Desktop (88):
    - Off-canvas ARIA: Revisar Nav.jsx y el Navbar.Toggle. Probablemente falte un `aria-controls` o el `aria-label` no es correcto.
    - Link sin texto: Es el ícono del carrito en Nav.jsx. Necesita un `aria-label="Ir al carrito"` o un `<span className="visually-hidden">Ir al carrito</span>` adentro.
-->
