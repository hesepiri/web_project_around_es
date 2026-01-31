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
    this._isLikedFromServer = data.isLiked;

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

  isLiked() {
    if (this._isLikedFromServer !== undefined) {
      return this._isLikedFromServer;
    }
    return this._likes.some((user) => user._id === this._userId);
  }

  updateLikeView(isActive) {
    this._isLikedFromServer = isActive;

    if (isActive) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._isLikedFromServer = undefined;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
    const cardTitle = this._element.querySelector(".card__title");

    cardTitle.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    return this._element;
  }

  getCardId() {
    return this._id;
  }
}
