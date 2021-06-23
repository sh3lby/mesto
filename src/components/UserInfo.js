export class UserInfo {
  constructor({ infoName, infoJob }) {
    this._name = document.querySelector(infoName);
    this._job = document.querySelector(infoJob);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
