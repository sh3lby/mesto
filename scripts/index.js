import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-сards.js';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}


// Popup User

const popupUser = document.querySelector('#popup-user');
const popupUserOpen = document.querySelector('.profile__edit-button');
const popupUserClose = document.querySelector('#btn-close-about-popup');
const formUser = document.querySelector('#form-user');
const nameInput = formUser.querySelector('.popup__input_type_name');
const jobInput = formUser.querySelector('.popup__input_type_job');
const nameChange = document.querySelector('.profile__name');
const jobChange = document.querySelector('.profile__job');


// Popup Element

const popupElement = document.querySelector('#popup-element');
const popupElementOpen = document.querySelector('.profile__add-button');
const popupElementClose = document.querySelector('#btn-close-add-popup');
const formElement = document.querySelector('#form-element');
const btnSubmitElement = document.querySelector('#btn-submit-add-popup');
const nameElement = document.querySelector('.popup__input_type_name-place');
const srcElement = document.querySelector('.popup__input_type_src-link');


// Popup View

const popupView = document.querySelector('#popup-view');
const popupViewClose = document.querySelector('#btn-close-figure-popup');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__figcaption');

//


const overlayPopup = document.querySelectorAll('.popup');

const gallery = document.querySelector('.elements');


const validateProfile = new FormValidator(config, formUser);
const validateCards = new FormValidator(config, formElement);


validateProfile.enableValidation();
validateCards.enableValidation();
validateProfile.toggleButtonState();
validateCards.toggleButtonState();


function handleOpenPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupKeyDown);
};


function handleClosePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupKeyDown);
};


function addNewElement (cardElement) {
  gallery.prepend(cardElement);
}


function handleSubmitUser(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameChange.textContent = nameInput.value;
  jobChange.textContent = jobInput.value;
  handleClosePopup(popupUser);
};


function handleOpenView(image, text) {
  popupImage.src = image;
  popupImage.alt = text;
  popupDescription.textContent = text;
  handleOpenPopup(popupView);
}


function handleSubmitElement(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardData = {
    name: nameElement.value,
    link: srcElement.value
  }
  const newCard = new Card(cardData, handleOpenView);
  const cardElement = newCard.generateCard();
  addNewElement(cardElement);
  handleClosePopup(popupElement);
  validateProfile.toggleButtonState();
  validateCards.toggleButtonState();
}


function closePopupKeyDown(evt) {
  if (evt.key === 'Escape') {
    const whichOpenedPopup = document.querySelector('.popup_opened');
    handleClosePopup(whichOpenedPopup);
  }
}


formElement.addEventListener('submit', handleSubmitElement);

popupElementOpen.addEventListener('click', () => {
  handleOpenPopup(popupElement)
  formElement.reset();
  btnSubmitElement.disabled = true;
});

popupElementClose.addEventListener('click', () => {
  handleClosePopup(popupElement)
});


popupViewClose.addEventListener('click', () => {
  handleClosePopup(popupView)
});


overlayPopup.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      handleClosePopup(popup);
    }
  });
})


formUser.addEventListener('submit', handleSubmitUser);

popupUserOpen.addEventListener('click', () => {
  nameInput.value = nameChange.textContent
  jobInput.value = jobChange.textContent
  handleOpenPopup(popupUser)
});

popupUserClose.addEventListener('click', () => {
  handleClosePopup(popupUser)
});

initialCards.forEach((initialCards) => {
  const card = new Card(initialCards, handleOpenView);
  const cardElement = card.generateCard();
  gallery.append(cardElement);
});
