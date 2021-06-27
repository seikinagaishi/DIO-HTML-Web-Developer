// Setup

const canvas    = document.querySelector('#snake');
const sprite    = canvas.getContext('2d');
const pixelSize = 16;
const boardSize = 32;

// Game Variables

let snake = [];

// Snake initializes at the center
snake[0] = {
    x: (boardSize / 2) * pixelSize,
    y: (boardSize / 2) * pixelSize
}

// Current direction (starts going to the right)
let direction = 'right';

// Loads the first point
let point = {
    x: Math.floor(Math.random() * (boardSize - 1) + 1) * pixelSize,
    y: Math.floor(Math.random() * (boardSize - 1) + 1) * pixelSize
}

// Bindings

document.addEventListener('keydown', update);

function update(event) {
    // Press UP
    if((event.code == 'ArrowUp' || event.code == 'KeyW') && direction != 'down') {
        direction = 'up';
    }

    // Press Down
    if((event.code == 'ArrowDown' || event.code == 'KeyS') && direction != 'up') {
        direction = 'down';
    }

    // Press Left
    if((event.code == 'ArrowLeft' || event.code == 'KeyA') && direction != 'right') {
        direction = 'left';
    }

    // Press Right
    if((event.code == 'ArrowRight' || event.code == 'KeyD') && direction != 'left') {
        direction = 'right';
    }
}

// Game Functions

function generateStage() {
    sprite.fillStyle = 'lightgreen';
    sprite.fillRect(
        0,                      //horizontal position
        0,                      //vertical position
        boardSize * pixelSize,  //horizontal size
        boardSize * pixelSize   //vertical size
    );
}

function generateSnake() {
    for(i = 0; i < snake.length; i++) {
        sprite.fillStyle = 'green';
        sprite.fillRect(
            snake[i].x, 
            snake[i].y, 
            pixelSize, 
            pixelSize
        );
    }
}

function generatePoint() {
    sprite.fillStyle = 'red';
    sprite.fillRect(
        point.x, 
        point.y, 
        pixelSize, 
        pixelSize);
}

function gameOver() {
    clearInterval(game);
    alert('Game over');
}

function refresh() {
    // Collision with the wall
    if(snake[0].y < 0 * pixelSize && direction == 'up') {
        // snake[0].y = boardSize * pixelSize;
        gameOver();
    }

    if(snake[0].y > (boardSize - 1) * pixelSize && direction == 'down') {
        // snake[0].y = 0;
        gameOver();
    }

    if(snake[0].x < 0 * pixelSize && direction == 'left') {
        // snake[0].x = boardSize * pixelSize;
        gameOver();
    }

    if(snake[0].x > (boardSize - 1) * pixelSize && direction == 'right') {
        // snake[0].x = 0;
        gameOver();
    }

    // Collision with its own body
    if(snake.find((bodyPiece) => bodyPiece != snake[0] && bodyPiece.x == snake[0].x && bodyPiece.y == snake[0].y)) {
        gameOver();
    }

    // Refresh current game state
    generateStage();
    generateSnake();
    generatePoint();

    // Calculates its new position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(direction) {
        case 'up':
            snakeY -= pixelSize;
            break;
        case 'down':
            snakeY += pixelSize;
            break;
        case 'left':
            snakeX -= pixelSize;
            break;
        case 'right':
            snakeX += pixelSize;
            break;
    }

    if(snakeX != point.x || snakeY != point.y) {
        // Since it's always growing, if it didn't eat a point it'll lose its growth
        snake.pop();
    
    } else {
        // Generates a new random point
        point.x = Math.floor(Math.random() * (boardSize - 1) + 1) * pixelSize;
        point.y = Math.floor(Math.random() * (boardSize - 1) + 1) * pixelSize;
    }    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(refresh, 75);