import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicTacToe.css';

export default function TicTacToe() {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState(Array(9).fill(""));
    const [scores, setScores] = useState({ X: 0, O: 0 });

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWin = (board) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], pattern };
            }
        }
        return null;
    };

    // Derive critical UI state directly from the game board to completely eliminate state desyncs
    const winData = checkWin(gameState);
    const winningPattern = winData ? winData.pattern : null;
    const winner = winData ? winData.winner : null;
    const isDraw = !winner && !gameState.includes("");

    const xMoves = gameState.filter(c => c === "X").length;
    const oMoves = gameState.filter(c => c === "O").length;
    const currentPlayer = xMoves === oMoves ? "X" : "O";

    const statusMsg = winner 
        ? `${winner} Wins! 🎉` 
        : isDraw 
            ? "It's a Draw! 🤝" 
            : `Turn: ${currentPlayer}`;

    // Safely update scores only when a new winner is declared
    useEffect(() => {
        const saveScore = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/api/score`, 
                        { game: 'tic-tac-toe', score: 1 },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            } catch (err) {
                console.error("Failed to save score", err);
            }
        };

        if (winner) {
            setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
            if (winner === "X") { // Assuming the logged in user is Player X
                saveScore();
            }
        }
    }, [winner]);

    const handleClick = (index) => {
        if (gameState[index] !== "" || winner || isDraw) return;

        setGameState(prevBoard => {
            // Guard against stale closures and race conditions (e.g., fast double clicks)
            if (prevBoard[index] !== "" || checkWin(prevBoard)) return prevBoard;

            const nextPlayer = prevBoard.filter(c => c === "X").length === prevBoard.filter(c => c === "O").length ? "X" : "O";
            const newBoard = [...prevBoard];
            newBoard[index] = nextPlayer;

            return newBoard;
        });
    };

    const resetGame = () => {
        setGameState(Array(9).fill(""));
    };

    return (
        <div className="ttt-card">
            <h2>Tic Tac Toe</h2>
            <div className="scoreboard">
                <p>Player X: <span>{scores.X}</span> | Player O: <span>{scores.O}</span></p>
            </div>
            <div className="status">{statusMsg}</div>
            <div className="ttt-board">
                {gameState.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`ttt-cell ${cell} ${cell !== "" ? 'taken' : ''} ${winningPattern?.includes(index) ? 'winner' : ''}`}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            <div className="actions">
                <button className="btn" onClick={resetGame}>Reset Game</button>
                <button className="btn" onClick={() => navigate('/leaderboard/tic-tac-toe')}>View Leaderboard</button>
            </div>
        </div>
    );
}
