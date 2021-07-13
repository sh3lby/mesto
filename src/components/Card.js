export class Card {
  constructor(
    {name, link, likes = [], _id, owner },
    cardSelector,
    handleCardClick,
    likeCards,
    dislikeCards,
    deleteCardHandler,
    userId) {
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._counter = likes.length;
      this._owner = owner._id;
      this._id = _id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._likeCards = likeCards;
      this._dislikeCards = dislikeCards;
      this._deleteCardHandler = deleteCardHandler;
      this._userId = userId._id;
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
    const counterLikes = this._element.querySelector('.element__like-counter');
    this._likeBtn = this._element.querySelector('.element__like-button');

    this._setEventListeners();

    this._likes.forEach(likes => {
      if (likes._id === this._userId) {
        this._likeBtn.classList.add('element__like-button_active')
      }
    });

    name.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    counterLikes.textContent = this._counter;

    if (this._owner === this._userId) {
      return this._element;
    } else {
      this._element.querySelector('.element__trash-button').style.display = "none";
      return this._element;
    }
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeElement(evt);
    });

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCardHandler(this, this._id);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
  });
  }

  _likeElement = (evt) => {
    this.countLikes = this._element.querySelector('.element__like-counter');
    if (
      evt.target.classList.toggle('element__like-button_active')) {
      this.countLikes.textContent = Number(this.countLikes.textContent) + Number(1);
      this._likeCards(this._id);
    } else {
      this.countLikes.textContent = Number(this.countLikes.textContent) - Number(1);
      this._dislikeCards(this._id);
    }
  }

  deleteElement = (evt) => {
    this._element.remove();
  }
}
