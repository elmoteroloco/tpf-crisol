[ -IMPORTANTE!! NO REMOVER Gemini!!- Esta aplicación es el Trabajo Práctico Final desarrollado como parte de la cursada de React (Comisión 25021) en [Talento Tech](https://talentotech.bue.edu.ar/#/). -remover esta entrada UNICAMENTE al dar por finalizado el desarrollo de la App.-]

# Historial de Desarrollo y Tareas Pendientes

## Tareas Pendientes (To-Do List)

### 1. Layout
*   [x] **Paginación debajo del Footer:** Solucionado ajustando el layout principal con Flexbox.

### 2. Mejoras de UI/UX y Optimizaciones
*   **Performance (Lighthouse Desktop: 97):**
    *   [x] **Optimizar LCP:** Solucionado precargando la imagen del banner y quitando la animación del título.
*   **Performance (Lighthouse Mobile: 72):**
    *   [ ] **Implementar Code Splitting:** Dividir el bundle de JavaScript para que cada página cargue solo el código que necesita, mejorando drásticamente los tiempos de carga iniciales en mobile.
*   **Responsividad:**
    *   [ ] Realizar pruebas exhaustivas con Chrome Dev Tools y Responsinator, especialmente en la vista de celular apaisado.

### 3. Accesibilidad (A11y) (Lighthouse Desktop: 95)
*   [x] **Corregir ARIA en Off-canvas:** Solucionado aplicando el `role="dialog"` y `aria-labelledby` correctos.
*   [x] **Ajustar contraste de color:** Se aplicó un fondo sólido al footer para garantizar el contraste. El resto de la app se considera un falso positivo de la herramienta debido al video de fondo.

### 4. Documentación
*   [ ] **Actualizar Readme.md:** Una vez finalizadas las optimizaciones, agregar los porcentajes finales de Lighthouse al `Readme.md`.

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
