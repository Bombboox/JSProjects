const abs = (num) => Math.abs(num);
const clamped = (num) => clamp(num, -1.0, 1.0);
const cube = (num) => num**3;
const exp = (num) => E**num;
const gauss = (num) => E**(-0.5 * (num)**2);
const hat = (num) => (1 - min(Math.abs(num)), 1);