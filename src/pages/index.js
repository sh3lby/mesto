import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initial-cards.js';
import { config, popupUserOpen, formUser, popupElementOpen, formElement, nameInput, jobInput } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';



const editProfile = new FormValidator(config, formUser);
const addCards = new FormValidator(config, formElement);
const popupEditProfile = new PopupWithForm('#popup-user', handleSubmitUser);
const popupAddCard = new PopupWithForm('#popup-element', handleSubmitElement);
const popupImage = new PopupWithImage('#popup-view');
const userInfo = new UserInfo(config);


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

function handleCardClick(name, link) {
  popupImage.openPopup(name, link);
}


function handleSubmitUser(evt, data) {
  userInfo.setUserInfo(data);
  popupEditProfile.closePopup();
};



function handleSubmitElement(evt, data) {
  addSection.addItem(renderCard(data));
  popupAddCard.closePopup();
  addCards.toggleButtonState();
};




popupUserOpen.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfile.toggleButtonState();
  popupEditProfile.openPopup();
  editProfile.clearValidation()
});


popupElementOpen.addEventListener('click', () => {
  addCards.toggleButtonState();
  popupAddCard.openPopup();
  addCards.clearValidation()
});


addSection.renderItems();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
addCards.enableValidation();
editProfile.enableValidation();
