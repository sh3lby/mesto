export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active',
  messageValidError: '.popup__input-error',
  popupUser:'#popup-user',
  infoName: '.profile__name',
  inputInfoName: '.popup__input_type_name',
  infoJob: '.profile__job',
  inputInfoJob: '.popup__input_type_job',
  popupAvatar: '#popup-avatar',
  infoAvatar: '.profile__image',
  popupElement: '#popup-element',
  inputTitlePlace: '.popup__input_type_name-place',
  inputLinkPlace: '.popup__input_type_src-link',
  inputLinkAvatar: '.popup__input_type_avatar',
  popupDelete: '#popup-delete',
  popupView: '#popup-view',
  elements: '.elements'
};

// Popup User

export const popupUserOpen = document.querySelector('.profile__edit-button');
export const formUser = document.querySelector('#form-user');

// Popup Element

export const popupElementOpen = document.querySelector('.profile__add-button');
export const formElement = document.querySelector('#form-element');

export const nameInput = formUser.elements.name;
export const aboutInput = formUser.elements.about;

// Popup Avatar

export const popupAvatarOpen = document.querySelector('.profile__image-edit-button');
export const formAvatar = document.querySelector('#edit-avatar');
