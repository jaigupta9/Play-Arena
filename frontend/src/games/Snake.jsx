import { useState, useEffect, useRef, useCallback } from 'react';
import './Snake.css';

const ROWS = 20;
const COLS = 20;

export default function Snake() {
    const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
    const [food, setFood] = useState({ row: 5, col: 5 });
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        Number(localStorage.getItem("snakeHighScore")) || 0
    );
    
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Refs for fast mutable state access inside closures without triggering re-renders
    const directionRef = useRef({ row: 0, col: 1 });
    const lastDirection = useRef({ row: 0, col: 1 });
    const foodRef = useRef(food);
    const scoreRef = useRef(score);
    const highScoreRef = useRef(highScore);
    
    // Status refs for the keydown listener
    const isRunningRef = useRef(isRunning);
    const isPausedRef = useRef(isPaused);
    const isGameOverRef = useRef(isGameOver);

    // Keep refs fully synchronized with React state
    useEffect(() => {
        foodRef.current = food;
        scoreRef.current = score;
        highScoreRef.current = highScore;
        isRunningRef.current = isRunning;
        isPausedRef.current = isPaused;
        isGameOverRef.current = isGameOver;
    }, [food, score, highScore, isRunning, isPaused, isGameOver]);

    // gameOver has no dependencies, so it never resets the game loop interval
    const gameOver = useCallback(() => {
        setIsRunning(false);
        setIsGameOver(true);
        if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current);
            localStorage.setItem("snakeHighScore", String(scoreRef.current));
        }
    }, []);

    // Main Game Loop
    useEffect(() => {
        if (!isRunning || isPaused || isGameOver) return;

        const interval = setInterval(() => {
            // Commit the direction for this exact tick to prevent impossible rapid-turn suicides
            lastDirection.current = directionRef.current;
            const currentDir = directionRef.current;

            // Use functional state updates to guarantee we NEVER use a stale snake array
            setSnake(prevSnake => {
                const head = {
                    row: prevSnake[0].row + currentDir.row,
                    col: prevSnake[0].col + currentDir.col
                };

                // Check wall and self collisions
                if (head.row < 0 || head.row >= ROWS || head.col < 0 || head.col >= COLS ||
                    prevSnake.some(s => s.row === head.row && s.col === head.col)) {
                    gameOver();
                    return prevSnake; 
                }

                const newSnake = [head, ...prevSnake];

                // Check food collection
                if (head.row === foodRef.current.row && head.col === foodRef.current.col) {
                    setScore(s => s + 1);
                    
                    // Generate new food, ensuring it doesn't spawn inside the snake
                    let r, c;
                    let isOccupied;
                    do {
                        r = Math.floor(Math.random() * ROWS);
                        c = Math.floor(Math.random() * COLS);
                        isOccupied = newSnake.some(s => s.row === r && s.col === c);
                    } while (isOccupied);
                    setFood({ row: r, col: c });
                } else {
                    newSnake.pop(); // Remove tail if no food was eaten to maintain length
                }

                return newSnake;
            });
        }, 120); // 120ms tick rate for a smooth, responsive feel

        return () => clearInterval(interval);
    }, [isRunning, isPaused, isGameOver, gameOver]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            
            // Prevent browser scrolling when playing
            if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
                e.preventDefault();
            }

            if (key === " ") {
                if (!isRunningRef.current && !isGameOverRef.current) {
                     startGame();
                     return;
                }
                if (isRunningRef.current && !isGameOverRef.current) {
                    setIsPaused(p => !p);
                }
                return;
            }

            if (key === "enter") {
                if (!isRunningRef.current) startGame();
                return;
            }

            if (!isRunningRef.current || isPausedRef.current || isGameOverRef.current) return;

            const lastDir = lastDirection.current;

            // Update intended direction, but prevent strictly reverse movements
            if ((key === "arrowup" || key === "w") && lastDir.row !== 1) {
                directionRef.current = { row: -1, col: 0 };
            }
            if ((key === "arrowdown" || key === "s") && lastDir.row !== -1) {
                directionRef.current = { row: 1, col: 0 };
            }
            if ((key === "arrowleft" || key === "a") && lastDir.col !== 1) {
                directionRef.current = { row: 0, col: -1 };
            }
            if ((key === "arrowright" || key === "d") && lastDir.col !== -1) {
                directionRef.current = { row: 0, col: 1 };
            }
        };

        // Attach listener exactly once to prevent dropped inputs
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const startGame = () => {
        setSnake([{ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) }]);
        directionRef.current = { row: 0, col: 1 };
        lastDirection.current = { row: 0, col: 1 };
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        setIsRunning(true);
        
        let r, c;
        do {
            r = Math.floor(Math.random() * ROWS);
            c = Math.floor(Math.random() * COLS);
        } while (r === Math.floor(ROWS / 2) && c === Math.floor(COLS / 2));
        setFood({ row: r, col: c });
    };

    return (
        <div className="snake-card">
            <h2>Snake Game</h2>
            <div className="scoreboard">
                <p>Score: <span>{score}</span></p>
                <p>High Score: <span>{highScore}</span></p>
            </div>
            <div className="snake-board">
                {Array.from({ length: ROWS * COLS }).map((_, i) => {
                    const row = Math.floor(i / COLS);
                    const col = i % COLS;
                    const isSnake = snake.some(s => s.row === row && s.col === col);
                    const isFood = food.row === row && food.col === col;

                    return (
                        <div
                            key={i}
                            className={`snake-cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                        />
                    );
                })}
            </div>
            <div className="actions">
                {!isRunning && !isGameOver && <button className="btn" onClick={startGame}>Start Game</button>}
                {isGameOver && <button className="btn" onClick={startGame}>Play Again</button>}
                {isRunning && <button className="btn" onClick={() => setIsPaused(p => !p)}>{isPaused ? 'Resume' : 'Pause'}</button>}
            </div>
            {isGameOver && <div style={{marginTop: '10px', color: '#ff5555', fontSize: '1.2rem', fontWeight: 'bold'}}>Game Over!</div>}
        </div>
    );
}
