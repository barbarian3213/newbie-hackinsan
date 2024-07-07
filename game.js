const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let snakeX = 1, snakeY = 2;
let velocityX = 0, velocityY = 0;
let snakeBody = [[5, 5]]; // Initialize snake body with one segment
let score = 0;
let moving = false;
let intervalId = null; // To store the interval ID

// Define the maze walls
const mazeWalls = [];
for (let i = 1; i <= 31; i++) {
  mazeWalls.push({x: i, y: 1});
  if (i != 2) {
    mazeWalls.push({x: 1, y: i});
  }
  mazeWalls.push({x: i, y: 31});
  mazeWalls.push({x: 31, y: i});
  if (i != 12 && i != 24 && i != 26 && i != 28 && i != 30) {
    mazeWalls.push({x: 3, y: i});
  }
  if (i != 4 && i != 6 && i != 14 && i != 16 && i != 20 && i != 30) {
    mazeWalls.push({x: 5, y: i});
  }
  if (i != 2 && i != 8 && i != 10 && i != 12 && i != 16 && i != 18 && i != 22 && i != 26 && i != 28 && i != 30) {
    mazeWalls.push({x: 7, y: i});
  }
  if (i != 2 && i != 12 && i != 14 && i != 16 && i != 22 && i != 24 && i != 26) {
    mazeWalls.push({x: 9, y: i});
  }
  if (i != 8 && i != 10 && i != 14 && i != 16 && i != 18 && i != 20 && i != 22 && i != 24 && i != 26 && i != 28 && i != 30) {
    mazeWalls.push({x: 11, y: i});
  }
  if (i != 2 && i != 8 && i != 10 && i != 16 && i != 22 && i != 30) {
    mazeWalls.push({x: 13, y: i});
  }
  if (i != 6 && i != 10 && i != 16 && i != 18 && i != 24 && i != 30) {
    mazeWalls.push({x: 15, y: i});
  }
  if (i != 2 && i != 4 && i != 6 && i != 8 && i != 12 && i != 14 && i != 16 && i != 20 && i != 22 && i != 26 && i != 30) {
    mazeWalls.push({x: 17, y: i});
  }
  if (i != 2 && i != 10 && i != 14 && i != 16 && i != 20 && i != 22 && i != 26 && i != 30) {
    mazeWalls.push({x: 19, y: i});
  } 
  if (i != 4 && i != 6 && i != 10 && i != 14 && i != 16 && i != 20 && i != 28 && i != 30) {
    mazeWalls.push({x: 21, y: i});
  }
  if (i != 12 && i != 16 && i != 20) {
    mazeWalls.push({x: 23, y: i});
  }
  if (i != 2 && i != 4 && i != 6 && i != 12 && i != 14 && i != 18 && i != 20 && i != 22 && i != 24 && i != 26 && i != 30) {
    mazeWalls.push({x: 25, y: i});
  }
  if (i != 2 && i != 6 && i != 8 && i != 14 && i != 20 && i != 28) {
    mazeWalls.push({x: 27, y: i});
  }
  if (i != 2 && i != 4 && i != 8 && i != 12 && i != 14 && i != 16 && i != 18 && i != 22 && i != 24 && i != 28 && i != 30) {
    mazeWalls.push({x: 29, y: i});
  }
}
mazeWalls.push(
  { x: 2, y: 25},
  { x: 2, y: 29},
  { x: 4, y: 5},
  { x: 4, y: 15},
  { x: 4, y: 19},
  { x: 4, y: 23},
  { x: 4, y: 25},
  { x: 4, y: 27},
  { x: 4, y: 5},
  { x: 6, y: 5},
  { x: 6, y: 7},
  { x: 6, y: 11},
  { x: 6, y: 13},
  { x: 6, y: 17},
  { x: 6, y: 21},
  { x: 6, y: 25},
  { x: 6, y: 29},
  { x: 8, y: 3},
  { x: 8, y: 9},
  { x: 8, y: 15},
  { x: 8, y: 23},
  { x: 8, y: 25},
  { x: 8, y: 27},
  { x: 10, y: 9},
  { x: 10, y: 13},
  { x: 10, y: 15},
  { x: 10, y: 17},
  { x: 10, y: 19},
  { x: 10, y: 21},
  { x: 10, y: 23},
  { x: 10, y: 27},
  { x: 12, y: 3},
  { x: 12, y: 11},
  { x: 12, y: 21},
  { x: 12, y: 25},
  { x: 12, y: 29},
  { x: 14, y: 7},
  { x: 14, y: 9},
  { x: 14, y: 13},
  { x: 14, y: 17},
  { x: 14, y: 21},
  { x: 14, y: 25},
  { x: 16, y: 5},
  { x: 16, y: 7},
  { x: 16, y: 11},
  { x: 16, y: 15},
  { x: 16, y: 19},
  { x: 16, y: 23},
  { x: 16, y: 25},
  { x: 16, y: 27},
  { x: 18, y: 3},
  { x: 18, y: 9},
  { x: 18, y: 13},
  { x: 18, y: 15},
  { x: 18, y: 17},
  { x: 18, y: 21},
  { x: 18, y: 23},
  { x: 18, y: 29},
  { x: 20, y: 3},
  { x: 20, y: 7},
  { x: 20, y: 11},
  { x: 20, y: 15},
  { x: 20, y: 21},
  { x: 20, y: 23},
  { x: 20, y: 29},
  { x: 22, y : 5},
  { x: 22, y : 11},
  { x: 22, y : 17},
  { x: 22, y : 27},
  { x: 24, y: 5},
  { x: 24, y: 7},
  { x: 24, y: 13},
  { x: 24, y: 17},
  { x: 24, y: 19},
  { x: 24, y: 21},
  { x: 24, y: 25},
  { x: 26, y: 3},
  { x: 26, y: 7},
  { x: 26, y: 11},
  { x: 26, y: 13},
  { x: 26, y: 15},
  { x: 26, y: 23},
  { x: 26, y: 27},
  { x: 28, y: 5},
  { x: 28, y: 7},
  { x: 28, y: 9},
  { x: 28, y: 13},
  { x: 28, y: 15},
  { x: 28, y: 17},
  { x: 28, y: 21},
  { x: 28, y: 25},
  { x: 28, y: 29},
  { x: 30, y: 3},
  { x: 30, y: 17},
  { x: 30, y: 23},
  { x: 30, y: 27}
);

