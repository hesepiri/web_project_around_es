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

//Functions for Card
const cardTemplate = document.querySelector("#card-template").content;

const getCardElement = (
  name = "Sin título",
  link = "./images/placeholder.jpg"
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  return cardElement;
};

const renderCard = (name, link, container) => {
  container.prepend(getCardElement(name, link));
};

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, document.querySelector(".cards__list"));
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

//Functions for modals
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};

//Functions for Profile
const fillProfileForm = () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

//Handlers`
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
  console.log(cardNameInput.value);
  console.log(cardLinkInput.value);
  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    document.querySelector(".cards__list")
  );
  closeModal(cardModal);
  evt.target.reset();
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
