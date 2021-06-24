export class FormValidator {
  constructor (selector, element) {
    this._selector = selector;
    this._element = element;
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._selector.inputErrorClass);
    errorElement.classList.remove(this._selector.errorClass);
    errorElement.textContent = '';
  }

  _showInputError = (inputElement) => {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._selector.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._selector.errorClass);
  }

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._element.querySelectorAll(this._selector.inputSelector));
    this._buttonElement = this._element.querySelector(this._selector.submitButtonSelector);
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
        });
    });
  }

  _hasInvalidInput = () => {
    return this._inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selector.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._selector.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  clearValidation = () => {
    const inputList = Array.from(this._element.querySelectorAll(this._selector.inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
    this._element.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
