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
const cardTemplate = document.querySelector("#card-template").content;

// Image Modal Elements
const imageModal = document.querySelector("#image-popup");
const imagePicture = imageModal.querySelector(".popup__image");
const imageCaption = imageModal.querySelector(".popup__caption");
const imageCloseBtn = imageModal.querySelector(".popup__close");

// Card - Functions
const handlerCardLikeBtn = (btn) => {
  btn.addEventListener("click", () =>
    btn.classList.toggle("card__like-button_is-active")
  );
};

const handlerDeleteCardBtn = (btn, card) => {
  btn.addEventListener("click", () => card.remove());
};

const handlerImageClick = (image) => {
  image.addEventListener("click", () => {
    imagePicture.src = image.src;
    imagePicture.alt = image.alt;
    imageCaption.textContent = image.alt;
    openModal(imageModal);
  });
};

const getCardElement = (name, link) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  handlerCardLikeBtn(cardLikeButton);
  handlerDeleteCardBtn(cardDeleteButton, cardElement);
  handlerImageClick(cardImage);

  return cardElement;
};

const renderCard = (name, link, container) => {
  container.prepend(getCardElement(name, link));
};

// Render Initial Cards
initialCards.forEach((card) => renderCard(card.name, card.link, cardsList));

// Modals - Functions
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    // Busca el modal abierto actualmente y lo cierra
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  // Eliminar listeners globales cuando se cierra el modal
  document.removeEventListener("keydown", handleEscapeKey);
};

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  // Añadir listeners globales cuando se abre el modal
  document.addEventListener("keydown", handleEscapeKey);
};

// Event listener para cerrar dando click con el mouse afuera del modal [Overlay] - aplicado globalmente a todos los popups
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
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

const handleOpenEditModal = () => {
  // Simplificado: llamamos directamente a la función de validación para resetear errores/estado del botón
  fillProfileForm();
  toggleButtonState(profileSubmitButton, profileInputs); // Habilita el botón si los valores cargados son válidos
  profileInputs.forEach((input) => hidePopupInputError(profileForm, input));
  openModal(profileModal);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
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
  openModal(cardModal);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNameInput = cardModal.querySelector(".popup__input_type_card-name");
  const cardLinkInput = cardModal.querySelector(".popup__input_type_card-url");

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  closeModal(cardModal);
  evt.target.reset();
};

// Form Validation Functions & Logic
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

const toggleButtonState = (btn, inputsArray) => {
  const allValid = inputsArray.every(
    (inputElement) => inputElement.validity.valid
  );
  btn.disabled = !allValid;
};

// Nueva función genérica para añadir validación a cualquier formulario
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

  // Manejar el submit para prevenir envío si no es válido
  formElement.addEventListener("submit", (evt) => {
    const formValid = inputElements.every((input) => input.validity.valid);
    if (!formValid) {
      evt.preventDefault();
    }
  });
};

// Aplicar la validación a los formularios específicos
enableValidation(profileForm, profileInputs, profileSubmitButton);
enableValidation(cardForm, cardInputs, cardSubmitButton);

// Event Listeners
profileEditBtn.addEventListener("click", handleOpenEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseBtn.addEventListener("click", () => {
  closeModal(profileModal);
});

cardAddBtn.addEventListener("click", handleOpenCardModal);
cardForm.addEventListener("submit", handleCardFormSubmit);
cardCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

imageCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});
