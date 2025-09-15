const buttons = document.querySelectorAll(".choices button");
const result = document.getElementById("result");

function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(player, computer) {
    if (player === computer) return "It's a Draw!";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) return "You Win! 🎉";
    return "You Lose 😢";
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const player = btn.dataset.choice;
        const computer = computerChoice();
        result.textContent = `You chose ${player}, computer chose ${computer}. ${determineWinner(player, computer)}`;
    });
});
