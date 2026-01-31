import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  // Este método es la CLAVE: nos permite cambiar qué hace el botón de confirmar
  // cada vez que abrimos el popup para una tarjeta diferente.
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(); // Ejecuta la acción que configuramos
    });
  }
}
