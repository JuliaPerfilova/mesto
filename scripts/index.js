import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {handlePopupClick, closePopup, openPopup} from "./popup.js";

const config = {
  cardSelector: '.template-element',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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


// Создание карточки из шаблона
const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция загрузки карточек из массива на сайт
const loadInitialCards = () => {
  const newCards = initialCards.map(item => createCard(item, config.cardSelector));
  sectionElements.append(...newCards);
};

// Функция открытия окна, содержащего инпуты
const openPopupWithInputs = (popup) => {
  const formElement = popup.querySelector(config.formSelector);
  const formValidator = new FormValidator(config, formElement);
  formValidator.resetForm();
  openPopup(popup);
};

// Хэндлер открытия окна popupProfile
const handleOpenProfilePopup = ()  => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopupWithInputs(profilePopup);
};

// Функция сохранения данных профиля
const handleSaveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup();
};

// Функция открытия окна cardPopup
const handleOpenCardPopup = () => {
  cardPopupForm.reset();
  openPopupWithInputs(cardPopup);
};

// Функция сохранения карточки
const handleSaveCard = (event) => {
  event.preventDefault();
  const cardData = {
    name: inputPictureName.value, 
    link: inputPictureLink.value
  };
  const newCard = createCard(cardData, config.cardSelector);
  sectionElements.prepend(newCard);
  closePopup();
};

// Listeners
profileEditButton.addEventListener('click', handleOpenProfilePopup);
profilePopupForm.addEventListener('submit', handleSaveProfile);
cardAddButton.addEventListener('click', handleOpenCardPopup);
cardPopupForm.addEventListener('submit', handleSaveCard);

Array.from(document.querySelectorAll('.popup')).forEach((element) => {element.addEventListener('click', handlePopupClick)});


loadInitialCards();

Array.from(document.querySelectorAll(config.formSelector)).forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
});
