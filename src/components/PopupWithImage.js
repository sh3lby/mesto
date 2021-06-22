import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(cardElement) {
        const popupImage = this._popup.querySelector('.popup__image');
        const popupDescription = this._popup.querySelector('.popup__figcaption');
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__title');

        popupImage.src = cardImage.src;
        popupImage.alt = cardTitle.textContent;
        popupDescription.textContent = cardTitle.textContent;
        super.openPopup();
    };
}
