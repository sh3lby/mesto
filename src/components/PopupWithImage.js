import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(name, link) {
    const popupImage = this._popup.querySelector('.popup__image');
    const popupDescription = this._popup.querySelector('.popup__figcaption');

    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    super.openPopup();
  };
}
