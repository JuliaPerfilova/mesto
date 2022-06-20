export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    };
  }

  setUserInfo({ name, about, _id}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._id = _id;
  }

  setAvatarLink(link) {
    this._profileAvatar.src = link;
  }
}