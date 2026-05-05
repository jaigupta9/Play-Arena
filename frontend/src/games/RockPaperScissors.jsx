import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RockPaperScissors.css';

export default function RockPaperScissors() {
    const navigate = useNavigate();
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [resultMsg, setResultMsg] = useState("Make your move!");
    const [lastPlayerMove, setLastPlayerMove] = useState(null);
    const [lastOutcome, setLastOutcome] = useState(null);

    const choices = ["rock", "paper", "scissors"];

    const play = (playerChoice) => {
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        let outcome;
        if (playerChoice === computerChoice) {
            outcome = "draw";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            outcome = "win";
        } else {
            outcome = "lose";
        }

        setLastPlayerMove(playerChoice);
        setLastOutcome(outcome);

        if (outcome === "win") {
            setPlayerScore(prev => prev + 1);
            setResultMsg(`You chose ${playerChoice}, Computer chose ${computerChoice}. You Win! 🎉`);
            
            // Save win to backend
            const saveScore = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (token) {
                        await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/score`, 
                            { game: 'rps', score: 1 },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    }
                } catch (err) {
                    console.error("Failed to save score", err);
                }
            };
            saveScore();
            
        } else if (outcome === "lose") {
            setComputerScore(prev => prev + 1);
            setResultMsg(`You chose ${playerChoice}, Computer chose ${computerChoice}. You Lose 😢`);
        } else {
            setResultMsg(`You chose ${playerChoice}, Computer chose ${computerChoice}. It's a Draw! 🤝`);
        }
    };

    const resetGame = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setResultMsg("Make your move!");
        setLastPlayerMove(null);
        setLastOutcome(null);
    };

    return (
        <div className="rps-card">
            <h2>Rock Paper Scissors</h2>
            <div className="scoreboard">
                <p>Player: <span>{playerScore}</span> | Computer: <span>{computerScore}</span></p>
            </div>
            <div className="status">{resultMsg}</div>
            <div className="choices">
                {choices.map(choice => (
                    <button
                        key={choice}
                        onClick={() => play(choice)}
                        className={`choice-btn ${lastPlayerMove === choice ? lastOutcome : ''}`}
                    >
                        {choice === "rock" ? "✊" : choice === "paper" ? "✋" : "✌️"}
                    </button>
                ))}
            </div>
            <div className="actions">
                <button className="btn" onClick={resetGame}>Reset Game</button>
                <button className="btn" onClick={() => navigate('/leaderboard/rps')}>View Leaderboard</button>
            </div>
        </div>
    );
}
