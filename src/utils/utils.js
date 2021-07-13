import { config } from '../utils/constants.js';

export function renderError(err) {
  error.textContent = err;
}

export function renderLoading(isLoading, popup) {
  const popupSelector = document.querySelector(popup);
  if (isLoading) {
    popupSelector.querySelector(config.submitButtonSelector).textContent = "Загрузка...";
  } else {
    if (popup === config.popupUser) {
      popupSelector.querySelector(config.submitButtonSelector).textContent = "Сохранить";
    } else {
      popupSelector.querySelector(config.submitButtonSelector).textContent = "Создать";
    }
  }
}
