import Card from "../components/Card.js";
import FormValidator from "./FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
//import { openModal, closeModal } from "./utils.js";
import {
  initialCards,
  validationConfig,
  //profileModal,
  //cardModal,
  //imageModal,
  //profileForm,
  //cardForm,
  //profileNameInput,
  //profileDescriptionInput,
  //profileTitle,
  //profileDescription,
  //cardsList,
  //profileEditBtn,
  //cardAddBtn,
  //closeButtons,
} from "../scripts/globalConsts.js";

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

//Popup para ver la imagen ampliada
const popupImage = new PopupWithImage(".#image-popup");
popupImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

//Renderizar tarjetas iniciales
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardsList.renderItems();

//Popup formulario perfil
const profilePopup = new PopupWithForm({
  popupSelector: ".#profile-popup",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      about: formData.about,
    });
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

//Popup formulario nueva tarjeta
const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (formData) => {
    const card = new Card(
      {
        name: formData.profileTitle,
        link: formData.profileDescription,
      },
      "#card-template",
      handleCardClick
    );

    cardsList.addItem(card.generateCard());
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

// Event listeners para abrir los popups
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    document.querySelector(".popup__input_type_name").value =
      currentUserInfo.name;
    document.querySelector(".popup__input_type_name").value =
      currentUserInfo.about;
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

/*
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

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      /*
      const card = item.isOwner ? new UserCard(item, "card-template_type_user") : new DefaultCard(item, "card-template_type_default");
       */
/*const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardsList.renderItems();

// Renderizar tarjetas iniciales
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
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
  cardsList.addItem(card.generateCard());

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
*/
