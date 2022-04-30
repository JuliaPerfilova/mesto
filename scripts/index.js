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
const profilePopupForm = profilePopup.querySelector('.popup__form');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

const cardPopup = document.querySelector('.popup_type_card');
const inputPictureName = cardPopup.querySelector('#picture-name');
const inputPictureLink = cardPopup.querySelector('#picture-link');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-title');
const cardTemplate = document.querySelector('.template-element');

let currentPopup;

// Создание карточки из шаблона
const createCard = (name, link) => {
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
};

// Функция загрузки карточек из массива на сайт
const loadInitialCards = () => {
  const newCards = initialCards.map(item => createCard(item.name, item.link));
  sectionElements.append(...newCards);
};

// Хэндлер удаления карточки
const handleRemoveCard = (event) => {
  event.target.closest('.element').remove();
};

// Функция закрытия окна
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyPress);
};

// Функция открытия окна
const openPopup = (popup) => {
  currentPopup = popup;
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyPress);
};

// Функция закрытия попапа нажатием на Esc
const handleKeyPress = (event) => {
  if (event.key === "Escape")  {
    closePopup(currentPopup);
  }
};

// Хэндлер открытия окна popupProfile
const handleOpenProfilePopup = ()  => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
};

// Функция сохранения данных профиля
const handleSaveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(profilePopup);
};

// Функция открытия окна cardPopup
const handleOpenCardPopup = () => {
  openPopup(cardPopup);
  inputPictureName.value = '';
  inputPictureLink.value = '';
};

// Хэндлер закрытия окна
const handleClosePopup = (event) => {
  const popup = event.target.closest('.popup');
  closePopup(popup);
};

// Закрытие окна нажатием на оверлей
const handlePopupClick = (event) => {
  if (event.target === event.currentTarget) {
    event.target.classList.toggle('popup_opened'); 
  }
};

// Функция сохранения карточки
const handleSaveCard = (event) => {
  event.preventDefault();
  const newCard = createCard(inputPictureName.value, inputPictureLink.value);
  sectionElements.prepend(newCard);
  closePopup(cardPopup);
};

// Функция открытия картинки из превью
const handleCardClick = (name, link) => {
  openPopup(imagePopup);
  popupImageName.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
};

// Лайки
const handleLikeButtonClick = (event) => {
  event.target.classList.toggle('element__like-button_active'); 
};

// Listeners
profileEditButton.addEventListener('click', handleOpenProfilePopup);
profilePopupForm.addEventListener('submit', handleSaveProfile);
cardAddButton.addEventListener('click', handleOpenCardPopup);
cardPopupForm.addEventListener('submit', handleSaveCard);

Array.from(document.querySelectorAll('.popup__close-button')).forEach((element) => {element.addEventListener('click', handleClosePopup)});

Array.from(document.querySelectorAll('.popup')).forEach((element) => {element.addEventListener('click', handlePopupClick)});


loadInitialCards();