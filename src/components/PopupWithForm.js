import Popup from "./Popup.js";
import {config} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(config.formSelector);
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
  
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
  
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this._submitButton.textContent = "Сохранение...";
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._submitButton.textContent = this._submitButtonText;
  }

  getFormName() {
    return this._form.getAttribute('name');
  }
}