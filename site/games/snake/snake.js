let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let newUp = document.querySelector(".up");
let newRight = document.querySelector(".right");
let newDown = document.querySelector(".down");
let newLeft = document.querySelector(".left");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
/** Seconds per cell */
let delayMult = 0.95;
const baseIntervalTime = 300;
let intervalTime = baseIntervalTime;
/** Used by `setInterval` and `clearInterval` */
let interval;

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = baseIntervalTime;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    // console.log(`direction ${direction}`);
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * delayMult;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function control(e) {
    // console.log(e);
    if (e.key === "ArrowDown") {
        direction = 1;
    } else if (e.key === "ArrowLeft") {
        direction = -width;
    } else if (e.key === "ArrowUp") {
        direction = -1;
    } else if (e.key === "ArrowRight") {
        direction = +width;
    }
}

newLeft.addEventListener("click", () => (direction = -width));
newRight.addEventListener("click", () => (direction = +width));
newUp.addEventListener("click", () => (direction = -1));
newDown.addEventListener("click", () => (direction = 1));

function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}
