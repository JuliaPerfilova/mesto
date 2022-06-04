import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import {initialCards, config} from "../utils/constants.js";


const sectionElements = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();
const cardFormPopup = new PopupWithForm('.popup_type_card', (data) => {
  const newCard = createCard(data, config.cardSelector);
  sectionElements.prepend(newCard);
});
cardFormPopup.setEventListeners();
const profileFormPopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });


profileFormPopup.setEventListeners();

// Создание карточки из шаблона
const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector, () => {
    imagePopup.open(data);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция загрузки карточек из массива на сайт
const loadInitialCards = () => {
  const newCards = initialCards.map(item => createCard(item, config.cardSelector));
  sectionElements.append(...newCards);
};

// Хэндлер открытия окна popupProfile
const handleOpenProfilePopup = ()  => {
  const { name, about } = userInfo.getUserInfo();
  inputProfileName.value = name;
  inputProfileAbout.value = about;
  profileFormPopup.open();
};

// Функция открытия окна cardPopup
const handleOpenCardPopup = () => {
  cardFormPopup.open();
};

// Listeners
profileEditButton.addEventListener('click', handleOpenProfilePopup);
cardAddButton.addEventListener('click', handleOpenCardPopup);


loadInitialCards();