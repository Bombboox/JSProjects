//Rendering
const canvas = document.getElementById("ab");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 900;

//Game Stuff
const PLAYER_SPEED = 5;
const GRAVITY = 0.5;
const JUMP_STRENGTH = 8;
const MAX_JUMP_HOLD = 15;
const keyboard = [];
const players = {};
var px = 50;
var py = canvas.height;
var pw = 25;
var ph = 25;
var vy = 0;
var jumpHoldTime = 0;
var moving = false;
var animationFrame;

// Obstacles
const obstacles = [
    {x: 200, y: 800, width: 400, height: 50},
    {x: 675, y: 625, width: 100, height: 100},
    {x: 800, y: 500, width: 300, height: 50},
    {x: 800, y: 300, width: 300, height: 50},
    {x: 600, y: 300, width: 50, height: 50},
    {x: 400, y: 300, width: 50, height: 50},
    {x: 200, y: 300, width: 50, height: 50},
    {x: 0, y: 150, width: 50, height: 50},
    {x: 1200, y: 400, width: 200, height: 50}
];

socket.on('move', ({x, y, playerId}) => {
    players[playerId].x = x;
    players[playerId].y = y;
});

socket.on('playerJoined', (playerId) => {
    players[playerId] = {playerId: playerId, x:0, y:0};
    emitMovement();
});

socket.on('playerLeft', (playerId) => {
    delete players[playerId];
});

socket.on('currentPlayers', (users) => {
    console.log(users);
    for(user in users) {
        let playerId = users[user];
        players[playerId] = {x: 0, y: 0, playerId: playerId};
    }
});

function initialize() {
    document.addEventListener('keydown', (e) => {keyboard[e.keyCode] = true});
    document.addEventListener('keyup', (e) => {keyboard[e.keyCode] = false});

    animationFrame = requestAnimationFrame(draw);
}

function draw() {
    animationFrame = requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw obstacles
    ctx.fillStyle = 'gray';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    ctx.fillStyle = 'blue';
    for(const player in players) {
        let p = players[player];
        ctx.fillRect(p.x, p.y, 25, 25);
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(px, py, 25, 25);

    movement();

    if(moving) {
        emitMovement();
    }
}

function emitMovement() {
    socket.emit('move', {roomId: roomId, x : px, y: py});
}

function movement() {
    let ix = px; 
    let iy = py;

    // Horizontal movement
    if(keyboard[37]) {
        px -= PLAYER_SPEED;
    }
    if(keyboard[39]) {
        px += PLAYER_SPEED;
    }

    // Jumping
    if(keyboard[90] || keyboard[38]) { // Z key
        if(isOnGround()) {
            vy = -JUMP_STRENGTH;
            jumpHoldTime = 0;
        } else if(jumpHoldTime < MAX_JUMP_HOLD) {
            vy -= 0.5;
            jumpHoldTime++;
        }
    } else {
        jumpHoldTime = MAX_JUMP_HOLD;
    }

    // Apply gravity
    vy += GRAVITY;
    py += vy;

    // Collision detection
    handleCollisions();

    if(ix == px && iy == py) {
        moving = false;
    } else {
        moving = true;
    }
}

function handleCollisions() {
    // Ground collision
    if (py + 25 > canvas.height) {
        py = canvas.height - 25;
        vy = 0;
    }

    if(px + 25 > canvas.width) {
        px = canvas.width - 25;
        vx = 0;
    }

    if(px < 0) {
        px = 0;
        vx = 0;
    }

    // Obstacle collisions
    for (let obstacle of obstacles) {
        if (px < obstacle.x + obstacle.width &&
            px + 25 > obstacle.x &&
            py < obstacle.y + obstacle.height &&
            py + 25 > obstacle.y) {
            
            // Collision detected, resolve it
            let overlapLeft = (px + 25) - obstacle.x;
            let overlapRight = (obstacle.x + obstacle.width) - px;
            let overlapTop = (py + 25) - obstacle.y;
            let overlapBottom = (obstacle.y + obstacle.height) - py;

            // Find the smallest overlap
            let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapLeft) {
                px = obstacle.x - 25;
            } else if (minOverlap === overlapRight) {
                px = obstacle.x + obstacle.width;
            } else if (minOverlap === overlapTop) {
                py = obstacle.y - 25;
                vy = 0;
            } else if (minOverlap === overlapBottom) {
                py = obstacle.y + obstacle.height;
                jumpHoldTime = MAX_JUMP_HOLD;
                vy = Math.max(0, vy);
                
            }
        }
    }
}

function isOnGround() {
    if (py + 25 >= canvas.height) {
        return true;
    }
    for (let obstacle of obstacles) {
        if (px < obstacle.x + obstacle.width &&
            px + 25 > obstacle.x &&
            py + 25 === obstacle.y) {
            return true;
        }
    }
    return false;
}