# Play Arena

Play Arena is a lightweight, responsive mini‑games website featuring a shared UI, dark mode with persistence, and polished pages for Tic Tac Toe, Rock · Paper · Scissors, and Snake. Each game inherits a common navbar, button styles, animations, and accessible keyboard controls.

## Features

- Shared UI
  - Sticky navbar with logo link to Home, navigation links, theme toggle, and mobile hamburger menu.
  - Dark mode persists across pages via localStorage and updates the toggle icon accordingly.
  - Consistent cards, buttons, shadows, and hover/active states across all pages.
- Home page
  - Hero section, featured game, and a grid of game cards.
  - Live search and category filter for quick discovery.
  - Smooth scroll from hero button to games.
- Game pages
  - Reuse the shared navbar and footer.
  - Per‑game hero header and a central “game card” for the board/controls.
  - “Back to Menu” action and a clickable logo to return to Home.
- Games included
  - Tic Tac Toe: animated X/O, win highlighting, scoreboard, and replay modal.
  - Rock · Paper · Scissors: outcome highlighting (win/lose/draw), keyboard support, and scoring.
  - Snake: larger 20×20 grid with CSS‑driven sizing, right‑side instructions, chip‑style scoreboard, pause/resume, and an improved game‑over modal with two actions.

## Tech Stack

- HTML5 for structure
- Modern CSS (flex/grid, tokens/variables, transitions) for styling and themes
- Vanilla JavaScript for game logic, UI behaviors, and accessibility
- No framework/runtime required; serves as a static site

## Project Structure

.
├─ index.html # Home (featured game + game cards + search/filter)
├─ styles.css # Site-wide styles, tokens, components, dark-mode
├─ images/ # Thumbnails and assets
└─ games/
├─ tic-tac-toe.html
├─ tic-tac-toe.css
├─ tic-tac-toe.js
├─ rock-paper-scissors.html
├─ rock-paper-scissors.css
├─ rock-paper-scissors.js
├─ snake.html
├─ snake.css
└─ snake.js

## Getting Started

- Live Demo: https://play-arena-mu.vercel.app/

Notes:
- This link opens the deployed Play Arena site directly; no installation or setup is required.
- The website is responsive and supports dark mode; your theme choice is remembered automatically.
- Use the top navigation to jump between games, and the logo or “Back to Menu” to return to the home page.
- Keyboard shortcuts are available on game pages (e.g., Arrow Keys/WASD for Snake, Enter/Space to start/restart where supported).

## Key Behaviors and Shortcuts

- Theme
  - Toggle with the sun/moon button in the navbar.
  - Persistence key: `darkMode` with values `enabled` or `disabled`.
- Navigation
  - Logo always routes to Home.
  - On mobile, the hamburger toggles the nav links with `aria-expanded` updates.
- Tic Tac Toe
  - Click to place; animated marks and win glow.
  - Scoreboard tracks X and O.
- Rock · Paper · Scissors
  - Pick with mouse or keyboard (Enter/Space on focused choice).
  - Outcome chips (win/lose/draw) and running score.
- Snake
  - Move: Arrow keys or WASD.
  - Start/Restart: Enter.
  - Pause/Resume: Space.
  - Game Over modal: shows Score, buttons for “Play Again” and “Back to Menu”, and the hint “Press Enter or Space to play again”.
  - Enter or Space restarts immediately after game over.
  - Modal does not block the sticky navbar; header remains clickable.

## Credits

Design and development by Jai. Icons/emojis are used for game labels and feedback.