// Define specific food locations
let foodPositions = [
  { x: 4, y: 2 },
  { x: 4, y: 26 },
  { x: 18, y: 28 },
  { x: 28, y: 30 },
  { x: 24, y: 6 },
  { x: 8, y: 4 },
  { x: 20, y: 2 },
  { x: 30, y: 26 },
  { x: 10, y: 20 },
  { x: 20, y: 22 },
  { x: 20, y: 8 },
  { x: 4, y: 22 },
  { x: 26, y: 10 },
  { x: 14, y: 12 },
  { x: 26, y: 16 }
];

// Keep track of eaten food items
let eatenFoods = new Array(foodPositions.length).fill(false);

// Get high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Highest Score: ${highScore}`;


// Handle keydown events for continuous movement
const handleKeyDown = (e) => {
    if (e.key === "w") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "s") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "a") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "d") {
        velocityX = 1;
        velocityY = 0;
    }

    if (!moving) {
        moving = true;
        startMoving();
    }
}

// Handle keyup events to stop the movement
const handleKeyUp = (e) => {
    velocityX = 0;
    velocityY = 0;
    moving = false;
    stopMoving();
}

// Move snake continuously while a key is pressed
const startMoving = () => {
    if (!intervalId) {
        intervalId = setInterval(moveSnake, 50); // Adjust the interval value to control speed (e.g., 200ms)
    }
}

// Stop moving the snake
const stopMoving = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Move snake and handle game logic
const moveSnake = () => {
    if (gameOver) return;

    let nextX = snakeX + velocityX;
    let nextY = snakeY + velocityY;

    // Check if snake is going out of bounds or hitting a wall
    if (nextX < 1 || nextX > 31 || nextY < 1 || nextY > 31 || mazeWalls.some(wall => wall.x === nextX && wall.y === nextY)) {
        return handleGameOver();
    }

    snakeX = nextX;
    snakeY = nextY;

    let html = "";

    // Check if snake eats any food
    foodPositions.forEach((food, index) => {
        if (!eatenFoods[index] && snakeX === food.x && snakeY === food.y) {
            eatenFoods[index] = true;
            score++;
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            scoreElement.innerText = `Score: ${score}`;
            highScoreElement.innerText = `Highest Score: ${highScore}`;
            let boxes = document.querySelectorAll(`.box${score}`);
            boxes.forEach(box => {
              box.style.display = 'grid';
            });
        }

        // Only display food if it hasn't been eaten
        if (!eatenFoods[index]) {
            html += `<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`;
        }
    });

    // Update snake body
    snakeBody.unshift([snakeX, snakeY]);
    snakeBody.pop(); // Always remove the last segment to maintain the same length

    // Render snake
    snakeBody.forEach(segment => {
        html += `<div class="head" style="grid-area: ${segment[1]} / ${segment[0]}"></div>`;
    });

    // Render maze walls
    mazeWalls.forEach(wall => {
        html += `<div class="wall" style="grid-area: ${wall.y} / ${wall.x}; background-color: purple;"></div>`;
    });

    playBoard.innerHTML = html;
}

// Set up key event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Initial render
moveSnake();
