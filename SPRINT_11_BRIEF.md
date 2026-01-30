# 🏛️ Resumen de Avance: Sprint 11 (Refactorización y POO)

**Proyecto:** Around the U.S. (Modularización)
**Autor:** Héctor Pinedo
**Estado:** ✅ Completado

---

## 🎯 Objetivo Principal

Refactorizar la base de código imperativa existente para implementar una arquitectura modular basada en **Clases (POO)** y módulos de ES6. Configurar un entorno de desarrollo profesional utilizando **Webpack**.

## 🛠️ Logros Técnicos

### 1. Implementación de Clases (POO)

Se atomizó la lógica de la aplicación en clases especializadas con responsabilidad única:

- **`Card.js`:** Encapsuló la lógica de creación de tarjetas, gestión de eventos internos (like, borrar) y generación del marcado HTML.
- **`FormValidator.js`:** Se creó una clase reutilizable para la validación de formularios, permitiendo habilitar la validación en múltiples formularios con una sola configuración.
- **`Section.js`:** Clase encargada de renderizar elementos en el DOM, desacoplando los datos de la visualización.
- **`Popup.js` (y derivados):**
  - `Popup`: Clase padre con lógica común (abrir, cerrar con `Esc`, cerrar al hacer click en overlay).
  - `PopupWithImage`: Hija especializada en mostrar imágenes a pantalla completa.
  - `PopupWithForm`: Hija especializada en manejar formularios y sus envíos.
- **`UserInfo.js`:** Clase dedicada a gestionar la visualización y actualización de los datos del perfil en el DOM.

### 2. Entorno de Desarrollo (Webpack)

Se migró el proyecto a un entorno de construcción moderno:

- **Empaquetado (Bundling):** Unificación de módulos JavaScript y hojas de estilo CSS en archivos minificados para producción.
- **Transpilación (Babel):** Configuración para asegurar compatibilidad con navegadores antiguos.
- **Gestión de Assets:** Configuración de loaders para procesar imágenes, fuentes y archivos HTML.

### 3. Modularización (ES6 Modules)

- Se eliminaron las variables globales.
- Se implementó el sistema de `import` y `export` para conectar los componentes de manera limpia y mantenible.

---

## 📂 Estructura de Archivos Resultante

El proyecto pasó de una estructura plana a una estructura organizada:

```text
src/
├── components/        # Clases de lógica
│   ├── Card.js
│   ├── FormValidator.js
│   ├── Popup.js
│   ├── PopupWithForm.js
│   ├── PopupWithImage.js
│   ├── Section.js
│   └── UserInfo.js
├── pages/
│   └── index.js       # Punto de entrada (Orquestador)
├── scripts/
│   └── utils.js       # Constantes y selectores
└── stylesheets/       # Archivos CSS importados
```
