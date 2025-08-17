const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/** Number of cells per side */
const size = 8;
const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
const cellSize = canvasSize / size;
canvas.setAttribute("width", canvasSize);
canvas.setAttribute("height", canvasSize);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasSize, canvasSize);
