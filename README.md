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

#### Global Leaderboard
- Displays highest scores for Snake and cumulative wins for Tic-Tac-Toe & Rock-Paper-Scissors
- Public-facing leaderboard UI accessible from the navigation menu
- Real-time updates as scores are submitted to the backend

---

## 🔐 Authentication (Backend)

Play Arena includes a **MERN stack (MongoDB, Express, React, Node.js) backend** that handles:

- User registration
- User login
- Secure password hashing
- JWT-based authentication
- Secure score submissions and leaderboard retrieval

This backend is deployed separately from the frontend.

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed using **bcrypt** before storage
3. Data is stored securely in **MongoDB**
4. On login, credentials are verified
5. A **JWT token** is generated and returned
6. The frontend stores the token in `localStorage`
7. Protected pages check for token presence in localStorage
8. Logout removes the token from `localStorage`

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
- **MongoDB / Mongoose** (database)
- `bcryptjs` (password hashing)
- `jsonwebtoken` (JWT authentication)
- `cors`
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
   ├─ models/            # Mongoose schemas (User, Score, etc.)
   ├─ routes/            # API routes (Auth, Scores, etc.)
   └─ package.json
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

Requires a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

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
- Better session handling
- Socket.io for real-time multiplayer
- Additional mini-games

---

## 👨‍💻 Credits
Design and development by **Jai**.  
Built for learning, experimentation, and gradual improvement.
