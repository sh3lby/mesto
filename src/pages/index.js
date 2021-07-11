import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  config,
  popupUserOpen,
  popupUser,
  formUser,
  popupElementOpen,
  popupElement,
  formElement,
  nameInput,
  aboutInput,
  popupAvatarOpen,
  popupAvatar,
  formAvatar } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';




const editProfile = new FormValidator(config, formUser);
const addCards = new FormValidator(config, formElement);
const addAvatar = new FormValidator(config, formAvatar);

const popupEditProfile = new PopupWithForm('#popup-user', handleSubmitUser);
const popupAddCard = new PopupWithForm('#popup-element', handleSubmitElement);
const popupEditAvatar = new PopupWithForm('#popup-avatar', handleSubmitAvatar);

const popupDeleteCard = new PopupWithDelete('#popup-delete', handleDeleteElement);

const popupImage = new PopupWithImage('#popup-view');

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




function handleSubmitUser(evt) {
  evt.preventDefault();
  renderLoading(true, popupUser);
  updateUserInfo();
};

function handleSubmitAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  updateAvatar();
  addAvatar.toggleButtonState();
}

function handleSubmitElement(evt) {
  evt.preventDefault();
  renderLoading(true, popupElement);
  addNewCard();
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
  popupDeleteCard.openPopup();
  popupDeleteCard.deleteEventListener(card, cardId);
};


function renderError(err) {
  res.textContent = '';
  error.textContent = err;
}

function initialDataFromServer() {
  Promise.all([api.tokenUsers(), api.getCardsFromServer()])
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
  api.deleteCardFromServer(cardId)
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .then(() => {
    card.deleteElement();
    popupDeleteCard.closePopup()
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

function updateAvatar() {
  api.updateAvatarOnServer(config.inputLinkAvatar)
  .then((res) => {
    userInfo.setAvatar(res);
    popupEditAvatar.closePopup();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, popupAvatar);
  });
}

function addNewCard() {
  api.addNewCardOnServer(config.inputTitlePlace, config.inputLinkPlace)
  .then(res => {
    addSection.addItem(renderCard(res, res.owner));
    popupAddCard.closePopup();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, popupElement);
  });
}

function updateUserInfo() {
  api.updateUserInfoOnServer(config.inputInfoName, config.inputInfoJob)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupEditProfile.closePopup();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, popupUser);
  });
}

function renderLoading(isLoading, popup) {
  if (isLoading) {
    popup.querySelector(config.submitButtonSelector).textContent = "Загрузка...";
  } else {
    if (popup === popupUser) {
      popup.querySelector(config.submitButtonSelector).textContent = "Сохранить";
    } else {
      popup.querySelector(config.submitButtonSelector).textContent = "Создать";
    }
  }
}

popupUserOpen.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  editProfile.toggleButtonState();
  popupEditProfile.openPopup();
  editProfile.clearValidation()
});


popupElementOpen.addEventListener('click', () => {
  addCards.toggleButtonState();
  popupAddCard.openPopup();
  addCards.clearValidation()
});


popupAvatarOpen.addEventListener('click', function() {
  addAvatar.toggleButtonState();
  popupEditAvatar.openPopup();
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
