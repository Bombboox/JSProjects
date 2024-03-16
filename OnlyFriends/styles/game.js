//Socket.io
var socket = io();

//Rendering
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

//Game Stuff
const PLAYER_SPEED = 5;
const keyboard = [];
var px = py = 0;
var p2x = p2y = 0;
var moving = false;

socket.on("move", ({x, y}) => {
    p2x = x;
    p2y = y;
});

function main() {
    canvas.width = 700;
    canvas.height = 700;
    canvas.style = "background-color: black;";
    
    document.body.appendChild(canvas);
    
    document.addEventListener("keydown", (e) => {keyboard[e.keyCode] = true});
    document.addEventListener("keyup", (e) => {keyboard[e.keyCode] = false});


    requestAnimationFrame(draw);
}

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(p2x, p2y, 25, 25);

    ctx.fillStyle = "white";
    ctx.fillRect(px, py, 25, 25);

    movement();

    if(moving) {
        socket.emit("move", {x : px, y: py});
    }
}

function movement() {
    let ix = px; 
    let iy = py;

    if(keyboard[37]) {
        px -= PLAYER_SPEED;
    }
    if(keyboard[38]) {
        py -= PLAYER_SPEED;
    }
    if(keyboard[39]) {
        px += PLAYER_SPEED;
    }
    if(keyboard[40]) {
        py += PLAYER_SPEED;
    }

    if(ix == px && iy == py) {
        moving = false
    } else {
        moving = true;
    }
}

window.onload = main;