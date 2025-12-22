/* Refactorized code*/
import { Card } from "./Card.js";
//import { FormValidator } from "./FormValidator.js";
import * as utils from "./utils.js";
/******/

// Initial cards data
let initialCards = [
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

// Selectores globales
const cardsList = document.querySelector(".cards__list");

// Render Initial Cards
initialCards.forEach((card) => Card.renderCard(card, cardsList));

// Event listener para cerrar dando click con el mouse afuera del modal [Overlay] - aplicado globalmente a todos los popups (utils)
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      utils.closeModal(popup);
    }
  });
});

// Profile Edit Modal Elements & Handlers
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = profileModal.querySelector(".popup__form");
const profileCloseBtn = profileModal.querySelector(".popup__close");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
const profileInputs = Array.from(profileForm.querySelectorAll(".popup__input"));
const profileSubmitButton = profileForm.querySelector(".popup__button");

const fillProfileForm = () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

//FV
const handleOpenEditModal = () => {
  // Simplificado: llamamos directamente a la función de validación para resetear errores/estado del botón
  fillProfileForm();
  toggleButtonState(profileSubmitButton, profileInputs); // Habilita el botón si los valores cargados son válidos
  profileInputs.forEach((input) => hidePopupInputError(profileForm, input));
  utils.openModal(profileModal);
};

//utils
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  utils.closeModal(profileModal);
};

// Card Modal Elements & Handlers
const cardAddBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#new-card-popup");
const cardForm = cardModal.querySelector(".popup__form");
const cardCloseBtn = cardModal.querySelector(".popup__close");
const cardInputs = Array.from(cardForm.querySelectorAll(".popup__input"));
const cardSubmitButton = cardForm.querySelector(".popup__button");

const handleOpenCardModal = () => {
  cardForm.reset(); // Usa el método nativo reset()
  toggleButtonState(cardSubmitButton, cardInputs); // Deshabilita el botón porque el form está vacío
  cardInputs.forEach((input) => hidePopupInputError(cardForm, input));
  utils.openModal(cardModal);
};

//utils
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNameInput = cardModal.querySelector(".popup__input_type_card-name");
  const cardLinkInput = cardModal.querySelector(".popup__input_type_card-url");

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  Card.renderCard(newCard, cardsList);
  utils.closeModal(cardModal);
  evt.target.reset();
};

// Form Validation Functions & Logic (FV)
const showPopupInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
};

const hidePopupInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }
};

//FV
const toggleButtonState = (btn, inputsArray) => {
  const allValid = inputsArray.every(
    (inputElement) => inputElement.validity.valid
  );
  btn.disabled = !allValid;
};

// Nueva función genérica para añadir validación a cualquier formulario (FV)
const enableValidation = (formElement, inputElements, submitButton) => {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      if (!inputElement.validity.valid) {
        showPopupInputError(
          formElement,
          inputElement,
          inputElement.validationMessage
        );
      } else {
        hidePopupInputError(formElement, inputElement);
      }
      toggleButtonState(submitButton, inputElements);
    });
  });

  // Manejar el submit para prevenir envío si no es válido (FV)
  formElement.addEventListener("submit", (evt) => {
    const formValid = inputElements.every((input) => input.validity.valid);
    if (!formValid) {
      evt.preventDefault();
    }
  });
};

// Aplicar la validación a los formularios específicos (FV)
enableValidation(profileForm, profileInputs, profileSubmitButton);
enableValidation(cardForm, cardInputs, cardSubmitButton);

// Event Listeners (utils)
profileEditBtn.addEventListener("click", handleOpenEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseBtn.addEventListener("click", () => {
  utils.closeModal(profileModal);
});

cardAddBtn.addEventListener("click", handleOpenCardModal);
cardForm.addEventListener("submit", handleCardFormSubmit);
cardCloseBtn.addEventListener("click", () => {
  utils.closeModal(cardModal);
});
