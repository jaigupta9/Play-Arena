const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const box = 20; // size of each snake segment

let snake = [{ x: 8 * box, y: 8 * box }];
let dir = null;
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
    else if (e.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
    else if (e.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
    else if (e.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
});

function draw() {
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(s.x, s.y, box, box);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(s.x, s.y, box, box);
    });

    // draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // move snake
    let head = { ...snake[0] };
    if (dir === "UP") head.y -= box;
    else if (dir === "DOWN") head.y += box;
    else if (dir === "LEFT") head.x -= box;
    else if (dir === "RIGHT") head.x += box;

    // check collision with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(s => s.x === head.x && s.y === head.y)) {
        alert("Game Over! Score: " + score);
        snake = [{ x: 8 * box, y: 8 * box }];
        dir = null;
        score = 0;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        document.getElementById("score").textContent = "Score: 0";
        return;
    }

    snake.unshift(head);

    // eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop();
    }
}

setInterval(draw, 100);
