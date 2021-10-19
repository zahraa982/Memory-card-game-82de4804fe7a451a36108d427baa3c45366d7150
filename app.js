/*
let card = document.querySelectorAll('.card');
let openCards = [...card];
let move =0;
const starts = document.querySelectorAll('.stars li i');


 /*DISPLAY CARDS ....MATCHING
const displayCard = (e) => {
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
    e.target.classList.toggle('disabled');

    if(target.classList.contains('open')){
     openCards.push(e.target);
    }
    if(openCards.length==2){
        setTimeout(()=>{

         if(openCards[0].children[0].classList.value == openCards[1].children[0].classList.value){
     console.log(openCards[0].children[0].classList.value);
     console.log(openCards[1].childNodes[1].classList.value);

        }
        });
    }
}
openCards.forEach(card => {
    card.addEventListener("click", displayCard);
});
*/

//what i need to change and store
const deck = document.querySelector(".deck");
console.log(deck, "deck");
let openCards = [];
const itemToShuffle = Array.from(document.querySelectorAll(".card"));
const restart = document.querySelector(".restart");
movesElement = document.querySelector(".moves");
console.log(movesElement);
let moves = 0;
let hearts = Array.from(document.querySelectorAll(".hearts li i"));
console.log(hearts);
let match = 0;

deck.addEventListener("click", (event) => {
  let target = event.target;

  target.classList.add("open");
  target.classList.add("show");
  initClock();

  if (
    target.classList.contains("open") &&
    target.tagName.toLowerCase() == "li"
  ) {
    openCards.push(event.target);
  }

  if (openCards.length == 2) {
    setTimeout(() => {
      moves += 1;
      console.log(openCards[0].children[0].classList.value);
      if (
        openCards[0].children[0].classList.value ==
          openCards[1].children[0].classList.value &&
        openCards[0] !== openCards[1]
      ) {
        moves += 1;
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        match++;
        if (match == 2) {
          alert('YOU WIN ');
          reset();
        }
      } else {
        openCards[0].classList.remove("open");
        openCards[0].classList.remove("show");
        openCards[1].classList.remove("open");
        openCards[1].classList.remove("show");
      }

      // remove if reach 2 and remove 2 indexes //
      openCards.splice(0, 2);

      // counter move  //
      movesElement.innerHTML = moves;

      if (moves == 2) {
        hearts[2].classList.remove("fa-heart");
      } else if (moves == 4) {
        hearts[1].classList.remove("fa-heart");
      }
    }, 1000);
  }
});

//SHUFFLE
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

function reset() {
  hearts.forEach((heart) => {
    heart.classList.add("fa-heart");
  });

  for (let i = 0; i < itemToShuffle.length; i++) {
    itemToShuffle[i].classList.remove("open");
    itemToShuffle[i].classList.remove("show");
    itemToShuffle[i].classList.remove("match");
  }
  movesElement.innerHTML = 0;
  moves = 0;
  match = 0;

  startNew(itemToShuffle);
}

function startNew(arr) {
  let temp = shuffle(arr);
  for (let i = 0; i < temp.length; i++) {
    deck.appendChild(temp[i]);
  }
}

restart.addEventListener("click", () => {
  reset();
  timeReset();
});

startNew(itemToShuffle);

//TIMER
let time = 0;
let timerOut = true;
let timerId;

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
const timeReset = () => {
  stopTimer();
  timerOut = true;
  time = 0;
  timerCount();
};
