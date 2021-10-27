const setTimer = document.querySelector("#setTime"), //Get input time from user
  radioGrid = document.querySelector("#grid"), //Grid for creating 6*10 radio buttons matrix
  scoreBox = document.querySelector("#gameScore"), //Score keeper box
  scoreOverlay = document.querySelector(".scoreboard-container"), //Overlay after game ends
  remarks = document.querySelector(".remarks"), //remarks for the player
  scorePercent = document.querySelector(".scorePercent"); //Percentage container

scoreOverlay.style.display = "none";

let timerInterval, countDownSeconds, jumpCount;

//Starts the timer
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    countDownSeconds -= 1;
    setTimer.value = countDownSeconds;
    if (countDownSeconds < 0) {
      stopTimer();
      stopGame();
      scoreOverlay.style.display = "block";
    }
  }, 1000);
  countDownSeconds = setTimer.value;
  jumpCount = setTimer.value;
}

//Stops the timer
function stopTimer() {
  clearInterval(timerInterval);
  setTimer.value = 30;
}

//Creates 6*10 radio buttons matrix
function createHoles() {
  for (let i = 0; i < 60; i++) {
    let radioBox = document.createElement("input");
    radioBox.type = "radio";
    radioBox.name = "radioBtn";
    radioBox.className = "radioBtn";
    radioBox.id = i + 1;
    radioGrid.appendChild(radioBox);
  }
}
createHoles();

const holes = document.querySelectorAll(".radioBtn"); //Select all the radio buttons

//Selects radio buttons randomly
function randomHole() {
  let randomTime = Math.floor(Math.random() * 60 + 1);
  let hole = document.getElementById(randomTime);
  return hole;
}

//Score updater
let score = 0;

for (let i = 0; i < holes.length; i++) {
  holes[i].addEventListener("click", function addScore() {
    if (this.id == selectedHole.id) {
      scoreBox.innerHTML = score += 1;
    } else {
      scoreBox.innerHTML = score -= 1;
    }
  });
}

let gameTime = 0,
  holeInterval,
  selectedHole,
  scorePercentage;

//Starts the gameplay
function startGame() {
  stopGame();
  for (let i = 0; i < holes.length; i++) {
    holes[i].disabled = false;
  }
  function gamePlay() {
    scoreOverlay.style.display = "none";
    selectedHole = randomHole();
    selectedHole.classList.add("selectedHole");
    gameTime++;
    scorePercentage = (score / gameTime) * 100;

    if (gameTime <= jumpCount || score === jumpCount) {
      holeInterval = setTimeout(function () {
        selectedHole.classList.remove("selectedHole");
        gamePlay();
      }, 1000);
    } else {
      selectedHole.classList.remove("selectedHole");
      scoreOverlay.style.display = "block";
      stopTimer();
      stopGame();
    }
  }
  startTimer();
  gamePlay();
}

//Disable all radio buttons
for (let i = 0; i < holes.length; i++) {
  holes[i].disabled = true;
}

//Uncheck all the radio buttons
function unCheck() {
  for (let i = 0; i < holes.length; i++) {
    holes[i].checked = false;
  }
}
function stopGame() {
  scorePercent.innerHTML = `${Math.round(scorePercentage)}% Correct`;
  remarks.innerHTML =
    scorePercentage < 60
      ? "Need Practice"
      : scorePercentage > 80
      ? "Awesome!"
      : "Very Nice!";
  clearInterval(holeInterval);
  unCheck();
  for (let i = 0; i < holes.length; i++) {
    holes[i].disabled = true;
  }
  selectedHole?.classList?.remove("selectedHole");
  score = gameTime = 0;
  scoreBox.innerHTML = 0;
}
