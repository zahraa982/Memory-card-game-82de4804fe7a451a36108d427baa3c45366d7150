//**-----Variables------**//
let time = 0;
let toggledCards = [];
let moves = 0;
let timerOut = true;
let timerId;
let opened = 0;
/**------------- Helper Funcations-------------**/
const toggleCard = (card) => {
  card.classList.toggle("open");
  card.classList.toggle("show");
};
//--------------------------------------
const addToggledCard = (clickTarget) => {
  toggledCards.push(clickTarget);
};

//**------------querySelector ------------**//

const deck = document.querySelector(".deck");
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//**----------------Matching----------------**//
const checkForMatch = () => {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle("match");
    toggledCards[1].classList.toggle("match");
    toggledCards = [];
    opened++;
    if (opened == 8) {
      winCondition();
    }
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
};
//**------------Vaildator------------------**//
const validClick = (clickTarget) => {
  return (
    clickTarget.classList.contains("card") &&
    !clickTarget.classList.contains("match") &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
};
//**------------Shuffle Function-----------------**//

const shuffling = () => {
  const itemsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  const shuffled = shuffle(itemsToShuffle);
  console.log(deck.appendChild(shuffled[0]));
  deck.appendChild(shuffled[0]);
  for (card of shuffled) {
    deck.appendChild(card);
  }
};
shuffling();
//**------------Score Checker----------**//
function score() {
  if (moves === 16 || moves === 24) {
    decStar();
  }
}
//**------------Star Remover----------**//
const decStar = () => {
  const starsList = document.querySelectorAll(".stars li");
  for (star of starsList) {
    if (star.style.display !== "none") {
      star.style.display = "none";
      break;
    }
  }
};
//**------------Timer----------**//
const initClock = () => {
  timerId = setInterval(() => {
    time++;
    timerCount();
  }, 1000);
};
const timerCount = () => {
  const timer = document.querySelector(".timer");
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerHTML = `${min}:0${sec}`;
  } else {
    timer.innerHTML = `${min}:${sec}`;
  }
};
//===================
const stopTimer = () => {
  clearInterval(timerId);
};
//**------------moveCounter----------**//
const moveAdd = () => {
  moves++;
  const moveCounter = document.querySelector(".move");
  console.log(`Moves:${moves}`);
  moveCounter.innerHTML = moves;
};
//**------------Modal------------**//
const modalToggle = () => {
  const modal = document.querySelector(".modal-background");
  modal.classList.toggle("hidder");
};
//**------------Count Stars ------------**//
const countStars = () => {
  starsList = document.querySelectorAll(".stars li");
  starsCount = 0;
  for (star of starsList) {
    if (star.style.display !== "none") {
      starsCount++;
    }
  }
  return starsCount;
};
//**------------ModalStats------------**//
const modalStats = () => {
  const timeStats = document.querySelector(".time-modal");
  const clockFinshed = document.querySelector(".timer").innerHTML;
  const movesStats = document.querySelector(".moves-modal");
  const starStats = document.querySelector(".stars-modal");
  const stars = countStars();

  timeStats.innerHTML = `Time = ${clockFinshed}`;
  movesStats.innerHTML = `Moves = ${moves + 1}`;
  starStats.innerHTML = `Stars = ${stars}`;
};

//**------------Reset Game------------**//

const gameReset = () => {
  timeReset();
  moveReset();
  starReset();
  shuffling();
  coverCards();
  opened = 0;
  toggledCards = [];
};
//============================
const timeReset = () => {
  stopTimer();
  timerOut = true;
  time = 0;
  timerCount();
};
//============================
const moveReset = () => {
  moves = 0;
  document.querySelector(".move").innerHTML = moves;
};
//============================
const starReset = () => {
  stars = 0;
  const starsList = document.querySelectorAll(".stars li");
  for (star of starsList) {
    star.style.display = "inline";
  }
};
//============================
const coverCards = () => {
  const cards = document.querySelectorAll(".deck li");
  for (let card of cards) {
    card.className = "card";
  }
};
//**-------------Win Condition------------- **//

if (opened == 8) {
  winCondition();
}

const winCondition = () => {
  stopTimer();
  modalToggle();
  modalStats();
};

//**------------- My event listener------------- **//
deck.addEventListener("click", (event) => {
  const clickTarget = event.target;
  if (validClick(clickTarget)) {
    if (timerOut) {
      initClock();
      timerOut = false;
    }
    toggleCard(clickTarget);
    addToggledCard(clickTarget);
    if (toggledCards.length === 2) {
      checkForMatch(clickTarget);
      moveAdd();
      score();
    }
  }
});
document.getElementById("close-btn").addEventListener("click", () => {
  modalToggle();
});
document.getElementById("Cancel").addEventListener("click", () => {
  modalToggle();
});
document.getElementById("replay-btn").addEventListener("click", () => {
  gameReset();
  modalToggle();
});

document.querySelector(".restart").addEventListener("click", () => {
  gameReset();
});