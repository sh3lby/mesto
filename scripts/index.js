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


const overlayPopup = Array.from(document.querySelectorAll('.popup'));

const elementTemplate = document.querySelector('#add-element');

const gallery = document.querySelector('.elements');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}


function handleOpenPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupKeyDown);
};


function handleClosePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupKeyDown);
};

// Пока плохо даются объекты, помечу для себя исправить функцию (1 аргумент — объект cardData)

function createElement (title, src) {
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const titleElement = newElement.querySelector('.element__title');
  const imageElement = newElement.querySelector('.element__image');

  titleElement.textContent = title;
  imageElement.alt = title;
  imageElement.src = src;

  newElement.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  });

  newElement.querySelector('.element__trash-button').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  imageElement.addEventListener('click', () => {
    handleOpenView(src, title);
  })

  return newElement;
}


function addNewElement (container, cardElement) {
  container.prepend(cardElement);
}


function handleSubmitUser(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameChange.textContent = nameInput.value;
  jobChange.textContent = jobInput.value;
  handleClosePopup(popupUser);
};


function handleSubmitElement(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addNewElement(gallery, createElement(nameElement.value, srcElement.value) );
  handleClosePopup(popupElement);
};


function handleOpenView(image, text) {
  popupImage.src = image;
  popupImage.alt = text;
  popupDescription.textContent = text;
  handleOpenPopup(popupView);
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
  //Разобраться и сделать функцию resetValidation в validate.js
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


enableValidation(config);
