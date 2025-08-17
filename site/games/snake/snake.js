main();

function main() {
    const canvas = document.querySelector("canvas");
    if (canvas === null) {
        console.error("Failed to get canvas");
        return -1;
    }
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        console.error("Failed to get canvas context");
        return -1;
    }
    /** Fraction of shorter side of screen to take up */
    // includes small margin for scroll window for now
    const relativeSize = 0.9;

    /** Number of cells per side */
    const boardSize = 8;
    const canvasSize = calcCanvasSize(
        window.innerWidth,
        window.innerHeight,
        relativeSize,
        boardSize,
    );
    setCanvasSize(canvasSize, canvas);
    const cellSize = canvasSize / boardSize;

    /**
     * @type {Directions}
     */
    const dirs = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
    };

    /**
     * @type {Vector2D[]}
     */
    const snakeDirs = [];

    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("keydown", (e) => handleInput(e, dirs, snakeDirs));
    });
}

/**
 *
 * @param {KeyboardEvent} e
 * @param {Directions} dirs
 * @param {Vector2D[]} snakeDirs
 */
function handleInput(e, dirs, snakeDirs) {
    const newDir = keyToDir(e.key, dirs);
    console.log("newDir", newDir);
    snakeDirs.push(newDir);
}

/**
 *
 * @param {string} key Key string, e.g. `w` or `ArrowUp`
 *
 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
 * @param {Directions} dirs
 * @returns
 */
function keyToDir(key, dirs) {
    switch (key) {
        case "w":
        case "ArrowUp":
            return dirs.up;
        case "s":
        case "ArrowDown":
            return dirs.down;
        case "a":
        case "ArrowLeft":
            return dirs.left;
        case "d":
        case "ArrowRight":
            return dirs.right;
    }
}

/**
 *
 * @param {number} x x-coordinate (0 === leftmost)
 * @param {number} y y-coordinate (o === topmost)
 * @param {string} color CSS color string
 * @param {CanvasRenderingContext2D} ctx
 * @returns {undefined} But returns ctx.fillStyle to previous value
 */
function fillCell(x, y, color, cellSize, ctx) {
    const oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize, color);
    ctx.fillStyle = oldFillStyle;
}

/**
 * Get the width and height of the canvas
 * @param {number} windowWidth Inner width of window
 * @param {number} windowHeight Inner height of window
 * @param {number} relativeSize Fraction of window size to take up, from 0 to 1
 * @param {number} boardSize Number of cells per side of the game board (int)
 * @returns {number} Width and height of square canvas, with guarantees:
 * - is an integer
 * - takes up less than or exactly relative size of window
 * - divisible by boardSize
 */
function calcCanvasSize(windowWidth, windowHeight, relativeSize, boardSize) {
    // console.log(`getCanvasSize(${windowWidth}, ${windowHeight}, ${relativeSize}, ${boardSize})`);
    const rawSideLength = Math.min(windowWidth, windowHeight) * relativeSize;
    const roundedSideLength = Math.floor(rawSideLength / boardSize) * boardSize;
    // console.log(`getCanvasSize returning ${roundedSideLength}`);
    return roundedSideLength;
}

function setCanvasSize(size, canvas) {
    canvas.setAttribute("width", size);
    canvas.setAttribute("height", size);
}

/**
 * @typedef {Object} Vector2D
 * @property {number} x Horizontal component, positive is to the right
 * @property {number} y Vertical component, positive is downward
 */

/**
 * Unit vectors in cardinal directions
 * @typedef {Object} Directions
 * @property {Vector2D} up Unit vector upward
 * @property {Vector2D} down Unit vector downward
 * @property {Vector2D} left Unit vector going left
 * @property {Vector2D} right Unit vector going right
 */
