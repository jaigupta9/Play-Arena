const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameState = Array(9).fill("");

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        board.querySelectorAll(".cell").forEach(c => c.removeEventListener("click", handleClick));
    } else if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw!";
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
    return winPatterns.some(pattern =>
        pattern.every(i => gameState[i] === currentPlayer)
    );
}

createBoard();
statusText.textContent = `Turn: ${currentPlayer}`;
