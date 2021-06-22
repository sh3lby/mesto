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
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

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
      this._handleCardClick(this._element);
  });
  }

  _likeElement = (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  }

  _deleteElement = (evt) => {
    if(this._element) {
      this._element.remove();
    }
  }
}
