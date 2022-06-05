export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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