import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector)
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
      const inputElements = this._popup.querySelectorAll('.popup__input');
      const inputElement = {};
      inputElements.forEach(element =>
        inputElement[element.name] = element.value);
      return inputElement
  }

  setEventListeners() {
      this._form.addEventListener('submit', (evt) => {
        this._submitForm(evt, this._getInputValues())});
      super.setEventListeners();
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
