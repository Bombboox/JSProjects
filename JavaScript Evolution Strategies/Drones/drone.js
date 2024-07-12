class Drone extends Individual {
    constructor() {
        super();
        this.x = 350;
        this.y = 350;
        this.w = 15;
        this.h = 15;
        this.color = Math.floor(Math.random()*16777215).toString(16);
    }

    move(x, y) {
        let xDiff = this.x - x;
        let yDiff = this.y - y;
        let mag = xDiff**2 + yDiff**2;

        xDiff = xDiff/mag;
        yDiff = yDiff/mag;

        let output = this.brain.feed_forward([xDiff, yDiff]);

        let t = output[0] * Math.PI * 2;
        let r = output[1];

        this.x += r * Math.cos(t);
        this.y += r * Math.sin(t);

        this.fitness = this.x;

        return output;
    }

    render(ctx, targetX = 0, targetY = 0) {
        ctx.fillStyle = `#${this.color}`;
        ctx.fillRect(this.x - (this.w / 2), this.y - (this.h / 2), this.w, this.h);

        this.move(targetX, targetY);
    }
}