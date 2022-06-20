import Popup from "./Popup";

export default class ConfirmationPopup  extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = document.querySelector('.popup__confirm-button');
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._action();
      super.close();
    });
    super.setEventListeners();
  }

  open(action) {
    this._action = action;
    super.open();
  }
}