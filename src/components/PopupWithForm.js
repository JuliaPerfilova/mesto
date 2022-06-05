import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {config} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(config.formSelector);
    this._submitForm = submitForm;
    const formValidator = new FormValidator(config, this._form);
    formValidator.enableValidation();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    const formValues = {};
  
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
  
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
    const formValidator = new FormValidator(config, this._form);
    formValidator.resetForm();
  }
}