export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active',
  messageValidError: '.popup__input-error',
  infoName: '.profile__name',
  infoJob: '.profile__job',
  elements: '.elements'
}


// Popup User

export const popupUserOpen = document.querySelector('.profile__edit-button');
export const formUser = document.querySelector('#form-user');


// Popup Element

export const popupElementOpen = document.querySelector('.profile__add-button');
export const formElement = document.querySelector('#form-element');


export const nameInput = formUser.elements.name;
export const jobInput = formUser.elements.job;
