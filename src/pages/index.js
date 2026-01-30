import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"; // Nueva clase para importar
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

// Popup de confirmación de eliminación de tarjeta
const deleteCardPopup = new PopupWithConfirmation("#delete-confirmation-popup");
deleteCardPopup.setEventListeners();

// Popup para ver la imagen ampliada
const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const handleCardDelete = (cardInstance) => {
  // Abrimos el popup
  deleteCardPopup.open();

  // Configuramos la acción del botón "Sí" para esta tarjeta específica
  deleteCardPopup.setSubmitAction(() => {
    // Llamamos a la API para eliminar la tarjeta del servidor
    api
      .deleteCard(cardInstance.getCardId())
      .then(() => {
        // Si el servidor dice 200 OK, entonces borramos la tarjeta del DOM
        cardInstance.deleteCard();
        // Cerramos el popup de confirmación
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(`Error al eliminar la tarjeta: ${err}`);
      });
  });
};

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

const handleCardLike = (cardInstance) => {
  // Verificar si ya le di like
  const isLiked = cardInstance.isLiked();
  // Decidir que metodo de la API hay que usar
  if (isLiked) {
    api
      .remvoveLike(cardInstance.getCardId())
      .then((res) => {
        // CORRECCIÓN: Usamos el método nuevo.
        // Si la API devuelve 'isLiked', usamos eso. Si no, forzamos false.
        // Actualizar la tarjeta con los datos nuevos del servidor
        const active = res.hasOwnProperty("isLiked") ? res.isLiked : false;
        cardInstance.updateLikeView(active);
      })
      .catch((err) => {
        console.log(`Error al quitar el like: ${err}`);
      });
  } else {
    api
      .addLike(cardInstance.getCardId())
      .then((res) => {
        // 🕵️‍♂️ ZONA DE DETECTIVE
        console.log("Respuesta de la API:", res);
        console.log("¿Existe res.likes?:", res.likes);

        // Si res.likes es undefined, aquí veremos por qué
        // Actualizar la tarjeta con los datos nuevos del servidor
        // CORRECCIÓN: Mismo caso. Si la respuesta dice isLiked: true, encendemos.
        const active = res.hasOwnProperty("isLiked") ? res.isLiked : true;
        cardInstance.updateLikeView(active);
      })
      .catch((err) => {
        console.log(`Error al dar el like: ${err}`);
      });
  }
};

// Renderizar tarjetas iniciales (Section)
const cardsList = new Section(
  {
    renderer: (item) => {
      // Obtenemos MI ID actual (lo guardamos en userInfo al inicio)
      const card = new Card(
        item,
        "#card-template",
        handleCardClick,
        handleCardDelete, // Pasamos la función para eliminar
        userInfo.getUserId(), // Le pasamos mi ID actual (ahora de UserInfo)
        handleCardLike, // Pasamos la función para los likes
      );
      cardsList.addItem(card.generateCard());
    },
  },
  ".cards__list",
);

// Carga inicial: Usuario y tarjetas
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Establecemos los datos
    userInfo.setUserInfo(userData);
    // (Opcional) Verifica en consola que el ID ya existe
    console.log("ID del usuario cargado:", userInfo.getUserId());
    // Hacemos visible el perfil y la imagen
    document.querySelector(".profile__info").style.visibility = "visible";
    document.querySelector(".profile__image").style.visibility = "visible";

    // Opción de opacidad para el efecto suave:
    document.querySelector(".profile__info").style.opacity = "1";
    document.querySelector(".profile__image").style.opacity = "1";

    // Renderizamos las tarjetas
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
        // Aqui tambien faltan argumentos
        const card = new Card(
          newCardData,
          "#card-template",
          handleCardClick,
          handleCardDelete, // Faltaba este argumento, se añade la función para eliminar
          userInfo.getUserId(), // Faltaba este argumento, se pasa mi ID actual
          handleCardLike, // Faltaba este argumento, se añade la función para los likes
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
    // Cambiar boton a "Guardando... "
    avatarPopup.renderLoading(true);

    // Llamada a la API para cambiar el avatar
    api
      .updateAvatar(inputValues.avatar)
      .then((userData) => {
        // Actualizar la foto en pantalla
        userInfo.setUserInfo(userData);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Error al actualizar el avatar: ${err}`);
      })
      .finally(() => {
        // Restaurar boton a "Guardar" (independientemente de éxito o fallo)
        avatarPopup.renderLoading(false);
      });
  },
});
avatarPopup.setEventListeners();

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

// Agregar el listener para abrir el popup
// Necesitarás importar o seleccionar el botón de editar avatar
const avatarEditBtn = document.querySelector(".profile__image-edit-button");

avatarEditBtn.addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  avatarPopup.open();
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
