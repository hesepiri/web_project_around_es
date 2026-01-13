import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  validationConfig,
  profileEditBtn,
  cardAddBtn,
} from "../scripts/globalConsts.js";

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

//Popup para ver la imagen ampliada
const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

//Renderizar tarjetas iniciales (Section)
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      cardsList.addItem(card.generateCard());
    },
  },
  ".cards__list"
);
cardsList.renderItems();

//Popup formulario perfil
const profilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      about: formData.description,
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
        name: formData.titulo,
        link: formData.link,
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
profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  // Llenamos los inputs manualmente antes de abrir
  document.querySelector(".popup__input_type_name").value = name;
  document.querySelector(".popup__input_type_description").value = about;

  // Usamos el validador específico de este formulario
  formValidators["edit-profile-form"].toggleButtonState();

  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  // Al abrir, el formulario de tarjeta siempre debe tener el botón bloqueado
  formValidators["new-card-form"].toggleButtonState();
  addCardPopup.open();
});

// Objeto para almacenar las instancias de los validadores
const formValidators = {};

// Función para habilitar la validación
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // Obtenemos el nombre del formulario para usarlo como llave
    const formName = formElement.getAttribute("id");

    formValidators[formName] = validator;
    validator.setEventListeners();
  });
};

// Activamos la validación con la configuración de tus constantes
enableValidation(validationConfig);
