import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, config} from "../utils/constants.js";
import './index.css';


const sectionElements = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

// Попапы
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
profileFormPopup.setEventListeners();

// Информация о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });

// Создание карточки из шаблона
const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector, () => {
    imagePopup.open(data);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cards = new Section(
  { data: initialCards, renderer: (item) => { return createCard(item, config.cardSelector)} },
  '.elements'
);
cards.renderItems();

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
