import Popup from "./Popup";

export default class ConfirmationPopup  extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = document.querySelector('.popup__confirm-button');
  }

  open(action) {
    this._confirmButton.addEventListener('click', () => {
      action();
      super.close();
    });
    super.open();
  }
}