/* ==============================
   Auth Guard
   ============================== */
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

/* ==============================
   Logout
   ============================== */
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

/* ==============================
   Theme Toggle (Dark Mode)
   ============================== */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }
    });
}

/* ==============================
   Hamburger Menu (Mobile)
   ============================== */
const navbar = document.querySelector(".navbar");
const hamburgerBtn = document.querySelector(".hamburger-btn");

if (hamburgerBtn && navbar) {
    hamburgerBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

/* ==============================
   Search + Category Filter
   ============================== */
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const gameCards = document.querySelectorAll(".game-card");

function filterGames() {
    const searchText = searchBox.value.toLowerCase();
    const category = categoryFilter.value;

    gameCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const cardCategory = card.getAttribute("data-category");

        const matchesSearch = title.includes(searchText);
        const matchesCategory =
            category === "all" || category === cardCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

if (searchBox) searchBox.addEventListener("input", filterGames);
if (categoryFilter) categoryFilter.addEventListener("change", filterGames);
