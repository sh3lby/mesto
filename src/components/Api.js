export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type']
  }

  _getServerData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  tokenUsers() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res))
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res));
  }

  updateUserInfoOnServer(inputInfoName, inputInfoJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: document.querySelector(inputInfoName).value,
        about: document.querySelector(inputInfoJob).value
      })
    })
    .then(res => this._getServerData(res))
  }

  addNewCardOnServer(inputTitlePlace, inputLinkPlace) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: document.querySelector(inputTitlePlace).value,
        link: document.querySelector(inputLinkPlace).value,
      })
    })
    .then(res => this._getServerData(res));
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(res => this._getServerData(res))
  }

  likeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res))
  }

  dislikeCards(likeId) {
    return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res))
  }

  updateAvatarOnServer(infoAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: document.querySelector(infoAvatar).value
      })
    })
    .then(res => this._getServerData(res))
  }
}
