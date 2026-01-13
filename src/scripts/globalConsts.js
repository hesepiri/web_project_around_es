//Archivo de constantes y selectores

// Exportamos los datos iniciales
export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Exportamos la configuración para la validación de formularios
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Exportamos modales, formularios, inputs y otros selectores del DOM
export const profileModal = document.querySelector("#edit-popup");
export const cardModal = document.querySelector("#new-card-popup");
export const imageModal = document.querySelector("#image-popup");

export const profileForm = document.querySelector("#edit-profile-form");
export const cardForm = document.querySelector("#new-card-form");

export const profileNameInput = profileForm.querySelector(
  ".popup__input_type_name"
);
export const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

//export const cardsList = document.querySelector(".cards__list");
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const cardAddBtn = document.querySelector(".profile__add-button");
export const closeButtons = document.querySelectorAll(".popup__close");
