const population = new Population(100, Drone);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const main = () => {
    canvas.width = 700;
    canvas.height = 700;
    canvas.style = 'background: black';
    document.body.appendChild(canvas);
    requestAnimationFrame(draw);
}

const draw = () => {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    population.render(ctx);
}

window.onload = main;