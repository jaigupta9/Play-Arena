import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RockPaperScissors from './games/RockPaperScissors';
import Snake from './games/Snake';
import TicTacToe from './games/TicTacToe';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/rps" element={<ProtectedRoute><RockPaperScissors /></ProtectedRoute>} />
          <Route path="/games/snake" element={<ProtectedRoute><Snake /></ProtectedRoute>} />
          <Route path="/games/tic-tac-toe" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;