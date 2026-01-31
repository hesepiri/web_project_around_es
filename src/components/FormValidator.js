export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  // Busca el elemento de error usando el ID del input + "-error"
  // Ejemplo: input id="name-input" -> busca #name-input-error
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);

    inputElement.classList.add(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);

    inputElement.classList.remove(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
