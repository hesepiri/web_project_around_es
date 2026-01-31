# Around The U.S. - Sprint 11: Autenticación y Autorización 🔐

## 📋 Descripción del Proyecto

Este proyecto es una refactorización y extensión de la aplicación "Around The U.S." desarrollada en React. El objetivo principal de este Sprint 11 fue implementar un sistema robusto de **autenticación de usuarios** para proteger el acceso a la aplicación.

Se añadieron funcionalidades de Registro (Sign Up) y Inicio de Sesión (Sign In), permitiendo que solo los usuarios autenticados accedan al contenido principal, gestionen sus tarjetas y perfil, manteniendo la seguridad mediante **JSON Web Tokens (JWT)**.

## 🚀 Funcionalidades Principales

### Autenticación y Seguridad

- **Registro de Usuarios:** Formulario para crear nuevas cuentas (`/signup`).
- **Inicio de Sesión:** Validación de credenciales para usuarios existentes (`/signin`).
- **Protección de Rutas:** Uso de `ProtectedRoute` (HOC) para impedir el acceso a la página principal (`/`) a usuarios no logueados.
- **Persistencia de Sesión:** Almacenamiento del token JWT en `localStorage` para mantener al usuario conectado incluso al recargar la página.
- **Cierre de Sesión:** Funcionalidad de _Log out_ que elimina el token y redirige al usuario a la pantalla de inicio de sesión.

### Interfaz de Usuario (UI)

- **InfoTooltip:** Un componente modal que informa al usuario sobre el éxito o fracaso de su registro (con íconos distintivos de ✅ o ❌).
- **Header Dinámico:**
  - En registro: Muestra enlace a "Iniciar sesión".
  - En login: Muestra enlace a "Regístrate".
  - En home: Muestra el correo del usuario y el botón "Cerrar sesión".

## 🛠️ Tecnologías y Herramientas

- **React.js:** Librería principal para la construcción de la interfaz.
- **React Router v5/v6:** Para la navegación y enrutamiento (SPA - Single Page Application).
- **JWT (JSON Web Token):** Estándar utilizado para la transmisión segura de información entre partes.
- **Context API:** (Opcional, si se usó) Para el manejo del estado global del usuario (`currentUser`).
- **CSS3 (BEM):** Estilizado modular y mantenible.

## ⚙️ Instalación y Ejecución

1.  **Clona el repositorio:**

    ```bash
    git clone <SSH obtenido de GitHub>
    ```

2.

## 🔑 Estructura de Autenticación

El flujo de autenticación se maneja a través de un servicio `auth.js` (o similar) que centraliza las peticiones a la API:

- `register(email, password)`: `POST /signup`
- `authorize(email, password)`: `POST /signin` -> Recibe Token
- `checkToken(token)`: `GET /users/me` -> Valida Token

## 🔗 Despliegue

Puedes ver el proyecto funcionando en GitHub Pages aquí:
👉 [Around The U.S. - Hesepiri](https://hesepiri.github.io/web_project_around_es/)

---
