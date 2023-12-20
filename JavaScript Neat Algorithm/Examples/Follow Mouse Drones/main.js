const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
var SPEED = 10;
var GENERATION_LIFESPAN = 1500;
var frames = 0;

var loop = true;
var population = new Population(150, Drone);
var mouseX = 350;
var mouseY = 350;

//initialize everything
const main = () => {
    canvas.style = "border: solid; border-color: green; background: black;";
    canvas.width = "700";
    canvas.height = "700";
    document.body.appendChild(canvas);

    draw();
}

//update everything
const draw = () => {
    requestAnimationFrame(draw);

    if(loop) { //Main loop
        for(let i = 0; i < SPEED; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frames++;

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 5, 0, 2 * PI, true);
            ctx.fill();

            for(let individual of population.pop) {
                //Drones target the mouse, hopefully get better at moving towards it
                individual.targetX = mouseX; 
                individual.targetY = mouseY;
                individual.move();
                individual.render(ctx);
            }

            if(frames > GENERATION_LIFESPAN) {
                population.breed(50);
                frames = 0;
            }
        }
    }
}

//get position of mouse on screen to use as target
onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

window.onload = main;