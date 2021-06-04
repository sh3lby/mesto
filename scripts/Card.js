export class Card {
  #element;
  #name;
  #link;
  #handleCardClick;

  constructor({name, link}, handleCardClick) {
      this.#name = name;
      this.#link = link;
      this.#handleCardClick = handleCardClick;
  }
  #getTemplate = () => {
    const cardElement = document
      .querySelector('#add-element')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this.#element = this.#getTemplate();
    this.#setEventListeners();
    this.#element.querySelector('.element__title').textContent = this.#name;
    this.#element.querySelector('.element__image').src = this.#link;
    this.#element.querySelector('.element__image').alt = this.#name;

    return this.#element;
  }

  #setEventListeners = () => {
    this.#element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this.#likeElement(evt);
    });

    this.#element.querySelector('.element__trash-button').addEventListener('click', () => {
      this.#deleteElement();
    });

    this.#element.querySelector('.element__image').addEventListener('click', () => {
      this.#handleCardClick(this.#link, this.#name);
  });
  }

  #likeElement = (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  }

  #deleteElement = (evt) => {
    if(this.#element) {
      this.#element.remove();
    }
  }
}
