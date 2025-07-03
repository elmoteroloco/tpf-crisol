[ -IMPORTANTE!! NO REMOVER Gemini!!- Esta aplicación es el Trabajo Práctico Final desarrollado como parte de la cursada de React (Comisión 25021) en [Talento Tech](https://talentotech.bue.edu.ar/#/). -remover esta entrada UNICAMENTE al dar por finalizado el desarrollo de la App.-]

# Historial de Desarrollo y Tareas Pendientes

## Tareas Pendientes (To-Do List)

### 1. Funcionalidades Clave

*   **Búsqueda y Filtrado de Productos:**
    *   **Filtrado por Categorías (Completado):**
        1.  **Actualizar `ProductosContext.jsx`:**
            *   [x] Añadir un nuevo estado `productosOriginales` para mantener una copia de todos los productos sin filtrar.
            *   [x] Modificar `obtenerProductos` para que al recibir los datos de Firebase, los guarde tanto en `productos` como en `productosOriginales`.
            *   [x] Crear una nueva función `filtrarPorCategoria(categoria)` que actualice el estado `productos` filtrando desde `productosOriginales`.
            *   [x] Modificar las funciones `agregarProducto`, `actualizarProducto` y `eliminarProducto` para que operen sobre ambos estados (`productos` y `productosOriginales`) y así mantener la consistencia de los datos.

        2.  **Actualizar Formularios de Admin:**
            *   [x] En `FormularioProducto.jsx` (Agregar):
                *   [x] Añadir un campo `<Form.Select>` con las categorías hardcodeadas: "Barbería, Billeteros, Bolsos, Bufandas, Joyería, Oficina, Varios".
                *   [x] Incluir el campo `categoria` en el estado inicial del producto.
                *   [x] Agregar la validación correspondiente para el campo `categoria`.
            *   [x] En `FormularioEdicion.jsx` (Editar):
                *   [x] Añadir el mismo `<Form.Select>` de categorías.
                *   [x] Asegurarse de que el formulario cargue y muestre la categoría actual del producto que se está editando.
                *   [x] Incluir la validación para el campo `categoria`.
        3.  **Implementar Filtro en la UI (`ProductosContainer.jsx`):**
            *   [x] Añadir un desplegable (`<Form.Select>`) encima del listado de productos con las categorías y una opción "Todas".
            *   [x] Crear un manejador de eventos que, al cambiar la selección, llame a la función `filtrarPorCategoria` del contexto.
    *   **Búsqueda por Nombre (Completado):**
        *   [x] Desarrollar una barra de búsqueda por nombre que filtre los productos a medida que el usuario escribe.

*   **Paginación en Catálogo (Completado):**
    *   [x] Agregar una barra de paginación en la base de la página del catálogo con botones de "anterior" y "siguiente".

### 2. Mejoras de UI/UX y Optimizaciones

*   **Solución de `z-index` (Footer vs Formularios):**
    *   [x] En `FormularioProducto.css` y `FormularioEdicion.css`, asignar `position: relative` y un `z-index` elevado a las clases de las tarjetas (`.form-add-card`, `.form-edit-card`).
*   **Ajustes de Estilo:**
    *   [x] En `ProductosContainer`, ajustar estilos (posición, color, fondo) de la barra de búsqueda y el desplegable de categorías.
    *   [x] En `LoginModal`, modificar el color de fondo de los campos de texto.
    *   [x] En `SweetAlert.js`, ajustar el ancho de las notificaciones para que sean más compactas.
*   **Notificaciones Diferenciadas:**
    *   [x] Implementar `React Toastify` para notificaciones de administrador (CRUD de productos).
    *   [x] Reservar `SweetAlert2` para interacciones del usuario (agregar al carrito, login, etc.).
*   **Optimización de Imágenes:**
    *   [ ] Investigar e implementar `srcset` para servir imágenes de diferentes resoluciones según el dispositivo.
    *   [ ] Comprimir imágenes existentes para reducir su peso.
*   **Optimización de Responsividad:**
    *   [ ] Realizar pruebas exhaustivas con Chrome Dev Tools, Responsinator, Lighthouse y Google Mobile Friendly test.
*   **Accesibilidad (A11y):**
    *   [ ] Realizar una auditoría de accesibilidad.
    *   [ ] Verificar la navegación completa por teclado.
    *   [ ] Asegurar un contraste de colores adecuado en toda la aplicación.

### 3. Calidad de Código y SEO

*   **Metadatos de Página Dinámicos:**
    *   [x] Implementar `react-helmet-async` para gestionar los títulos (`<title>`) y meta descripciones de cada página de forma dinámica, mejorando el SEO.

### 4. Documentación y Despliegue

*   **Actualizar Documentación:**
    *   [x] Añadir un reconocimiento a la herramienta `LS.exe` en el `README.md`.
*   **Preparación para Despliegue:**
    *   [x] Configurar el proyecto para subirlo a un repositorio de GitHub.
    *   [ ] Desplegar la aplicación en Vercel, configurando las variables de entorno (`.env`) para la encriptación de credenciales.

---

## Log de Cambios Implementados

*   **Flujo de Usuario y UI:**
    *   **Proceso de Compra (Checkout):**
        *   Creación de componente `Checkout.jsx` con formulario para datos de envío.
        *   Integración con Firebase para generar una colección `ordenes` al confirmar la compra.
        *   Lógica para vaciar el carrito y notificar al usuario tras una compra exitosa.
    *   Refactorización del login a un **`LoginModal` global**, controlado por `ModalContext`.
    *   Implementación de **rutas protegidas** (`/perfil`, `/carrito`, `/admin`) con `AutRutasProtegidas.jsx`.
    *   Creación de un **formulario de contacto** funcional con Formspree.
    *   Solución de error de `z-index` entre `Header` y `LoginModal`.
    *   Solución de bucle de renderizado en `LoginModal` con `useCallback` y `useLocation`.
    *   Solución de error de `z-index` entre `LoginModal` y `SweetAlert2`.

*   **Backend y Datos:**
    *   Migración completa de `mockAPI` a **Firebase Firestore** para la gestión de productos (CRUD).
    *   Implementación de **Autenticación de Firebase** (Email/Pass y Google).
    *   Centralización de la lógica de Firebase en `src/firebase/firebase.js`.
    *   Uso de variables de entorno (`.env.local`) para proteger las credenciales de Firebase.

*   **Refactorización de Código y Estilos (Completado):**
    *   **Estilos en Línea:** Se eliminaron todos los estilos en línea de la aplicación, moviéndolos a archivos `.css` dedicados o usando `styled-components`.
    *   **Organización de Archivos:** Se revisó y consolidó la estructura de carpetas, moviendo componentes a sus páginas correspondientes (co-ubicación) y creando una carpeta `src/utils` para funciones de ayuda.

*   **Pruebas y Mantenimiento:**
    *   Validación completa del flujo de administrador (CRUD) y de autenticación de usuarios.
