export class FormValidator {
  #selector;
  #element;
  #inputList;
  #buttonElement;

  constructor (selector, element) {
    this.#selector = selector;
    this.#element = element;
  }

  #hideInputError = (inputElement) => {
    const errorElement = this.#element.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this.#selector.inputErrorClass);
  errorElement.classList.remove(this.#selector.errorClass);
  errorElement.textContent = '';
  }

  #showInputError = (inputElement) => {
    const errorElement = this.#element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.#selector.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#selector.errorClass);
  }

  #checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this.#hideInputError(inputElement);
    } else {
      this.#showInputError(inputElement, inputElement.validationMessage);
    }
  }

  #setEventListeners = () => {
    this.#inputList = Array.from(this.#element.querySelectorAll(this.#selector.inputSelector));
    this.#buttonElement = this.#element.querySelector(this.#selector.submitButtonSelector);
    this.toggleButtonState();
    this.#inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this.#checkInputValidity(inputElement);
            this.toggleButtonState();
        });
    });
  }

  #hasInvalidInput = () => {
    return this.#inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#selector.inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#selector.inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  }

  enableValidation = () => {
    this.#element.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this.#setEventListeners();
  }
}
