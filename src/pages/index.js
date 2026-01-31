import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  apiConfig,
  validationConfig,
  profileEditBtn,
  cardAddBtn,
} from "../scripts/globalConsts.js";

const api = new Api(apiConfig);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

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
      .catch((err) => {
        console.log(`Error al eliminar la tarjeta: ${err}`);
      });
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    document.querySelector(".profile__info").style.visibility = "visible";
    document.querySelector(".profile__image").style.visibility = "visible";
    document.querySelector(".profile__info").style.opacity = "1";
    document.querySelector(".profile__image").style.opacity = "1";

    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(`Error al cargar la información inicial: ${err}`);
  });

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
      .catch((err) => {
        console.log(`Error al agregar la tarjeta: ${err}`);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  },
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: "#avatar-popup",
  handleFormSubmit: (inputValues) => {
    avatarPopup.renderLoading(true);

    api
      .updateAvatar(inputValues.avatar)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Error al actualizar el avatar: ${err}`);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});
avatarPopup.setEventListeners();

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

const avatarEditBtn = document.querySelector(".profile__image-edit-button");

avatarEditBtn.addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  avatarPopup.open();
});

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
