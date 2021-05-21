const hideInputError = (formElement, inputElement, config) => {
  // скрыть текст ошибки
  // найти элемент с текстом ошибки
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}


const showInputError = (formElement, inputElement, config) => {
  // показать текст ошибки
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}


const checkInputValidity = (formElement, inputElement, config) => {
  // проверка инпута на валидность
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
  // если валидно, то скрыть текст с ошибкой, в противном случае — показать
}


const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}


const toggleButtonState = (buttonElement, inputList) => {
  // если валидно, то активировать кнопку отправки, в противном случае — деактивировать
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}


const setEventListeners = (formElement, config) => {
  // отмена стандартной отправки формы
  const { inputSelector, submitButtonSelector, ...restConfig } = config;

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // найти все инпуты
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // найти кнопку отправки формы
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // добавить слушатели на все инпуты
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // проверка на валидность
      checkInputValidity(formElement, inputElement, restConfig);
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
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  })
};
