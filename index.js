let teamOneScore = document.getElementById("teamOneScore");
let teamTwoScore = document.getElementById("teamTwoScore");
let timerElement = document.getElementById("timer");
let scoreTeamOne = 0;
let scoreTeamTwo = 0;
let timerInterval;
let gameStarted = false;
let incrementButtons = document.querySelectorAll(".increment");
let startGameBtn = document.getElementById("startGameBtn");

function updateLeader() {
    if (scoreTeamOne > scoreTeamTwo) {
        teamOneScore.classList.add("leader");
        teamTwoScore.classList.remove("leader");
    } else if (scoreTeamTwo > scoreTeamOne) {
        teamTwoScore.classList.add("leader");
        teamOneScore.classList.remove("leader");
    } else {
        teamOneScore.classList.remove("leader");
        teamTwoScore.classList.remove("leader");
    }
}

function increment(incrementNumber, team) {
    if (gameStarted) {
        if (team === teamOneScore) {
            scoreTeamOne += incrementNumber;
            team.textContent = scoreTeamOne;
        } else if (team === teamTwoScore) {
            scoreTeamTwo += incrementNumber;
            team.textContent = scoreTeamTwo;
        }
        updateLeader();
    }
}

function startTimer() {
    if (gameStarted) {
        let minutes = 10;
        let seconds = 0;

        timerInterval = setInterval(() => {
            seconds--;
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }

            let minutesStr = minutes < 10 ? "0" + minutes : minutes;
            let secondsStr = seconds < 10 ? "0" + seconds : seconds;
            timerElement.textContent = `${minutesStr}:${secondsStr}`;

            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                // Handle timer expiration (e.g., end the game)
            }
        }, 1000);
    }
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
        disableStartButton();
        enableAllOtherElements();
    }
}

function reset() {
    scoreTeamOne = 0;
    scoreTeamTwo = 0;
    teamOneScore.textContent = scoreTeamOne;
    teamTwoScore.textContent = scoreTeamTwo;
    timerElement.textContent = "10:00";
    gameStarted = false;
    clearInterval(timerInterval);
    updateLeader();
    enableStartButton();
    disableAllOtherElements();
}

function enableStartButton() {
    startGameBtn.classList.add("enabled");
    startGameBtn.classList.remove("disabled");
}

function disableStartButton() {
    startGameBtn.classList.add("disabled");
    startGameBtn.classList.remove("enabled");
}

function enableAllOtherElements() {
    incrementButtons.forEach(button => button.classList.add("enabled"));
    incrementButtons.forEach(button => button.classList.remove("disabled"));
    teamOneScore.classList.add("enabled");
    teamTwoScore.classList.add("enabled");
}

function disableAllOtherElements() {
    incrementButtons.forEach(button => button.classList.add("disabled"));
    incrementButtons.forEach(button => button.classList.remove("enabled"));
    teamOneScore.classList.add("disabled");
    teamTwoScore.classList.add("disabled");
}

// Initial state
enableStartButton();
disableAllOtherElements();
