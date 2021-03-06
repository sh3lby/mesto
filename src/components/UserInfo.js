export class UserInfo {
  constructor({ infoName, infoJob, infoAvatar }) {
    this._name = document.querySelector(infoName);
    this._about = document.querySelector(infoJob);
    this._avatar = document.querySelector(infoAvatar);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const about = this._about.textContent;
    const avatar = this._avatar.src
    const data = { name: name, about: about, avatar: avatar };
    return data;
  }

  setUserInfo(data) {
    if(data.name) {
      this._name.textContent = data.name;
    };
    if(data.about) {
      this._about.textContent = data.about;
    };
  }

  setAvatar(data) {
    if(data.avatar) {
      this._avatar.src = data.avatar;
    }
  }
}
