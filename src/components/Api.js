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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res))
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._getServerData(res));
  }

  updateUserInfo(inputInfoName, inputInfoJob) {
    const name = document.querySelector(inputInfoName);
    const about = document.querySelector(inputInfoJob);

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name.value,
        about: about.value
      })
    })
    .then(res => this._getServerData(res))
  }

  createCard(inputTitlePlace, inputLinkPlace) {
    const name = document.querySelector(inputTitlePlace);
    const link = document.querySelector(inputLinkPlace);

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name.value,
        link: link.value,
      })
    })
    .then(res => this._getServerData(res));
  }

  deleteCard(cardId) {
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

  updateAvatar(infoAvatar) {
    const avatar = document.querySelector(infoAvatar);

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: avatar.value
      })
    })
    .then(res => this._getServerData(res))
  }
}
