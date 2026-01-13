export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // El array de datos (initialCards)
    this._renderer = renderer; // La función que crea la tarjeta
    this._container = document.querySelector(containerSelector); // Dónde las pondremos
  }

  // Método público para dibujar todos los elementos iniciales
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Método público para añadir un elemento al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
