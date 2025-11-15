// Initial cards data
let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//Handlers
const handleOpenEditModal = () => {
  fillProfileForm();
  openModal(profileModal);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
};

const handleOpenCardModal = () => {
  openModal(cardModal);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNameInput = cardModal.querySelector(".popup__input_type_card-name");
  const cardLinkInput = cardModal.querySelector(".popup__input_type_card-url");
  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    document.querySelector(".cards__list")
  );
  closeModal(cardModal);
  evt.target.reset();
};

const handlerCardLikeBtn = (btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("card__like-button_is-active");
  });
};

const handlerDeleteCardBtn = (btn, card) => {
  btn.addEventListener("click", () => {
    card.remove();
  });
};

const handlerImageClick = (image) => {
  image.addEventListener("click", () => {
    imagePicture.src = image.src;
    imagePicture.alt = image.alt;
    imageCaption.textContent = image.alt;
    openModal(imageModal);
  });
};

//Card Template
const cardTemplate = document.querySelector("#card-template").content;

//Image Modal
const imageModal = document.querySelector("#image-popup");
const imagePicture = imageModal.querySelector(".popup__image");
const imageCaption = imageModal.querySelector(".popup__caption");
const imageCloseBtn = imageModal.querySelector(".popup__close");

//Card - Functions
const getCardElement = (
  name = "Sin título",
  link = "./images/placeholder.jpg"
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  handlerCardLikeBtn(cardLikeButton);
  handlerDeleteCardBtn(cardDeleteButton, cardElement);
  handlerImageClick(cardImage);
  return cardElement;
};

const renderCard = (name, link, container) => {
  container.prepend(getCardElement(name, link));
};

//Render Initial Cards
initialCards.forEach(function (card) {
  const cardsList = document.querySelector(".cards__list");
  renderCard(card.name, card.link, cardsList);
});

//Profile Edit Modal
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-popup");
const profileCloseBtn = profileModal.querySelector(".popup__close");

const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

const profileForm = profileModal.querySelector(".popup__form");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

//Card Modal
const cardAddBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#new-card-popup");
const cardCloseBtn = cardModal.querySelector(".popup__close");

const cardForm = cardModal.querySelector(".popup__form");

//Modals - Functions
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};

//Profile - Functions
const fillProfileForm = () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal();
});

profileCloseBtn.addEventListener("click", () => {
  closeModal(profileModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardAddBtn.addEventListener("click", () => {
  handleOpenCardModal();
});

cardCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

cardForm.addEventListener("submit", handleCardFormSubmit);

imageCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});
