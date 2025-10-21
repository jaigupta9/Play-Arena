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
├─ index.html # Home page (featured game + game cards + search/filter)
├─ styles.css # Site-wide styles, tokens, components, dark-mode overrides
├─ images/ # Game thumbnails and assets
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

- Option A: Open index.html directly in a browser for a quick preview.
- Option B: Use any static server to avoid path/security quirks:
  - Python: `python3 -m http.server 5173`
  - Node: `npx serve -l 5173` or `npx http-server -p 5173`
  - Then open http://localhost:5173

No build step is required.

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

## Configuration and Design Tokens

- Dark mode variables live under `body.dark-mode` and switch colors, shadows, borders, and backgrounds.
- Common CSS tokens:
  - `--brand`, `--text`, `--muted`, `--card-bg`, `--chip-bg`, `--cell-bg`, `--grid-line`.
- Snake sizing (in `snake.css`):
  - `--cell-size` (default 28px desktop, 20px mobile), `--gap-size` (default 3px).
  - `--nav-height` (default 64px) reserves header space so the modal doesn’t block the navbar.

Increase `--cell-size` to 30–32px if you want an even larger grid on large screens.

## Accessibility

- Keyboard‑accessible nav (hamburger `aria-expanded`, focus outlines).
- Boards/controls labeled with `role`, `aria-label`, and live regions where relevant.
- Keyboard support:
  - RPS choices are focusable; Enter/Space triggers them.
  - Snake supports Enter/Space for start/restart/pause; prevents unintended resume after game over.

## Development Notes

- Always include `../styles.css` first on game pages, then the page‑specific CSS to keep overrides predictable.
- Game scripts initialize the navbar (hamburger + theme) safely and do not assume Home‑only elements exist.
- Animations are subtle to preserve clarity and reduce motion sensitivity issues.

## Adding a New Game

1. Create files under `games/`:
   - `my-game.html`, `my-game.css`, `my-game.js`
2. In `my-game.html`, copy a game page skeleton:
   - Shared navbar header
   - Hero section
   - Main game card (board/controls)
   - Footer
   - Include `../styles.css` then `my-game.css`, and load `my-game.js` with `defer`.
3. In `my-game.js`, copy the small navbar/theme bootstrap IIFE so dark mode and hamburger work.
4. Add a card to Home (`index.html`) inside the `.game-menu` with image, title, description, and link to `games/my-game.html`.
5. Provide a thumbnail in `images/` matching the others.

## Deployment

- Upload the static files to any static host or object storage.
- For “single‑page” navigation feel, keep folder structure and relative paths intact (`../` from game pages to root assets).
- Optional: enable caching for images/CSS/JS and add compression at the server/CDN.

## Roadmap (Ideas)

- Leaderboard (backend API or serverless function).
- PWA: offline caching of assets and a simple manifest.
- Audio FX with a mute toggle, persisted in localStorage.
- More games (Tetris, Memory Match, Number Rush, etc.) with the same UI shell.
- Unit tests for game logic and basic UI behaviors.

## License

MIT (or your preferred license). Update this section with your final choice.

## Credits

Design and development by Jai. Icons/emojis used for game labels and feedback.
