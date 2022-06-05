export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._bindedHandler = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._bindedHandler);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._bindedHandler);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    console.log("Key pressed");
    if (event.key === "Escape")  {
      this.close();
    }
  }
}