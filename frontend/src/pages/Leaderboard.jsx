import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

export default function Leaderboard() {
  const { game } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gamesList = [
    { id: 'snake', name: 'Snake' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe' },
    { id: 'rps', name: 'Rock Paper Scissors' }
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard/${game}`);
        setLeaderboard(response.data);
      } catch (err) {
        setError('Failed to fetch leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (game) {
      fetchLeaderboard();
    }
  }, [game]);

  const handleTabClick = (gameId) => {
    navigate(`/leaderboard/${gameId}`);
  };

  return (
    <div className="leaderboard-container fade-in">
      <div className="leaderboard-card">
        <h2>🏆 Leaderboards</h2>
        
        <div className="leaderboard-tabs">
          {gamesList.map(g => (
            <button 
              key={g.id} 
              className={`tab-btn ${game === g.id ? 'active' : ''}`}
              onClick={() => handleTabClick(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>{game === 'snake' ? 'Score' : 'Wins'}</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={entry._id} className={index < 3 ? `top-${index + 1}` : ''}>
                      <td>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </td>
                      <td className="player-name">{entry.username}</td>
                      <td className="score-value">{entry.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-data">No scores yet. Be the first to play!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
