const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const inputName = popup.querySelector('#name');
const inputAbout = popup.querySelector('#about-person');
const popupForm = popup.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

// Функция открытия окна Popup
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

// Функция закрытия окна Popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Функция сохранения данных
function saveProfile(event) {
  event.preventDefault();
  
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfile);
