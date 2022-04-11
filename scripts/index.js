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
const cardPopup = document.querySelector('.popup_type_card');
const inputPictureName = cardPopup.querySelector('#picture-name');
const inputPictureLink = cardPopup.querySelector('#picture-link');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type_profile');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close-button');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');

const inputName = profilePopup.querySelector('#name');
const inputAbout = profilePopup.querySelector('#about-person');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

// Создание карточки из шаблона
function createCard(name, link) {
  const cardTemplate = document.querySelector('.template-element');
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const cardName = card.querySelector('.element__name');
  const cardImage = card.querySelector('.element__image');
  cardName.textContent = name;
  cardImage.src = link;
  deleteButton.addEventListener('click', handleRemoveCard);
  return card;
}

// Хэндлер удаления карточки
function handleRemoveCard(evt) {
  evt.target.closest('.element').remove();
}

// 
function loadInitialCards() {
  initialCards.forEach(function (item) {
    const newCard = createCard(item.name, item.link);
    sectionElements.append(newCard);
  })
}

// Хэндлер открытия окна popupProfile
function handleOpenProfilePopup() {
  profilePopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

// Функция закрытия окна ProfilePopup
function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function handleCloseProfilePopup() {
  closeProfilePopup();
}

// Функция сохранения данных профиля
function handleSaveProfile(event) {
  event.preventDefault();
  
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeProfilePopup();
}

// Функция открытия окна cardPopup
function handleOpenCardPopup() {
  cardPopup.classList.add('popup_opened');
  inputCardName.value = '';
  inputPictureLink.value = '';
}

// Функция закрытия окна cardPopup
function closeCardPopup() {
  cardPopup.classList.remove('popup_opened');
}

function handleCloseCardPopup() {
  closeCardPopup();
}

// Функция сохранения карточки
function handleSaveCard(event) {
  event.preventDefault();
  const newCard = createCard(inputPictureName.value, inputPictureLink.value);
  sectionElements.append(newCard);
  closeCardPopup();
}

editButton.addEventListener('click', handleOpenProfilePopup);
closeProfilePopupButton.addEventListener('click', handleCloseProfilePopup);
profilePopupForm.addEventListener('submit', handleSaveProfile);
addButton.addEventListener('click', handleOpenCardPopup);
closeCardPopupButton.addEventListener('click', handleCloseCardPopup);
cardPopupForm.addEventListener('submit', handleSaveCard);


loadInitialCards();