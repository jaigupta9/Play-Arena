# 🎮 Play Arena

Play Arena is a lightweight, responsive mini-games website featuring a shared UI, dark mode with persistence, and a simple authentication backend (login & registration). The platform includes polished pages for games like Tic Tac Toe, Rock · Paper · Scissors, and Snake, all built with React + Vite.

---

## ✨ Features

### 🎨 Frontend

#### Shared UI
- Sticky navbar with logo, navigation links, theme toggle, logout button, and mobile hamburger menu
- Dark mode persists across pages using `localStorage`
- Consistent cards, buttons, shadows, and hover/active states across all pages
- Built with React functional components and hooks

#### Home Page
- Hero section, featured game, and grid of game cards
- Live search and category filter
- Smooth scroll from hero section to games

#### Game Pages
- Reuse the shared navbar and footer
- Central game cards with controls and instructions
- “Back to Menu” navigation

#### Games Included
- **Tic Tac Toe**: animated X/O, win highlighting, scoreboard, replay
- **Rock · Paper · Scissors**: keyboard support, outcome highlighting, scoring
- **Snake**: 20×20 grid, keyboard controls (Arrow/WASD), pause/resume, game-over modal

---

## 🔐 Authentication (Backend)

Play Arena includes a **Node.js + Express backend** that handles:

- User registration
- User login
- Secure password hashing
- JWT-based authentication

This backend is deployed separately from the frontend.

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed using **bcrypt** before storage
3. On login, credentials are verified
4. A **JWT token** is generated and returned
5. The frontend stores the token in `localStorage`
6. Protected pages check for token presence in localStorage
7. Logout removes the token from `localStorage`

---

## 🧠 Important Note on Data Persistence

Currently, user data is stored in a local JSON file: `backend/data/users.json`

- This storage is **temporary**
- On Render free tier, the backend container sleeps after inactivity
- When it restarts, the JSON file is reset
- **User data is lost after inactivity**

This setup is intentional for learning purposes.  
A database (**MongoDB**) will be added in a future update.

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Modern CSS (Flexbox, Grid, transitions)
- Deployed on **Vercel**

### Backend
- Node.js
- Express.js
- `bcryptjs` (password hashing)
- `jsonwebtoken` (JWT authentication)
- `cors`
- File system (JSON-based storage)
- Deployed on **Render**

---

## 📁 Project Structure

```
Play Arena/
├─ frontend/             # React (Vite) application
│  ├─ src/
│  │  ├─ components/     # Reusable UI components
│  │  ├─ context/        # React Context (e.g., AuthContext)
│  │  ├─ games/          # Individual game components
│  │  ├─ pages/          # Page components (Home, Login, Register)
│  │  ├─ App.jsx         # App routing and entry point
│  │  ├─ main.jsx        # App entry point
│  │  └─ index.css       # Global styles & dark mode
│  └─ package.json
└─ backend/
   ├─ server.js          # Express backend
   ├─ package.json
   └─ data/
      └─ users.json      # Temporary user storage
```

---

## 🚀 Getting Started

### Live Demo

**Frontend:**  
https://play-arena-seven.vercel.app/

**Backend (API):**  
https://play-arena-backend.onrender.com/

---

## ▶️ Run Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Backend
```bash
cd backend
npm install
node server.js
```

Backend runs on: http://localhost:5000

## ⌨️ Key Behaviors & Shortcuts

### Theme Toggle
- Stored in `localStorage`
- Persists across pages

### Authentication
- Token stored in `localStorage`
- Protected pages redirect to login if token is missing

### Snake Controls
- Move: Arrow keys / WASD
- Start / Restart: Enter
- Pause / Resume: Space

---

## 🔮 Planned Improvements
- MongoDB integration for persistent user storage
- JWT verification middleware
- Protected API routes
- User profiles & leaderboard
- Better session handling

---

## 👨‍💻 Credits
Design and development by **Jai**.  
Built for learning, experimentation, and gradual improvement.
