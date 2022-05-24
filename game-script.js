const cardsContainer = document.querySelector(".cards-container");

let cards;
let firstCardId;
let secondCardId;
let hasFlippedCard = false;

/*CALL BACKS */
function flipCard(e) {
  const card = e.target.closest(".complete-card");
  if (card.classList.contains("flip")) return;
  card.classList.add("flip");

  setTimeout(() => {
    setAndUpdateCardsIds(card);
    checkCorrectCards();
  }, 1500);
  // setTimeout(checkCorrectCards, 2000);
}
/* HELPERS */

function setAndUpdateCardsIds(card) {
  if (!hasFlippedCard) {
    firstCardId = card.getAttribute("card-id");
    hasFlippedCard = true;
    return;
  }

  secondCardId = card.getAttribute("card-id");
  hasFlippedCard = false;
}

function checkCorrectCards() {
  if (!secondCardId) return;
  if (firstCardId != secondCardId) {
    const firstCard = getFlippedCardById(firstCardId);
    const secondCard = getFlippedCardById(secondCardId);
    [firstCard, secondCard].forEach((card) => {
      card.classList.remove("flip");
    });
  }

  resetCardsIds();
}

function getFlippedCardById(id) {
  let cardElement;
  updateCardsElements();
  cards.forEach((card) => {
    if (card.getAttribute("card-id") == id) cardElement = card;
  });
  return cardElement;
}

function updateCardsElements() {
  cards = document.querySelectorAll(".flip");
}
function resetCardsIds() {
  firstCardId = null;
  secondCardId = null;
}

function loadCardsElements() {
  cards = document.querySelectorAll(".complete-card");
}

/*GAME EVENT LISTENERS */

function listenToCards() {
  cards.forEach((card) =>
    card.addEventListener("click", (e) => {
      flipCard(e);
    })
  );
}
/*LEVELS EVENT LISTENERS */

window.addEventListener("load", function (e) {
  populateCardsContainer();
  loadCardsElements();
  updateCardsContainerStyleForDifficultLevel();
  listenToCards();
});
/*LEVEL RELATED FUNCTIONS  */

function updateCardsContainerStyleForDifficultLevel() {
  const level = location.hash.slice(1);
  if (!(level == "difficult")) return;

  cardsContainer.style.gridTemplateColumns = "repeat(8, 15rem)";
  cardsContainer.style.gridTemplateRows = "repeat(2, 15rem)";
}

function populateCardsContainer() {
  let numberOfCards = getNumberOfCardsBasedOnLevel();
  getNumberOfCardsBasedOnLevel();
  let id = 0;
  for (let i = 0; i < numberOfCards; i++) {
    do {
      id = Math.ceil((Math.random() * numberOfCards) / 2);
    } while (
      !(getNumberOfEqualCards(id) < 2) &&
      getTotalNumbersOfCards() <= numberOfCards
    );
    generateCardHTMLAndInsertInContainer(id);
  }
}

function getNumberOfCardsBasedOnLevel() {
  const level = location.hash.slice(1);
  let numberOfCards = 0;
  switch (level) {
    case "easy":
      numberOfCards = 8;

      break;
    case "medium":
      numberOfCards = 12;
      break;
    case "difficult":
      numberOfCards = 16;
  }
  return numberOfCards;
}

function generateCardHTMLAndInsertInContainer(cardId) {
  const html = `<div class="complete-card" card-id="${cardId}">
  <img
    src="champs/champ-${cardId}.jpg"
    alt="league-of-legends-logo"
    class="frontcard card"
  />
  <img src="https://yt3.ggpht.com/-AEerXPqHm3M/AAAAAAAAAAI/AAAAAAAAAAA/S8WpkwxItLQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" class="card backcard" alt="">   
</div>`;
  cardsContainer.insertAdjacentHTML("afterbegin", html);
}

function getNumberOfEqualCards(cardId) {
  return document.querySelectorAll(`[card-id='${cardId}']`).length;
}

function getTotalNumbersOfCards() {
  return document.querySelectorAll(".card-complete").length;
}
