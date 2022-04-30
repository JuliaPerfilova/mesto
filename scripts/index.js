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
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

const cardPopup = document.querySelector('.popup_type_card');
const inputPictureName = cardPopup.querySelector('#picture-name');
const inputPictureLink = cardPopup.querySelector('#picture-link');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-title');
const popups = Array.from(document.querySelectorAll('.popup'));

const cardTemplate = document.querySelector('.template-element');
let currentPopup;

// Создание карточки из шаблона
function createCard(name, link) {
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const cardName = card.querySelector('.element__name');
  const cardImage = card.querySelector('.element__image');
  const likeButton = card.querySelector('.element__like-button');
  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  deleteButton.addEventListener('click', handleRemoveCard);
  cardImage.addEventListener('click', () => handleCardClick(name, link));
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
  document.removeEventListener('keydown', handlerKeyPress);
  console.log('отписалась');
}

// Функция открытия окна
function openPopup(popup) {
  currentPopup = popup;
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerKeyPress);
  console.log('подписалась');
}

// Функция закрытия попапа нажатием на Esc
function handlerKeyPress(evt) {
  if (evt.key === "Escape")  {
    closePopup(currentPopup);
  }
}


// Хэндлер открытия окна popupProfile
function handleOpenProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
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
  openPopup(cardPopup);
  inputPictureName.value = '';
  inputPictureLink.value = '';
}
// Хэндлер закрытия окна
function handleClosePopup(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

// Закрытие окна нажатием на оверлей
function togglePopup(event) { 
  if (event.target === event.currentTarget) {
    event.target.classList.toggle('popup_opened'); 
  }
}

// Функция сохранения карточки
function handleSaveCard(event) {
  event.preventDefault();
  const newCard = createCard(inputPictureName.value, inputPictureLink.value);
  sectionElements.prepend(newCard);
  closePopup(cardPopup);
}

// Функция открытия картинки из превью
function handleCardClick(name, link) {
  openPopup(imagePopup);
  popupImageName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

// Лайки
function handleLikeButtonClick(event) {
  event.target.classList.toggle('element__like-button_active'); 
}

// Listeners
profileEditButton.addEventListener('click', handleOpenProfilePopup);
profilePopupForm.addEventListener('submit', handleSaveProfile);
cardAddButton.addEventListener('click', handleOpenCardPopup);
cardPopupForm.addEventListener('submit', handleSaveCard);

profilePopupCloseButton.addEventListener('click', handleClosePopup);
cardPopupCloseButton.addEventListener('click', handleClosePopup);
imagePopupCloseButton.addEventListener('click', handleClosePopup);
popups.forEach((element) => {element.addEventListener('click', togglePopup)});


loadInitialCards();