const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const sectionElements = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close-button');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

const cardPopup = document.querySelector('.popup_type_card');
const inputPictureName = cardPopup.querySelector('#picture-name');
const inputPictureLink = cardPopup.querySelector('#picture-link');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const closeImagePopupButton = imagePopup.querySelector('.popup__close-button');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-title');

// Создание карточки из шаблона
function createCard(name, link) {
  const cardTemplate = document.querySelector('.template-element');
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const cardName = card.querySelector('.element__name');
  const cardImage = card.querySelector('.element__image');
  const likeButton = card.querySelector('.element__like-button');
  cardName.textContent = name;
  cardImage.src = link;
  deleteButton.addEventListener('click', handleRemoveCard);
  cardImage.addEventListener('click', handleOpenImagePopup);
  likeButton.addEventListener('click', handleLikeButtonClick);
  return card;
}

// Функция загрузки карточек из массива на сайт
function loadInitialCards() {
  const newCards = initialCards.map(item => createCard(item.name, item.link));
  sectionElements.append(...newCards);
}

// Хэндлер удаления карточки
function handleRemoveCard(event) {
  event.target.closest('.element').remove();
}

// Функция закрытия окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Хэндлер открытия окна popupProfile
function handleOpenProfilePopup() {
  profilePopup.classList.add('popup_opened');
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

// Функция сохранения данных профиля
function handleSaveProfile(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(profilePopup);
}

// Функция открытия окна cardPopup
function handleOpenCardPopup() {
  cardPopup.classList.add('popup_opened');
  inputPictureName.value = '';
  inputPictureLink.value = '';
}
// Хэндлер закрытия окна
function handleClosePopup(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

// Функция сохранения карточки
function handleSaveCard(event) {
  event.preventDefault();
  const newCard = createCard(inputPictureName.value, inputPictureLink.value);
  sectionElements.prepend(newCard);
  closePopup(cardPopup);
}

// Функция открытия картинки из превью
function handleOpenImagePopup(event) {
  imagePopup.classList.add('popup_opened');
  popupImageName.textContent = event.target.closest('.element').querySelector('.element__name').textContent;
  popupImage.src = event.target.src;
}

// Лайки
function handleLikeButtonClick(event) {
  event.target.classList.toggle('element__like-button_active'); 
}

// Listeners
editButton.addEventListener('click', handleOpenProfilePopup);
profilePopupForm.addEventListener('submit', handleSaveProfile);
addButton.addEventListener('click', handleOpenCardPopup);
cardPopupForm.addEventListener('submit', handleSaveCard);

closeProfilePopupButton.addEventListener('click', handleClosePopup);
closeCardPopupButton.addEventListener('click', handleClosePopup);
closeImagePopupButton.addEventListener('click', handleClosePopup);


loadInitialCards();