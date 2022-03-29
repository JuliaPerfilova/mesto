const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const editWindowClose = popup.querySelector('.popup__close-button');

function togglePopup(event) {
 /* console.log("Target         : " + event.target.classList);
    console.log("Current target : " + event.currentTarget.classList); */
  if (event.target === event.currentTarget) {
    popup.classList.toggle('popup_opened');
  }
}
editButton.addEventListener('click', togglePopup);
editWindowClose.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);


const likeButton = document.querySelector('.element__like-button');

function toggleLikeButton() {
  likeButton.classList.toggle('element__like-button_active');
}
likeButton.addEventListener('click', toggleLikeButton);

const submitButton = popup.querySelector('.popup__save-button');
const inputName = popup.querySelector('#name');
const inputAbout = popup.querySelector('#about-person');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

function saveProfile(event) {
  event.preventDefault();
  
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove('popup_opened');
}
submitButton.addEventListener('click', saveProfile);
