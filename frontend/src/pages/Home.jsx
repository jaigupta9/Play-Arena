import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isAuthenticated } = useAuth();

  const games = [
    { 
      id: 'tic-tac-toe', 
      name: 'Tic Tac Toe', 
      path: '/games/tic-tac-toe', 
      icon: '❌⭕', 
      description: 'Classic 3x3 grid game. Match three to win!',
      category: 'Board'
    },
    { 
      id: 'rps', 
      name: 'Rock Paper Scissors', 
      path: '/games/rps', 
      icon: '✊✋✌️', 
      description: 'Test your luck against the computer.',
      category: 'Casual'
    },
    { 
      id: 'snake', 
      name: 'Snake', 
      path: '/games/snake', 
      icon: '🐍', 
      description: 'Eat food and grow, but do not bite yourself!',
      category: 'Arcade'
    },
    { 
      id: 'tetris', 
      name: 'Tetris', 
      path: '#', 
      icon: '🧱', 
      description: 'Stack falling blocks to clear lines.',
      category: 'Arcade'
    },
    { 
      id: 'memory-match', 
      name: 'Memory Match', 
      path: '#', 
      icon: '🃏', 
      description: 'Flip cards to find matching pairs.',
      category: 'Puzzle'
    },
    { 
      id: 'quiz', 
      name: 'Quiz', 
      path: '#', 
      icon: '🧠', 
      description: 'Test your knowledge with trivia questions.',
      category: 'Casual'
    },
    { 
      id: 'puzzle', 
      name: 'Puzzle', 
      path: '#', 
      icon: '🧩', 
      description: 'Piece together the scrambled image.',
      category: 'Puzzle'
    },
    { 
      id: 'word-hunt', 
      name: 'Word Hunt', 
      path: '#', 
      icon: '📚', 
      description: 'Find hidden words in the grid.',
      category: 'Puzzle'
    }
  ];

  const handleCardClick = (path) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = game.name.toLowerCase().includes(searchLower) || 
                          game.description.toLowerCase().includes(searchLower);
                          
    return matchesCategory && matchesSearch;
  });

  const featuredGame = games.find(g => g.id === 'tic-tac-toe');

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  console.log("Token:", localStorage.getItem("token"));

  return (
    <div className="fade-in">
      <div className="hero">
        <h1>Welcome to Play Arena!</h1>
        {!isAuthenticated && <p>Please Login or Register to play games.</p>}
      </div>

      {isAuthenticated && (
        <>
          <div className="featured">
            <h2>Featured Game of the Week</h2>
            <div className="featured-card">
              <div className="featured-card-icon">{featuredGame.icon}</div>
              <div className="featured-info">
                <h3>{featuredGame.name}</h3>
                <p>{featuredGame.description}</p>
                <button 
                  className="btn"
                  onClick={() => handleCardClick(featuredGame.path)}
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>

          <div className="games">
            <h2>All Games</h2>
            
            <div className="search-filter">
              <input 
                type="text" 
                placeholder="Search games..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="arcade">Arcade</option>
                <option value="board">Board</option>
                <option value="casual">Casual</option>
                <option value="puzzle">Puzzle</option>
              </select>
            </div>

            <div className="game-menu">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <div 
                    key={game.id} 
                    className="game-card"
                    onClick={() => handleCardClick(game.path)}
                  >
                    <div className="game-card-icon">{game.icon}</div>
                    <h3>{game.name}</h3>
                    <p className="game-desc">{game.description}</p>
                    <button 
                      className="btn play-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(game.path);
                      }}
                    >
                      Play Now
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666', gridColumn: '1 / -1' }}>No games found matching your search.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
