export default class Card {
  constructor({ name, link, likeCount, iLiked, cardId, createdByMe }, cardSelector, handleCardClick, handleLikeButtonClick, handleRemoveCard) {
    this._name = name;
    this._link = link;
    this._likeCount = likeCount;
    this._cardSelector = cardSelector;
    this._iLiked = iLiked;
    this._cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleRemoveCard = handleRemoveCard;
    this._createdByMe = createdByMe;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _enableLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _disableLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  /*_handleRemoveCard(event) {
    event.target.closest('.element').remove();
  };*/
  
  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
  }

  _checkILiked() {
    if(this._iLiked) {
      this._enableLike();
    } else {
      this._disableLike();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__delete-button');
    const cardName = this._element.querySelector('.element__name');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardLikes = this._element.querySelector('.element__like-counter');
    this._likeButton = this._element.querySelector('.element__like-button');

    cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likeCount;

    this._checkILiked();

    this._setEventListeners();
    if (!this._createdByMe) {
      this._deleteButton.style.display = 'none';
    }
    
    
    return this._element;
  }

  getILiked() {
    return  this._iLiked;
  }

  getId() {
    return this._cardId;
  }

  setLikeCount(count) {
    this._cardLikes.textContent = count;
  }

  setILiked(value) {
    this._iLiked = value;
    this._checkILiked();
  }

  remove() {
    this._element.remove();
    }
  }