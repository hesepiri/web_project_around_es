// scripts/index.js
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

// 1. DATOS INICIALES
const initialCards = [
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

// 2. CONFIGURACIÓN DE VALIDACIÓN
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// 3. SELECTORES (Rescatados de tu index.js original)
const profileModal = document.querySelector("#edit-popup");
const cardModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");

const profileForm = document.querySelector("#edit-profile-form");
const cardForm = document.querySelector("#new-card-form");

const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");

// Botones de apertura/cierre
const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBtn = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// 4. LÓGICA DE TARJETAS
const handleCardClick = (name, link) => {
  const imagePicture = imageModal.querySelector(".popup__image");
  const imageCaption = imageModal.querySelector(".popup__caption");
  imagePicture.src = link;
  imagePicture.alt = name;
  imageCaption.textContent = name;
  openModal(imageModal);
};

// Renderizar tarjetas iniciales
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

// 5. LÓGICA DE FORMULARIOS (Manejadores de Submit)
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = cardForm.querySelector(".popup__input_type_card-name").value;
  const link = cardForm.querySelector(".popup__input_type_card-url").value;

  const card = new Card({ name, link }, "#card-template", handleCardClick);
  cardsList.prepend(card.generateCard());

  closeModal(cardModal);
  evt.target.reset();
  // Importante: Después de resetear, hay que desactivar el botón otra vez
  addFormValidator.toggleButtonState();
};

// 6. INSTANCIAR VALIDACIÓN
const editFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, cardForm);

editFormValidator.setEventListeners();
addFormValidator.setEventListeners();

// 7. EVENT LISTENERS GLOBALES
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

cardAddBtn.addEventListener("click", () => openModal(cardModal));

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

// Cerrar cualquier modal con los botones X
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});
