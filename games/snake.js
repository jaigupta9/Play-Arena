// ----------------------
// Navbar + Dark Mode (page-agnostic, mirrors other games)
// ----------------------
(function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Inject hamburger for mobile
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger-btn');
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '☰';
    navbar.prepend(hamburger);

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const expanded = navbar.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Dark mode toggle using localStorage
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const enabled = body.classList.contains('dark-mode');
            toggleBtn.textContent = enabled ? '☀️' : '🌙';
            localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        });
    }
})();

// ----------------------
// Snake Game
// ----------------------
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
let isRunning = false;
let isGameOver = false;
let score = 0;
let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function getIndex(row, col) {
    return row * cols + col;
}

function placeFood() {
    let row, col;
    do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
    } while (snake.some(s => s.row === row && s.col === col));
    food = { row, col };
}

function renderBoard() {
    board.querySelectorAll(".cell").forEach(cell => (cell.className = "cell"));
    // Food
    board.children[getIndex(food.row, food.col)].classList.add("food");
    // Snake
    snake.forEach(s => {
        board.children[getIndex(s.row, s.col)].classList.add("snake");
    });
}

function startGame() {
    // Reset state
    clearInterval(interval);
    interval = null;
    isPaused = false;
    isRunning = true;
    isGameOver = false;

    snake = [{ row: Math.floor(rows / 2), col: Math.floor(cols / 2) }];
    direction = { row: 0, col: 1 };
    score = 0;
    updateScore();
    placeFood();
    modal.classList.remove("show");
    startBtn.style.display = "none";
    renderBoard();

    interval = setInterval(gameLoop, 150);
}

function gameLoop() {
    const head = { row: snake[0].row + direction.row, col: snake[0].col + direction.col };

    // Wall collision
    if (head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols) {
        return gameOver();
    }

    // Self collision
    if (snake.some(s => s.row === head.row && s.col === head.col)) {
        return gameOver();
    }

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

function gameOver() {
    clearInterval(interval);
    interval = null;
    isRunning = false;
    isPaused = false;
    isGameOver = true;

    modalScore.textContent = score;
    modal.classList.add("show");
    startBtn.style.display = "block";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", String(highScore));
    }
    updateScore();
}

function updateScore() {
    scoreEl.textContent = score;
    highScoreEl.textContent = highScore;
}

// Keyboard controls
document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();

    // Prevent scroll for arrows and space
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
        e.preventDefault();
    }

    // If game over: allow quick restart with Enter/Space; ignore pause toggles
    if (isGameOver && (key === "enter" || key === " ")) {
        startGame();
        return;
    }

    // Movement (no 180 turns)
    if ((key === "arrowup" || key === "w") && direction.row !== 1) direction = { row: -1, col: 0 };
    if ((key === "arrowdown" || key === "s") && direction.row !== -1) direction = { row: 1, col: 0 };
    if ((key === "arrowleft" || key === "a") && direction.col !== 1) direction = { row: 0, col: -1 };
    if ((key === "arrowright" || key === "d") && direction.col !== -1) direction = { row: 0, col: 1 };

    // Pause/resume only while running and not game over
    if (key === " ") {
        if (!isRunning || isGameOver) return;
        if (isPaused) {
            if (!interval) interval = setInterval(gameLoop, 150);
            isPaused = false;
        } else {
            if (interval) { clearInterval(interval); interval = null; }
            isPaused = true;
        }
    }

    // Enter to start when idle (pre-game)
    if (key === "enter" && !isRunning && !isGameOver) startGame();
});

// Buttons
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

// Initialize
createBoard();
updateScore();
