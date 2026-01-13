import Card from "./components/Card.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";
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
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

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
  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});
