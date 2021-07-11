import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector, deleteCardFromServer) {
    super(popupSelector);
    this._deleteCardFromServer = deleteCardFromServer;
  }

  deleteEventListener(card, cardId) {
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      this._deleteCardFromServer(evt, card, cardId);
    });
  }
}
