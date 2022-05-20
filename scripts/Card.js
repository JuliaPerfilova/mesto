import {openPopup} from "./popup.js";

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._imagePopup = document.querySelector('.popup_type_image');
    this._popupImageName = this._imagePopup.querySelector('.popup__image-title');
    this._popupImage = this._imagePopup.querySelector('.popup__image');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _handleRemoveCard(event) {
    event.target.closest('.element').remove();
  };

  _handleCardClick() {
    openPopup(this._imagePopup);
    this._popupImageName.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
  };

  _handleLikeButtonClick(event) {
    event.target.classList.toggle('element__like-button_active'); 
  };
  
  _setEventListeners() {
    const deleteButton = this._element.querySelector('.element__delete-button');
    const likeButton = this._element.querySelector('.element__like-button');
    deleteButton.addEventListener('click', (event) => this._handleRemoveCard(event));
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    likeButton.addEventListener('click', (event) => this._handleLikeButtonClick(event));
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardName = this._element.querySelector('.element__name');
    this._cardImage = this._element.querySelector('.element__image');
    cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}