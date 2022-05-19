let currentPopup;

export const openPopup = (popup) => {
  currentPopup = popup;
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyPress);
};

export const closePopup = () => {
  currentPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyPress);
};

export const handlePopupClick = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    closePopup();
  }
};

export const handleKeyPress = (event) => {
  if (event.key === "Escape")  {
    closePopup();
  }
};