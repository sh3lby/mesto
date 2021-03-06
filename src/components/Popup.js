export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  popupTitle() {
    const popup = this._popup;
    return popup
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleKeyEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleKeyEscClose);
  };

  _handleKeyEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
