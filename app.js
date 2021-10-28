const setTimer = document.querySelector("#set_time"); //Get input time from user
const radioGrid = document.querySelector("#grid"); //Grid for creating 6*10 radio buttons matrix
const scoreBox = document.querySelector("#game_score"); //Score keeper box
const scoreOverlay = document.querySelector(".scoreboard_container"); //Overlay after game ends
const remarks = document.querySelector(".remarks"); //remarks for the player
const scorePercent = document.querySelector(".score_percent"); //Percentage container
const stopBtn = document.getElementById("stop_btn");  //stop button

scoreOverlay.style.display = "none";

stopBtn.disabled = true;

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
        radioBox.name = "radio_btn";
        radioBox.className = "holes";
        radioBox.id = i + 1;
        radioGrid.appendChild(radioBox);
    }
}
createHoles();

const holes = document.querySelectorAll(".holes"); //Select all the radio buttons

//Selects radio buttons randomly
function randomHole() {
    let randomTime = Math.floor(Math.random() * 60 + 1);
    return document.getElementById(randomTime);
}

//Score updater
let score = 0;
(function () {
    for (let i = 0; i < holes.length; i++) {
        holes[i].addEventListener("click", function () {
            if (this.id == selectedHole.id) {
                scoreBox.innerHTML = score += 1;
            } else {
                scoreBox.innerHTML = score -= 1;
            }
        });
    }
})();

let gameTime = 0, holeInterval, selectedHole, scorePercentage;

//Starts the gameplay
function startGame() {
    stopGame();
    radioBtnStatus(false);
    stopBtn.disabled = false;
    function gamePlay() {
        scoreOverlay.style.display = "none";
        selectedHole = randomHole();
        selectedHole.classList.add("selected_hole");
        gameTime++;
        scorePercentage = (score / gameTime) * 100;

        if (gameTime <= jumpCount || score === jumpCount) {
            holeInterval = setTimeout(function () {
                selectedHole.classList.remove("selected_hole");
                gamePlay();
            }, 1000);
        } else {
            selectedHole.classList.remove("selected_hole");
            scoreOverlay.style.display = "block";
            stopTimer();
            stopGame();
        }
    }
    startTimer();
    gamePlay();
}

//Disable or Enable all radio buttons
function radioBtnStatus(status) {
    for (let i = 0; i < holes.length; i++) {
        holes[i].disabled = status;
    }
}

//Uncheck all the radio buttons
function unCheck() {
    for (let i = 0; i < holes.length; i++) {
        holes[i].checked = false;
    }
}
function stopGame() {
    scorePercent.innerHTML = `${Math.round(scorePercentage)}% Correct`;
    remarks.innerHTML = scorePercentage < 60 ? "Need Practice" : scorePercentage > 80 ? "Awesome!" : "Very Nice!";
    clearInterval(holeInterval);
    unCheck();
    radioBtnStatus(true);
    selectedHole?.classList?.remove("selected_hole");
    score = gameTime = 0;
    scoreBox.innerHTML = 0;
    stopBtn.disabled = true;
}
