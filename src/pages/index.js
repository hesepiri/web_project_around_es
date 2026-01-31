import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { apiConfig, validationConfig } from "../scripts/globalConsts.js";

/* -------------------------------------------------------------------------- */
/* 1. VARIABLES GLOBALES                                                      */
/* -------------------------------------------------------------------------- */
const api = new Api(apiConfig);
const formValidators = {};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/* -------------------------------------------------------------------------- */
/* 2. FUNCIONES DE VALIDACIÓN                                                 */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/* 3. POPUPS Y LOGICA DE TARJETAS                                             */
/* -------------------------------------------------------------------------- */
const deleteCardPopup = new PopupWithConfirmation("#delete-confirmation-popup");
deleteCardPopup.setEventListeners();

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const handleCardDelete = (cardInstance) => {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance.getCardId())
      .then(() => {
        cardInstance.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(`Error al eliminar: ${err}`));
  });
};

const handleCardLike = (cardInstance) => {
  const isLiked = cardInstance.isLiked();
  if (isLiked) {
    api
      .removeLike(cardInstance.getCardId())
      .then((res) => {
        const active = res.hasOwnProperty("isLiked") ? res.isLiked : false;
        cardInstance.updateLikeView(active);
      })
      .catch((err) => console.log(`Error al quitar like: ${err}`));
  } else {
    api
      .addLike(cardInstance.getCardId())
      .then((res) => {
        const active = res.hasOwnProperty("isLiked") ? res.isLiked : true;
        cardInstance.updateLikeView(active);
      })
      .catch((err) => console.log(`Error al dar like: ${err}`));
  }
};

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleCardClick,
        handleCardDelete,
        userInfo.getUserId(),
        handleCardLike,
      );
      cardsList.addItem(card.generateCard());
    },
  },
  ".cards__list",
);

/* -------------------------------------------------------------------------- */
/* 4. CARGA INICIAL (¡AQUÍ ESTABA EL FANTASMA! 👻)                            */
/* -------------------------------------------------------------------------- */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);

    // 👇 SOLUCIÓN: Seleccionamos y forzamos la aparición
    const profileInfo = document.querySelector(".profile__info");
    const profileImage = document.querySelector(".profile__image");

    if (profileInfo) {
      profileInfo.style.visibility = "visible";
      profileInfo.style.opacity = "1"; // ¡Esto faltaba!
    }
    if (profileImage) {
      profileImage.style.visibility = "visible";
      profileImage.style.opacity = "1"; // ¡Esto faltaba!
    }

    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => console.log(`Error inicial: ${err}`));

/* -------------------------------------------------------------------------- */
/* 5. POPUPS DE FORMULARIOS (CORREGIDO)                                       */
/* -------------------------------------------------------------------------- */

// Editar Perfil
const profilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (inputValues) => {
    profilePopup.renderLoading(true);
    // CORRECCIÓN: Usamos .name y .about porque en HTML input name="name" y name="about"
    api
      .editProfile({
        name: inputValues.name,
        about: inputValues.about,
      })
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => profilePopup.renderLoading(false));
  },
});
profilePopup.setEventListeners();

// Nueva Tarjeta
const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (inputValues) => {
    addCardPopup.renderLoading(true);
    // CORRECCIÓN: Usamos .name y .link porque en HTML input name="name" y name="link"
    api
      .addCard({
        name: inputValues.name,
        link: inputValues.link,
      })
      .then((newCardData) => {
        const card = new Card(
          newCardData,
          "#card-template",
          handleCardClick,
          handleCardDelete,
          userInfo.getUserId(),
          handleCardLike,
        );
        cardsList.addItem(card.generateCard());
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => addCardPopup.renderLoading(false));
  },
});
addCardPopup.setEventListeners();

// Avatar
const avatarPopup = new PopupWithForm({
  popupSelector: "#avatar-popup",
  handleFormSubmit: (inputValues) => {
    avatarPopup.renderLoading(true);
    // CORRECCIÓN: Usamos .avatar porque en HTML input name="avatar"
    api
      .updateAvatar(inputValues.avatar)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        avatarPopup.close();
      })
      .catch((err) => console.log(err)) // ¡Aquí verás si hay otro error!
      .finally(() => avatarPopup.renderLoading(false));
  },
});
avatarPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/* 6. EVENT LISTENERS                                                         */
/* -------------------------------------------------------------------------- */
const localProfileEditBtn = document.querySelector(".profile__edit-button");
const localCardAddBtn = document.querySelector(".profile__add-button");
const localAvatarEditBtn = document.querySelector(
  ".profile__image-edit-button",
);

// Listener Perfil
if (localProfileEditBtn) {
  localProfileEditBtn.addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    const nameInput = document.querySelector("#name-input");
    const aboutInput = document.querySelector("#about-input");

    if (nameInput) nameInput.value = name;
    if (aboutInput) aboutInput.value = about;

    try {
      if (formValidators["edit-profile-form"]) {
        formValidators["edit-profile-form"].resetValidation();
      }
    } catch (e) {
      console.warn("Error validación perfil", e);
    }

    profilePopup.open();
  });
}

// Listener Tarjeta
if (localCardAddBtn) {
  localCardAddBtn.addEventListener("click", () => {
    try {
      if (formValidators["new-card-form"]) {
        formValidators["new-card-form"].resetValidation();
      }
    } catch (e) {
      console.warn("Error validación tarjeta", e);
    }
    addCardPopup.open();
  });
}

// Listener Avatar
if (localAvatarEditBtn) {
  localAvatarEditBtn.addEventListener("click", () => {
    try {
      if (formValidators["avatar-form"]) {
        formValidators["avatar-form"].resetValidation();
      }
    } catch (e) {
      console.warn("Error validación avatar", e);
    }
    avatarPopup.open();
  });
}
