import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  apiConfig,
  validationConfig,
  profileEditBtn,
  cardAddBtn,
} from "../scripts/globalConsts.js";

const api = new Api(apiConfig);

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Popup para ver la imagen ampliada
const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

// Renderizar tarjetas iniciales (Section)
const cardsList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      cardsList.addItem(card.generateCard());
    },
  },
  ".cards__list",
);

// Carga inicial: Usuario y tarjetas
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Error al cargar la información inicial: ${err}`);
  });

// Popup formulario perfil
const profilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (inputValues) => {
    profilePopup.renderLoading(true);

    api
      .editProfile({
        name: inputValues.name,
        about: inputValues.description,
      })
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(`Error al editar el perfil: ${err}`);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});
profilePopup.setEventListeners();

// Popup formulario nueva tarjeta
const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (inputValues) => {
    addCardPopup.renderLoading(true);

    api
      .addCard({
        name: inputValues.titulo,
        link: inputValues.link,
      })
      .then((newCardData) => {
        const card = new Card(newCardData, "#card-template", handleCardClick);
        cardsList.addItem(card.generateCard());
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Error al agregar la tarjeta: ${err}`);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  },
});
addCardPopup.setEventListeners();

// Event listeners para abrir los popups
profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector(".popup__input_type_name").value = name;
  document.querySelector(".popup__input_type_description").value = about;

  formValidators["edit-profile-form"].resetValidation();
  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  formValidators["new-card-form"].resetValidation();
  addCardPopup.open();
});

// Validación de formularios
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id");

    formValidators[formName] = validator;
    validator.setEventListeners();
  });
};

enableValidation(validationConfig);
