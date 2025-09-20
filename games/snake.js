const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const modal = document.getElementById("gameOverModal");
const modalScore = document.getElementById("modalScore");
const playAgainBtn = document.getElementById("playAgain");
const startBtn = document.getElementById("startBtn");

const rows = 20;
const cols = 20;

let snake = [];
let food = {};
let direction = { row: 0, col: 1 };
let interval = null;
let isPaused = false;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;

// Create board
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

// Get index
function getIndex(row, col) {
    return row * cols + col;
}

// Place food
function placeFood() {
    let row, col;
    do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
    } while (snake.some(s => s.row === row && s.col === col));
    food = { row, col };
}

// Render board
function renderBoard() {
    board.querySelectorAll(".cell").forEach(cell => cell.className = "cell");
    // Food
    board.children[getIndex(food.row, food.col)].classList.add("food");
    // Snake
    snake.forEach(s => {
        board.children[getIndex(s.row, s.col)].classList.add("snake");
    });
}

// Start game
function startGame() {
    snake = [{ row: 10, col: 10 }];
    direction = { row: 0, col: 1 };
    score = 0;
    isPaused = false;
    updateScore();
    placeFood();
    modal.classList.remove("show");
    startBtn.style.display = "none";

    renderBoard();
    clearInterval(interval);
    interval = setInterval(gameLoop, 150);
}

// Game loop
function gameLoop() {
    const head = { row: snake[0].row + direction.row, col: snake[0].col + direction.col };

    // Wall collision
    if (head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols) return gameOver();
    // Self collision
    if (snake.some(s => s.row === head.row && s.col === head.col)) return gameOver();

    snake.unshift(head);

    // Eat food
    if (head.row === food.row && head.col === food.col) {
        score++;
        updateScore();
        placeFood();
    } else {
        snake.pop();
    }

    renderBoard();
}

// Game over
function gameOver() {
    clearInterval(interval);
    interval = null;
    modalScore.textContent = score;
    modal.classList.add("show");
    startBtn.style.display = "block";
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
    }
    updateScore();
}

// Update score
function updateScore() {
    scoreEl.textContent = score;
    highScoreEl.textContent = highScore;
}

// Controls
document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();

    // Prevent scroll
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) e.preventDefault();

    // Movement
    if ((key === "arrowup" || key === "w") && direction.row !== 1) direction = { row: -1, col: 0 };
    if ((key === "arrowdown" || key === "s") && direction.row !== -1) direction = { row: 1, col: 0 };
    if ((key === "arrowleft" || key === "a") && direction.col !== 1) direction = { row: 0, col: -1 };
    if ((key === "arrowright" || key === "d") && direction.col !== -1) direction = { row: 0, col: 1 };

    // Pause/resume
    if (key === " ") {
        if (isPaused) {
            interval = setInterval(gameLoop, 150);
            isPaused = false;
        } else {
            clearInterval(interval);
            interval = null;
            isPaused = true;
        }
    }

    // Enter to start/restart
    if (key === "enter") startGame();
});

// Buttons
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

// Initialize
createBoard();
updateScore();
