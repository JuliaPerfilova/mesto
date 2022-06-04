import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
   
    this._imageName = this._popup.querySelector('.popup__image-title');
    this._imageLink = this._popup.querySelector('.popup__image');
  }

  open({ name, link }) {
    this.imageName.alt = name;
    this._imageName.textcontent = name;
    this._imageLink.src = link;
    super.open();
  }
}