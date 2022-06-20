//Импорты
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {config, apiOptions} from "../utils/constants.js";
import './index.css';
import FormValidator from "../components/FormValidator.js";
import Api from "../components/api.js";
import ConfirmationPopup from "../components/ConfirmationPopup.js";

//Константы
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const inputProfileName = profilePopup.querySelector('#name');
const inputProfileAbout = profilePopup.querySelector('#about-person');

const avatarEditButton = document.querySelector('.profile__avatar-overlay');
const avatarImage = document.querySelector('.profile__avatar-image');


//API
const api = new Api(apiOptions);

const cards = new Section(
  item => createCard(item, config.cardSelector),
  '.elements'
);


//Первоначальная загрузка карточек с сервера на сайт
const loadInitialCards = () => {
  api.getInitialCards()
  .then(result => {
    result.forEach(item => {
      cards.addItem({
        name: item.name,
        link: item.link,
        likeCount: item.likes.length,
        iLiked: item.likes.some(element => element._id === userInfo.getId()),
        cardId: item._id,
        createdByMe: item.owner._id === userInfo.getId()
      });
    })
  })
  .catch((err) => {
    console.log(err);
  });
}

// Информация о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar-image'});

//Загрузка информации пользователя
const loadMyProfile  = () => {
  api.getMyProfile()
  .then(result => {
    userInfo.setAvatarLink(result.avatar);
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Редактирование аватара
const avatarFormPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  api.updateAvatar(data.link)
  .then(result => {
    userInfo.setAvatarLink(result.avatar);
    avatarFormPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
avatarFormPopup.setEventListeners();

// Редактирование профиля
const profileFormPopup = new PopupWithForm('.popup_type_profile', (data) => {
  api.updateProfile(data)
  .then(result => {
    userInfo.setUserInfo(result);
    profileFormPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
profileFormPopup.setEventListeners();

// Добавление карточек на сервер
const cardFormPopup = new PopupWithForm(
  '.popup_type_card',
  (data) => {
    api.createCard(data)
    .then(result => {
      cards.addItem({
        name: result.name,
        link: result.link,
        likeCount: result.likes.length,
        iLiked: result.likes.some(element => element._id === userInfo.getId()),
        cardId: result._id,
        createdByMe: result.owner._id === userInfo.getId()
      });
      cardFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
);
cardFormPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// Создание попапа-подтверждения
const confirmationPopup = new ConfirmationPopup('.popup_type_confirmation');
confirmationPopup.setEventListeners();

// Создание карточки из шаблона
const createCard = (data, cardSelector) => {
  const card = new Card(
    data,
    cardSelector,
    
    // при клике на картинку
    () => {
      imagePopup.open(data);
    },
    // при нажатии на лайк
    () => {
      const showActualState = (result) => {
        const iLiked = result.likes.some(element => element._id === userInfo.getId());
        card.setILiked(iLiked);
        card.setLikeCount(result.likes.length);
      }
      if(card.getILiked()) {
        api.dislikeCard(card.getId())
        .then(result => {
          showActualState(result);
        })
      } else {
        api.likeCard(card.getId())
        .then(result => {
          showActualState(result);
        })
      }
    },
    // при нажатии на корзину
    () => {
      confirmationPopup.open(() => {
        api.removeCard(card.getId())
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Хэндлер открытия окна ProfilePopup
const handleOpenProfilePopup = ()  => {
  formValidators[ profileFormPopup.getFormName() ].resetForm();
  const { name, about } = userInfo.getUserInfo();
  inputProfileName.value = name;
  inputProfileAbout.value = about;
  profileFormPopup.open();
};

// Хэндлер открытия окна cardPopup
const handleOpenCardPopup = () => {
  formValidators[ cardFormPopup.getFormName() ].resetForm();
  cardFormPopup.open();
};

// Хэндлер открытия окна avatarPopup
const handleOpenAvatarPopup = () => {
  formValidators[ avatarFormPopup.getFormName() ].resetForm();
  avatarFormPopup.open();
};

// Listeners
profileEditButton.addEventListener('click', handleOpenProfilePopup);
cardAddButton.addEventListener('click', handleOpenCardPopup);
avatarEditButton.addEventListener('click', handleOpenAvatarPopup);


const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
loadInitialCards();
loadMyProfile();