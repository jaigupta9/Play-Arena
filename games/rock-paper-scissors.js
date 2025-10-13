// ----------------------
// Navbar + Dark Mode (page-agnostic, mirrors Tic Tac Toe)
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

    // Dark mode toggle mirrors site behavior
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
// Rock · Paper · Scissors Game
// ----------------------
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

function clearOutcomeStyles() {
    buttons.forEach(b => b.classList.remove("win", "lose", "draw"));
}

buttons.forEach(btn => {
    // Accessibility
    btn.setAttribute("role", "option");
    btn.setAttribute("tabindex", "0");

    btn.addEventListener("click", () => {
        const player = btn.dataset.choice;
        const computer = computerChoice();
        const outcome = determineWinner(player, computer);

        // Visual feedback
        clearOutcomeStyles();

        if (outcome === "win") {
            playerScore++;
            result.textContent = `You chose ${player}, Computer chose ${computer}. You Win! 🎉`;
            btn.classList.add("win");
        } else if (outcome === "lose") {
            computerScore++;
            result.textContent = `You chose ${player}, Computer chose ${computer}. You Lose 😢`;
            btn.classList.add("lose");
        } else {
            result.textContent = `You chose ${player}, Computer chose ${computer}. It's a Draw! 🤝`;
            btn.classList.add("draw");
        }

        // Update scores
        scorePlayer.textContent = playerScore;
        scoreComputer.textContent = computerScore;

        // Pop animation
        btn.style.animation = "pop 0.3s ease";
        setTimeout(() => { btn.style.animation = ""; }, 300);
    });

    // Keyboard support
    btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
        }
    });
});

resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    scorePlayer.textContent = 0;
    scoreComputer.textContent = 0;
    result.textContent = "Make your move!";
    clearOutcomeStyles();
});
