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

//Popup para ver la imagen ampliada
const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

//Renderizar tarjetas iniciales (Section)
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
    // -------------------
    console.log("🕵️‍♂️ Datos del Usuario:", userData);
    console.log("🃏 Cartas recibidas del servidor:", cards); // <--- Aquí verás el array
    console.log("Cantidad de cartas:", cards.length);
    // -------------------

    // Seteamos la info del usuario
    userInfo.setUserInfo(userData);
    // Renderizamos las tarjetas
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Error al cargar la información inicial: ${err}`);
  });

//Popup formulario perfil
const profilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (inputValues) => {
    //------------------------------
    // 1. Verificamos qué estamos recibiendo
    console.log("👀 Datos del formulario:", inputValues);

    // 2. Verificamos que 'api' existe y tiene el método
    console.log("🤖 Objeto API:", api);

    // 3. Verificamos los datos que vamos a enviar
    const dataToSend = {
      name: inputValues.name,
      about: inputValues.description,
    };
    console.log("📤 Enviando a API:", dataToSend);
    //------------------------------
    profilePopup.renderLoading(true); //Sprint 12 - Iniciamos carga

    //Llamamos a la API para editar el perfil
    api
      .editProfile({
        name: inputValues.name,
        about: inputValues.description, //Mapeamos 'description' del form a 'about' de la API
      })
      .then((userData) => {
        console.log("✅ Respuesta API:", userData); // Log de éxito
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => {
        //console.log(`Error al editar el perfil: ${err}`);
        console.log("❌ Error API:", err); // Log de error
      })
      .finally(() => {
        profilePopup.renderLoading(false); //Sprint 12 - Finalizamos carga y regresamos el texto del boton
      });
  },
});
profilePopup.setEventListeners();

//Popup formulario nueva tarjeta
const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (inputValues) => {
    addCardPopup.renderLoading(true); //Sprint 12 - Iniciamos carga

    api
      .addCard({
        name: inputValues.titulo,
        link: inputValues.link,
      })
      .then((newCardData) => {
        // Creamos la tarjeta con la respuesta del servidor (que incluye el _id correcto)
        const card = new Card(newCardData, "#card-template", handleCardClick);
        cardsList.addItem(card.generateCard());
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Error al agregar la tarjeta: ${err}`);
      })
      .finally(() => {
        addCardPopup.renderLoading(false); //Sprint 12 - Finalizamos carga y regresamos el texto del boton
      });
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
  formValidators["edit-profile-form"].resetValidation();

  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  // Al abrir, el formulario de tarjeta siempre debe tener el botón bloqueado
  formValidators["new-card-form"].resetValidation();
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
