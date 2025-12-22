//import { Card } from "./Card.js";
/*
// Aquí van las utilidades generales del proyecto,
//contendrá los controladores de eventos y la función que abre/cierra las ventanas modales.


// Image Modal Elements
const imageModal = document.querySelector("#image-popup");
const imagePicture = imageModal.querySelector(".popup__image");
const imageCaption = imageModal.querySelector(".popup__caption");
const imageCloseBtn = imageModal.querySelector(".popup__close");

//Modal utils
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    // Busca el modal abierto actualmente y lo cierra
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  // Añadir listeners globales cuando se abre el modal
  document.addEventListener("keydown", handleEscapeKey);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  // Eliminar listeners globales cuando se cierra el modal
  document.removeEventListener("keydown", handleEscapeKey);
};

const renderCard = (image, container) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = new Card(image, cardTemplate);
  container.prepend(card.getCardElement());
};

const handlerCloseModal = (closeBtn, modal) => {
  closeBtn.addEventListener("click", () => {
    closeModal(modal);
  });
};

export {
  openModal,
  closeModal,
  renderCard,
  handlerCloseModal,
  imageModal,
  imagePicture,
  imageCaption,
  imageCloseBtn,
};
*/

/*
const renderCard = (image, container) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = new Card(image, cardTemplate);
  container.prepend(card.getCardElement());
};

export { renderCard };
*/

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  // Añadir listeners globales cuando se abre el modal
  document.addEventListener("keydown", handleEscapeKey);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  // Eliminar listeners globales cuando se cierra el modal
  document.removeEventListener("keydown", handleEscapeKey);
};

const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    // Busca el modal abierto actualmente y lo cierra
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

export { openModal, closeModal };
