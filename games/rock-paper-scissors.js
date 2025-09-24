const buttons = document.querySelectorAll(".choice-btn");
const result = document.getElementById("result");
const scorePlayer = document.getElementById("scorePlayer");
const scoreComputer = document.getElementById("scoreComputer");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;

function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) return "win";
    return "lose";
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const player = btn.dataset.choice;
        const computer = computerChoice();
        const outcome = determineWinner(player, computer);

        if (outcome === "win") {
            playerScore++;
            result.textContent = `You chose ${player}, Computer chose ${computer}. You Win! 🎉`;
        } else if (outcome === "lose") {
            computerScore++;
            result.textContent = `You chose ${player}, Computer chose ${computer}. You Lose 😢`;
        } else {
            result.textContent = `You chose ${player}, Computer chose ${computer}. It's a Draw! 🤝`;
        }

        scorePlayer.textContent = playerScore;
        scoreComputer.textContent = computerScore;

        // Add pop animation to clicked button
        btn.style.animation = "pop 0.3s ease";
        setTimeout(() => {
            btn.style.animation = "";
        }, 300);
    });
});

resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    scorePlayer.textContent = 0;
    scoreComputer.textContent = 0;
    result.textContent = "Make your move!";
});
