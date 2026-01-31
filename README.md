# Around The U.S. - Sprint 12: Integración con API 🌐

## 📋 Descripción del Proyecto

Esta es la versión avanzada de la aplicación "Around The U.S.", una red social interactiva para compartir imágenes de lugares icónicos.

En este **Sprint 12**, el proyecto dio un salto técnico importante al transicionar de datos estáticos locales a una integración completa con una **API REST**. Se implementó programación asíncrona avanzada para gestionar la persistencia de datos, autenticación de usuarios y operaciones CRUD (Crear, Leer, Actualizar, Borrar) en tiempo real.

## 🚀 Funcionalidades Principales

### Integración con Servidor (API)

- **Carga Inicial:** El perfil del usuario y las tarjetas iniciales se descargan simultáneamente desde el servidor mediante `Promise.all`.
- **Persistencia:** Todos los cambios (ediciones, likes, nuevas tarjetas) se guardan permanentemente en la base de datos.

### Gestión de Usuarios

- **Edición de Perfil:** Actualización de nombre y descripción mediante peticiones `PATCH`.
- **Avatar:** Nueva funcionalidad para actualizar la foto de perfil con validación de URL.

### Gestión de Tarjetas

- **Agregar Lugares:** Creación de nuevas tarjetas enviando datos al servidor (`POST`).
- **Eliminar Tarjetas:**
  - Lógica de propiedad: El icono de basura solo aparece en las tarjetas creadas por el usuario.
  - **Confirmación de Seguridad:** Popup modal ("¿Estás seguro?") antes de eliminar permanentemente una tarjeta (`DELETE`).
- **Sistema de Likes:**
  - Estado del corazón sincronizado con el servidor (`PUT` / `DELETE`).
  - Visualización inmediata del estado activo/inactivo.

### Experiencia de Usuario (UX)

- **Feedback Visual:** Implementación de estados de carga en los botones (cambio de texto a _"Guardando..."_ o _"Creando..."_) para informar al usuario que la solicitud está en proceso.
- **Manejo de Errores:** Captura de errores de conexión mediante bloques `.catch()` en consola.

## 🛠️ Tecnologías y Herramientas

- **JavaScript (ES6+):**
  - **Fetch API:** Para realizar peticiones HTTP asíncronas.
  - **Promises:** Manejo de flujos asíncronos.
  - **POO (Programación Orientada a Objetos):** Arquitectura modular (`Api.js`, `Card.js`, `Section.js`, etc.).
- **HTML5 & CSS3:** Implementación semántica y metodología **BEM**.
- **Git & GitHub:** Control de versiones.

## ⚙️ Instalación y Ejecución Local

Este proyecto utiliza módulos nativos de JavaScript (ES6), por lo que no requiere procesos de construcción (build) ni instalación de dependencias externas.

1.  **Clona el repositorio:**

    ```bash
    git clone <SSH obtenido de GitHub>
    ```

2.  **Ejecuta el proyecto:**
    - Abre el archivo `index.html` directamente en tu navegador.
    - **Recomendado:** Usa la extensión "Live Server" de VS Code para una mejor experiencia.

## 🔗 Despliegue (Live Demo)

Puedes ver el proyecto funcionando en GitHub Pages aquí:
👉 [Around The U.S. - Hesepiri](https://hesepiri.github.io/web_project_around_es/)

---
