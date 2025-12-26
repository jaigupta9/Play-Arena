// ----------------------
// Navbar + Dark Mode (page-agnostic)
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

    // Dark mode toggle mirrors home page behavior
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Initialize from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }

    // Toggle handler
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
// Tic Tac Toe Game Logic
// ----------------------
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const modal = document.getElementById("gameModal");
const modalText = document.getElementById("modalText");
const modalBtn = document.getElementById("modalBtn");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let scores = { X: 0, O: 0 };

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", `Cell ${i + 1}`);
        cell.setAttribute("tabindex", "0");
        cell.dataset.index = i;

        if (gameState[i] !== "") {
            cell.textContent = gameState[i];
            cell.classList.add(gameState[i], "taken");
        }

        // Click once per empty cell
        cell.addEventListener("click", handleClick, { once: true });

        // Keyboard support
        cell.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                cell.click();
            }
        });

        board.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.currentTarget.dataset.index;
    if (gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    e.currentTarget.textContent = currentPlayer;
    e.currentTarget.classList.add(currentPlayer, "taken");

    const winningPattern = checkWin();
    if (winningPattern) {
        statusText.textContent = `${currentPlayer} Wins! 🎉`;
        highlightWin(winningPattern);
        scores[currentPlayer]++;
        updateScores();
        showModal(`${currentPlayer} Wins! 🎉`);
        disableBoard();
    } else if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        showModal("It's a Draw! 🤝");
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Turn: ${currentPlayer}`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals  
    ];
    return winPatterns.find(pattern => pattern.every(i => gameState[i] === currentPlayer));
}

function highlightWin(pattern) {
    pattern.forEach(i => board.children[i].classList.add("winner"));
}

function disableBoard() {
    // Strip all listeners to freeze the board after win
    Array.from(board.children).forEach(cell => {
        cell.replaceWith(cell.cloneNode(true));
    });
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function showModal(message) {
    modalText.textContent = message;
    modal.classList.add("show");
}

function hideModal() {
    modal.classList.remove("show");
    resetGame();
}

function resetGame() {
    gameState.fill("");
    currentPlayer = "X";
    statusText.textContent = `Turn: ${currentPlayer}`;
    createBoard();
}

resetBtn.addEventListener("click", resetGame);
modalBtn.addEventListener("click", hideModal);

createBoard();
