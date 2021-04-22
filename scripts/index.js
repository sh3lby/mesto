let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let nameChange = document.querySelector('.profile__name');
let jobChange = document.querySelector('.profile__job');


function Popup() {
  popup.classList.toggle('popup_opened')
  nameInput.value = nameChange.textContent;
  jobInput.value = jobChange.textContent;
};


function formSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameChange.textContent = nameInput.value;
  jobChange.textContent = jobInput.value;
  Popup();
};

popupOpenButton.addEventListener('click', Popup);
popupCloseButton.addEventListener('click', Popup);
formElement.addEventListener('submit', formSubmit);
