import {openPopup} from "./popup.js";

const imagePopup = document.querySelector('.popup_type_image');
const popupImageName = imagePopup.querySelector('.popup__image-title');
const popupImage = imagePopup.querySelector('.popup__image');

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
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
    openPopup(imagePopup);
    popupImageName.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
  };

  _handleLikeButtonClick(event) {
    event.target.classList.toggle('element__like-button_active'); 
  };
  
  _setEventListeners(cardImage) {
    const deleteButton = this._element.querySelector('.element__delete-button');
    const likeButton = this._element.querySelector('.element__like-button');
    deleteButton.addEventListener('click', (event) => this._handleRemoveCard(event));
    cardImage.addEventListener('click', () => this._handleCardClick());
    likeButton.addEventListener('click', (event) => this._handleLikeButtonClick(event));
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardName = this._element.querySelector('.element__name');
    const cardImage = this._element.querySelector('.element__image');
    cardName.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setEventListeners(cardImage);
    return this._element;
  }
}