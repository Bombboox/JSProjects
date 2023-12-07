const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const SPEED = 1;

var loop = true;
var one = new Genome(2, 2)
var two = new Genome(2, 2);
var generation = 0;

const main = () => {
    requestAnimationFrame(draw);
}

const draw = () => {
    requestAnimationFrame(draw);

    if(loop) { //Main loop
        for(let i = 0; i < SPEED; i++) {
            offspringOne = one.crossover(two);
            offspringTwo = one.crossover(two);

            one = offspringOne;
            two = offspringTwo;

            one.mutate();
            two.mutate();
        }
    }
}

window.onload = main;