export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; // Función para el zoom de imagen
  }

  // Método privado para obtener el marcado del template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /*
  // Métodos privados: Controladores de eventos
  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // Limpiar referencia en memoria
  }
  */

  // Método privado para añadir los detectores de eventos
  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        //this._handleLikeIcon();
        evt.target.classList.toggle("card__like-button_is-active");
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        //this._handleDeleteCard();
        this._element.remove();
        this._element = null; // Limpiar referencia en memoria
      });

    // Usamos el callback handleCardClick
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._data.name, this._data.link);
      });
  }

  // Método público: devuelve la Card generada
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;

    return this._element;
  }
}
