export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    userId,
    handleCardLike,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._isLikedFromServer = data.isLiked; // Propiedad especial de tu API (si existe)

    // Lógica para determinar el dueño
    if (data.owner && data.owner._id) {
      this._ownerId = data.owner._id;
    } else if (data.owner) {
      this._ownerId = data.owner;
    } else {
      this._ownerId = null;
    }

    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // --- LÓGICA DE LIKES ---

  isLiked() {
    // 1. Prioridad: ¿La API me dijo explícitamente si tengo like?
    if (this._isLikedFromServer !== undefined) {
      return this._isLikedFromServer;
    }
    // 2. Respaldo: Buscar en el array de likes original
    return this._likes.some((user) => user._id === this._userId);
  }

  updateLikeView(isActive) {
    // Actualizamos estado interno
    this._isLikedFromServer = isActive;

    // Actualizamos la vista (CSS)
    if (isActive) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._isLikedFromServer = undefined; // Reseteamos para que recalcule con el array nuevo

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  // --- LISTENERS ---

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this); // Pasamos 'this' (la instancia)
    });
  }

  // --- GENERAR TARJETA ---

  generateCard() {
    this._element = this._getTemplate();

    // Guardar referencias
    this._imageElement = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    const cardTitle = this._element.querySelector(".card__title");

    // Asignar datos
    cardTitle.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    // Lógica del basurero (Eliminar botón si no soy el dueño)
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    // Activar listeners
    this._setEventListeners();

    // Estado inicial del Like
    // IMPORTANTE: Solo pintamos si isLiked() es verdadero.
    // Ya NO llamamos a setLikes() aquí para evitar borrar la data del servidor.
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    return this._element;
  }

  // --- MÉTODOS PÚBLICOS EXTRA ---

  getCardId() {
    return this._id;
  }
}
