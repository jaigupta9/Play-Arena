if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// ====== Elements ======
const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');
const cards = document.querySelectorAll('.game-card');
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const heroBtn = document.querySelector('.hero .btn');
const navbar = document.querySelector('.navbar');

// ====== Mobile Hamburger ======
const hamburger = document.createElement('button');
hamburger.classList.add('hamburger-btn');
hamburger.innerHTML = '☰';
navbar.prepend(hamburger);

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// ====== Search & Filter ======
function filterGames() {
    const search = searchBox.value.toLowerCase();
    const category = categoryFilter.value;

    cards.forEach(card => {
        const matchesSearch = card.querySelector('h3').textContent.toLowerCase().includes(search);
        const matchesCategory = category === 'all' || card.dataset.category === category;
        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

searchBox.addEventListener('input', filterGames);
categoryFilter.addEventListener('change', filterGames);

// ====== Hero Smooth Scroll ======
heroBtn.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#games').scrollIntoView({ behavior: 'smooth' });
});

// ====== Dark Mode Toggle ======
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
} else {
    toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
