import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  config,
  popupUserOpen,
  formUser,
  popupElementOpen,
  formElement,
  nameInput,
  aboutInput,
  popupAvatarOpen,
  formAvatar } from '../utils/constants.js';
import {
  renderError,
  renderLoading } from '../utils/utils.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const editProfile = new FormValidator(config, formUser);
const addCards = new FormValidator(config, formElement);
const addAvatar = new FormValidator(config, formAvatar);

const popupEditProfile = new PopupWithForm(config.popupUser, handleSubmitUser);
const popupAddCard = new PopupWithForm(config.popupElement, handleSubmitElement);
const popupEditAvatar = new PopupWithForm(config.popupAvatar, handleSubmitAvatar);

const popupDeleteCard = new PopupWithDelete(config.popupDelete, handleDeleteElement);

const popupImage = new PopupWithImage(config.popupView);

const userInfo = new UserInfo(config);

const addSection = new Section({
  renderer: (item, userId) => {
    addSection.addItem(renderCard(item, userId));
  }
},
  config.elements
);

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '4569b017-7a4b-43ca-8bb4-b1e74d9aed2a',
    'Content-Type': 'application/json'
  }
});

function handleSubmitUser(evt, data) {
  evt.preventDefault();
  renderLoading(true, config.popupUser);
  updateUserInfo(data);
};

function handleSubmitAvatar(evt, data) {
  evt.preventDefault();
  renderLoading(true, config.popupAvatar);
  updateAvatar(data);
  addAvatar.toggleButtonState();
}

function handleSubmitElement(evt, data) {
  evt.preventDefault();
  renderLoading(true, config.popupElement);
  addNewCard(data);
  addCards.toggleButtonState();
}

function renderCard(item, userId) {
  const card = new Card(
    item,
    '#add-element',
    handleCardClick,
    likeCard,
    dislikeCard,
    buttonDeleteCard,
    userId);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  popupImage.openPopup(name, link);
}

function handleDeleteElement(evt, card, cardId) {
  evt.preventDefault();
  deleteServerCard(card, cardId);
}

function buttonDeleteCard(card, cardId) {
  popupDeleteCard.open();
  popupDeleteCard.deleteEventListener(card, cardId);
};

function initialDataFromServer() {
  Promise.all([api.getUserInfo(), api.getCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    userInfo.setAvatar(res[0]);
    addSection.renderItems(res[1].reverse(), res[0]);
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
}

function deleteServerCard(card, cardId) {
  api.deleteCard(cardId)
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .then(() => {
    card.deleteElement();
    popupDeleteCard.close()
  });
}

function likeCard(likeId) {
  api.likeCards(likeId)
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  });
}

function dislikeCard(likeId) {
  api.dislikeCards(likeId)
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  });
}

function updateAvatar(data) {
  api.updateAvatar( {avatar: data.avatar} )
  .then((res) => {
    userInfo.setAvatar(res);
    popupEditAvatar.close();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, config.popupAvatar);
  });
}

function addNewCard(data) {
  api.createCard( {name: data.name, link: data.link} )
  .then(res => {
    addSection.addItem(renderCard(res, res.owner));
    popupAddCard.close();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, config.popupElement);
  });
}

function updateUserInfo(data) {
  api.updateUserInfo( {name: data.name, about: data.about} )
  .then((res) => {
    userInfo.setUserInfo(res);
    popupEditProfile.close();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, config.popupUser);
  });
}

popupUserOpen.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  editProfile.toggleButtonState();
  popupEditProfile.open();
  editProfile.clearValidation()
});

popupElementOpen.addEventListener('click', () => {
  addCards.toggleButtonState();
  popupAddCard.open();
  addCards.clearValidation()
});

popupAvatarOpen.addEventListener('click', function() {
  addAvatar.toggleButtonState();
  popupEditAvatar.open();
  addAvatar.clearValidation()
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
popupImage.setEventListeners();

addCards.enableValidation();
editProfile.enableValidation();
addAvatar.enableValidation();

initialDataFromServer();
