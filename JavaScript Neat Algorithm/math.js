const E = Math.E;
const PI = Math.PI;

const random = (min, max) => Math.random() * (max + min) - min;
const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;
const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);
