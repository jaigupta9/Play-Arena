import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="logo">Play Arena</NavLink>
        <div className="nav-links">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
              <NavLink to="/register" className={({isActive}) => isActive ? "active" : ""}>Register</NavLink>
              <NavLink to="/leaderboard/snake" className={({isActive}) => isActive ? "active" : ""}>Leaderboards</NavLink>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <NavLink to="/leaderboard/snake" className={({isActive}) => isActive ? "active" : ""}>Leaderboards</NavLink>
              <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
                Hi, {user?.username || user?.email?.split('@')[0] || 'Player'}
              </span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
