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


const elementTemplate = document.querySelector('#add-element');


const gallery = document.querySelector('.elements');


const initialCards = [
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1584047959799-e457aef6f80f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
  },
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1524&q=80'
  },
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1573455494057-12684d151bf4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=624&q=80'
  },
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1597913867093-da521e58fab5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
  },
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1581305193763-6e37659f6930?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
  },
  {
    name: 'Tokyo',
    link: 'https://images.unsplash.com/photo-1567085295755-3e2eb98e9db8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
  }
];


function handleOpenPopup(popup) {
  popup.classList.toggle('popup_opened');
};

function handleClosePopup(popup) {
  popup.classList.toggle('popup_opened');
};


function addElement (title, src) {
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
    handleOpenView(imageElement.src, titleElement.textContent);
  })

  return gallery.prepend(newElement);
}


initialCards.forEach((element) => {
  addElement(element.name, element.link);
});


function handleSubmitUser(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameChange.textContent = nameInput.value;
  jobChange.textContent = jobInput.value;
  handleClosePopup(popupUser);
};

formUser.addEventListener('submit', handleSubmitUser);

popupUserOpen.addEventListener('click', () => {
  nameInput.value = nameChange.textContent
  jobInput.value = jobChange.textContent
  handleOpenPopup(popupUser)
});

popupUserClose.addEventListener('click', () => {
  handleClosePopup(popupUser)
});


function handleSubmitElement(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addElement(nameElement.value, srcElement.value);
  handleClosePopup(popupElement);
};

formElement.addEventListener('submit', handleSubmitElement);

popupElementOpen.addEventListener('click', () => {
  handleOpenPopup(popupElement)
  formElement.reset();
});

popupElementClose.addEventListener('click', () => {
  handleClosePopup(popupElement)
});


function handleOpenView(image, text) {
  popupImage.src = image;
  popupDescription.textContent = text;
  handleOpenPopup(popupView);
}

popupViewClose.addEventListener('click', () => {
  handleClosePopup(popupView)
});
