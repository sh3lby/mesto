export class Card {
  constructor({name, link}, cardSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__image');
    const name = this._element.querySelector('.element__title');
    this._setEventListeners();

    name.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    return this._element;
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeElement(evt);
    });

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
  });
  }

  _likeElement = (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  }

  _deleteElement = (evt) => {
    this._element.remove();
  }
}
