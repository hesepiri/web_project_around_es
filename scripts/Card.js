import * as utils from "./utils.js";

class Card {
  //Constructor
  constructor(image, templateSelector) {
    this._image = image;
    this._templateSelector = templateSelector;

    // Image Modal Elements
    this._imageModal = document.querySelector("#image-popup");
    this._imagePicture = this._imageModal.querySelector(".popup__image");
    this._imageCaption = this._imageModal.querySelector(".popup__caption");
    this._imageCloseBtn = this._imageModal.querySelector(".popup__close");

    //Event listener para cerrar el modal de imagen
    this._imageCloseBtn.addEventListener("click", () => {
      utils.closeModal(this._imageModal);
    });
  }

  //Inner Card methods
  _handlerCardLikeBtn(btn) {
    btn.addEventListener("click", () =>
      btn.classList.toggle("card__like-button_is-active")
    );
  }

  _handlerDeleteCardBtn(btn, card) {
    btn.addEventListener("click", () => card.remove());
  }

  _handlerImageClick(image) {
    image.addEventListener("click", () => {
      this._imagePicture.src = image.src;
      this._imagePicture.alt = image.alt;
      this._imageCaption.textContent = image.alt;
      utils.openModal(this._imageModal);
    });
  }

  //Public Card method
  getCardElement() {
    this._element = this._templateSelector
      .querySelector(".card")
      .cloneNode(true);

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");
    const cardLikeButton = this._element.querySelector(".card__like-button");
    const cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );

    cardImage.src = this._image.link;
    cardImage.alt = this._image.name;
    cardTitle.textContent = this._image.name;

    this._handlerCardLikeBtn(cardLikeButton);
    this._handlerDeleteCardBtn(cardDeleteButton, this._element);
    this._handlerImageClick(cardImage);

    return this._element;
  }

  static renderCard(image, container) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = new Card(image, cardTemplate);
    container.prepend(card.getCardElement());
  }
}

export { Card };
