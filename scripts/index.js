const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const editWindowClose = popup.querySelector('.popup__close-button');

function togglePopup(event) {
 /* console.log("Target         : " + event.target.classList);
    console.log("Current target : " + event.currentTarget.classList); */
  if (event.target === event.currentTarget) {
    popup.classList.toggle('popup_is-active');
  }
}
editButton.addEventListener('click', togglePopup);
editWindowClose.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);
