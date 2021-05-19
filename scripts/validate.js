const hideInputError = (formSelector, inputSelector, config) => {
  // скрыть текст ошибки
  // найти элемент с текстом ошибки
  const { inputErrorClass, errorClass } = config;
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}


const showInputError = (formSelector, inputSelector, config) => {
  // показать текст ошибки
  const { inputErrorClass, errorClass } = config;
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = inputSelector.validationMessage;
  errorElement.classList.add(errorClass);
}


const checkInputValidity = (formSelector, inputSelector, config) => {
  // проверка инпута на валидность
  if (inputSelector.validity.valid) {
    hideInputError(formSelector, inputSelector, config);
  } else {
    showInputError(formSelector, inputSelector, config);
  }
  // если валидно, то скрыть текст с ошибкой, в противном случае — показать
}


const hazInvalidInput = (inputList) => {
  return inputList.some(inputSelector => !inputSelector.validity.valid);
}


const toggleButtonState = (buttonElement, inputList) => {
  // если валидно, то активировать кнопку отправки, в противном случае — деактивировать
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}


const setEventListeners = (formSelector, config) => {
  // отмена стандартной отправки формы
  const { inputSelector, submitButtonSelector, ...restConfig } = config;

  formSelector.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // найти все инпуты
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));

  // найти кнопку отправки формы
  const buttonElement = formSelector.querySelector(submitButtonSelector);

  // добавить слушатели на все инпуты
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      // проверка на валидность
      checkInputValidity(formSelector, inputSelector, restConfig);
      toggleButtonState(buttonElement, inputList);
    });
  })

  // проверка при загрузке страницы
  toggleButtonState(buttonElement, inputList);
}


const enableValidation = ({ formSelector, ...restConfig }) => {
  // найти все формы
  const formList = Array.from(document.querySelectorAll(formSelector));

  // добавить слушатели на все формы
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, restConfig);
  })
};
