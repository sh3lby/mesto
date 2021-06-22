import '../index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initial-cards.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active',
  infoName: '.profile__name',
  infoJob: '.profile__job',
  elements: '.elements'
}




// Popup User

const popupUserOpen = document.querySelector('.profile__edit-button');
const formUser = document.querySelector('#form-user');


// Popup Element

const popupElementOpen = document.querySelector('.profile__add-button');
const formElement = document.querySelector('#form-element');
const btnSubmitElement = document.querySelector('#btn-submit-add-popup');


const editProfile = new FormValidator(config, formUser);
const addCards = new FormValidator(config, formElement);
const popupEditProfile = new PopupWithForm('#popup-user', handleSubmitUser);
const popupAddCard = new PopupWithForm('#popup-element', handleSubmitElement);
const popupImage = new PopupWithImage('#popup-view');
const userInfo = new UserInfo(config);
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;



const addSection = new Section({
  items: initialCards,
  renderer: (item) => {
    addSection.addItem(renderCard(item));
  }
},
  config.elements
);


function renderCard(item) {
  const card = new Card(item, '#add-element', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(cardImage) {
  popupImage.openPopup(cardImage);
}


function handleSubmitUser(evt, data) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userInfo.setUserInfo(data);
  popupEditProfile.closePopup();
};



function handleSubmitElement(evt, data) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addSection.addItem(renderCard(data));
  popupAddCard.closePopup();
  editProfile.toggleButtonState();
  addCards.toggleButtonState();
};




popupUserOpen.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfile.toggleButtonState();
  popupEditProfile.openPopup();
});


popupElementOpen.addEventListener('click', () => {
  popupAddCard.openPopup();
  formElement.reset();
  addCards.toggleButtonState();
});



addSection.renderItems();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
addCards.enableValidation();
editProfile.enableValidation();
addCards.toggleButtonState();
editProfile.toggleButtonState();
