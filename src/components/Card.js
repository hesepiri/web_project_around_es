export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardDelete, // Nuevo handler para Eliminar la tarjeta
    userId, // Mi ID, para saber si soy el dueño de la tarjeta
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // Guardamos el ID de la tarjeta
    this._ownerId = data.owner._id; // ID del dueño de la tarjeta
    this._userId = userId; // Mi ID

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; // Función para el zoom de imagen
    this._handleCardDelete = handleCardDelete; // Función para eliminar la tarjeta
  }

  // Método privado para obtener el marcado del template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Metodo publico para eliminar la tarjeta del DOM
  deleteCard() {
    this._element.remove();
    this._element = null; // Limpiar referencia en memoria
  }

  // Método privado para añadir los detectores de eventos
  _setEventListeners() {
    // Listener para ver la imagen (ya existía)
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // Listener para el boton de eliminar (ya existia el boton, pero ahora le damos funcionalidad)
    this._deleteButton.addEventListener("click", () => {
      // Cuando se hace click, ejecutamos la funcion que nos paso index.js
      // Le pasamos "this" para que index.js sepa que tarjta hay que eliminar
      this._handleCardDelete(this); // Avisamos a index.js que queremos borrar ESTA tarjeta (this).
    });

    // Listener para el boton de like 👍 (sin cambios de momento)
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_is-active");
    });
  }

  // Método público: devuelve la Card generada
  generateCard() {
    this._element = this._getTemplate();

    // CACHÉ DE ELEMENTOS (Guardamos las referencias UNA sola vez)
    // Así no tenemos que buscar ".card__image" cada vez que la necesitemos.
    this._imageElement = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._element.querySelector(".card__title").textContent = this._name;

    // Usamos las referencias guardadas
    this._imageElement.src = this._link; // Usamos _link en vez de _data.link
    this._imageElement.alt = this._name; // Usamos _name en vez de _data.name

    // --- ZONA DE DEBUG ---
    console.log("🃏 Revisando tarjeta:", this._name);
    console.log("   Dueño de la foto:", this._ownerId);
    console.log("   Usuario actual (Yo):", this._userId);
    console.log("   ¿Son iguales?:", this._ownerId === this._userId);
    // ---------------------

    // LA NOVEDAD: Chequeo de Dueño
    // Gracias a que guardamos _deleteButton arriba, ahora podemos borrarlo si no es mío.
    // Logica para ver si soy el dueño de la tarjeta
    if (this._ownerId !== this._userId) {
      // No soy el dueño, remuevo el boton de eliminar
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  // Metodo público para obtener el ID de la tarjeta (index.js lo necesita)
  getCardId() {
    return this._id;
  }
}
