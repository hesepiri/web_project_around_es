// Archivo de constantes y selectores

// Configuración para la validación de formularios
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Configuración de la API
export const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "0e843d05-0a28-4346-b14e-6bb1d8f2ecac",
    "Content-Type": "application/json",
  },
};

// Selectores de botones
export const profileEditBtn = document.querySelector("#profile-edit-btn");
export const cardAddBtn = document.querySelector("#card-add-btn");
