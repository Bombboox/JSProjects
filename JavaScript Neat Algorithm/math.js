const E = Math.E;
const PI = Math.PI;
const SMALL = 1e-10;

const random = (min, max) => Math.random() * (max + min) - min;
const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; 
const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;
const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);
