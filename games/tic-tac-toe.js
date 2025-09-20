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
        cell.dataset.index = i;
        if (gameState[i] !== "") {
            cell.textContent = gameState[i];
            cell.classList.add(gameState[i], "taken");
        }
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer, "taken");

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
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.find(pattern =>
        pattern.every(i => gameState[i] === currentPlayer)
    );
}

function highlightWin(pattern) {
    pattern.forEach(i => board.children[i].classList.add("winner"));
}

function disableBoard() {
    Array.from(board.children).forEach(cell => cell.removeEventListener("click", handleClick));
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
