const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score = 0;
let box = 30;


let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box
}
let dir;
let dirChanged = false;
document.addEventListener('keydown', e => {
    if (!dirChanged) {
        if (e.keyCode == 87 && dir != 'down') {
            dir = 'up';
            dirChanged = true;
        } else if (e.keyCode == 65 && dir != 'right') {
            dir = 'left';
            dirChanged = true;
        } else if (e.keyCode == 68 && dir != 'left') {
            dir = 'right';
            dirChanged = true;
        } else if (e.keyCode == 83 && dir != 'up') {
            dir = 'down';
            dirChanged = true;
        }
    }
})


let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
}

let bomb = {
    x: Math.floor(Math.random() * 17 + 3) * box,
    y: Math.floor(Math.random() * 17 + 3) * box
}



function game() {
    dirChanged = false;

    // GROUND
    ctx.fillStyle = '#f6d7b0';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    ctx.fillStyle = '#C8D283';
    ctx.fillRect(box, box, canvas.width - 2 * box, canvas.height - 2 * box); 
    //


    // FOOD
    ctx.fillStyle = "#ffd61d";
    ctx.fillRect(food.x, food.y, box, box);
    // 

    // BOMB
    ctx.fillStyle = "grey";
    ctx.fillRect(bomb.x, bomb.y, box, box);
    //


    // SNAKE
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'orangered' : 'orange';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeY >= 600) snakeY = 0;
    if (snakeY < 0) snakeY = 600 - box;
    if (snakeX >= 600) snakeX = 0;
    if (snakeX < 0) snakeX = 600 - box;

    if (dir == 'up') snakeY -= box;
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'down') snakeY += box;
    // 


    // SCORE
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(score, 15, 40);
    //

    // SCORE++
    if(snake[0].x == food.x && snake[0].y == food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        }
        bomb = {
            x: Math.floor(Math.random() * 17 + 3) * box,
            y: Math.floor(Math.random() * 17 + 3) * box
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead)
    // 


    // SCORE--
    if(snake[0].x == bomb.x && snake[0].y == bomb.y) {
        score--
        snake.pop();
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        }
        bomb = {
            x: Math.floor(Math.random() * 17 + 3) * box,
            y: Math.floor(Math.random() * 17 + 3) * box
        }
    }
    //

        
    // TAIL
    for(let i = 1; i < snake.length; i++) {
        if(snakeX == snake[i].x && snakeY == snake[i].y) {
            score -= snake.slice(i, snake.length).length;
            snake = snake.slice(0, i);
            break;
        }
    }
    //

    
    // GAMEOVER
    if(score < 0) {
        alert('You lose!');
        location.replace(document.URL);
        score = 1;
    }
    else if(score == 100) {
        alert('You won!');
        location.replace(document.URL);
        score = 1;
    }
    //
}

let gameInterval = setInterval(game, 100);
