import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";
import {
  initialCards,
  validationConfig,
  profileModal,
  cardModal,
  imageModal,
  profileForm,
  cardForm,
  profileNameInput,
  profileDescriptionInput,
  profileTitle,
  profileDescription,
  cardsList,
  profileEditBtn,
  cardAddBtn,
  closeButtons,
} from "./globalConsts.js";

// Objeto para guardar instancias de validadores por formulario
const formValidators = {};

// Función para habilitar la validación en todos los formularios
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    const formId = formElement.getAttribute("id");
    formValidators[formId] = formValidator;
    formValidator.setEventListeners();
  });
};

// Llamar a la función para habilitar la validación
enableValidation(validationConfig);

// Manejador para el clic en la imagen de la tarjeta (abrir modal de imagen)
const handleCardClick = (image) => {
  const imagePicture = imageModal.querySelector(".popup__image");
  const imageCaption = imageModal.querySelector(".popup__caption");
  imagePicture.src = image.link;
  imagePicture.alt = image.name;
  imageCaption.textContent = image.name;
  openModal(imageModal);
};

// Renderizar tarjetas iniciales
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

// Formularios (Manejadores de Submit)
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
  //addFormValidator.toggleButtonState();
  formValidators["new-card-form"].toggleButtonState();
};

// Event listeners para abrir y cerrar modales
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
