
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
 //to know that i cleard the timer
  if (timeStatues==true) {
      initClock();
      timeStatues=false;

  }
  
  
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
          openCards[1].children[0].classList.value 
          &&   //compare th refrences
        openCards[0] !== openCards[1]
      ) {
        moves += 1;
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        match++;
        if (match == 2) {
          alert('YOU WIN');
          reset();
          timeReset();
        }
      } else {
        openCards[0].classList.remove("open","show");
       // openCards[0].classList.remove("show");
        openCards[1].classList.remove("open","show");
       // openCards[1].classList.remove("show");
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
//to add the cards after shuffling
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
let timeStatues = true;
//to make a change on setInt..
let timerId;

const initClock = () => {
  timerId = setInterval(() => {
    time=time+1;
    console.log(time,"time");
    timerCount();
  }, 1000);
};
const timerCount = () => {
  const timer = document.querySelector(".timer");
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerHTML = `${min}:0${sec}`;  //0:0sec   0:0
  } else {
    timer.innerHTML = `${min}:${sec}`;     
  }
};
//===================
const stopTimer = () => {
  clearInterval(timerId);
};
 const timeReset = () => {
  timeStatus = true;
  stopTimer();
  time = 0;
   timerCount();
 
 };
