main();

function main() {
    const canvas = document.querySelector("canvas");
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
    const canvasSize = getCanvasSize(
        window.innerWidth,
        window.innerHeight,
        relativeSize,
        boardSize,
    );
    const cellSize = canvasSize / boardSize;
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const color = (i + j) % 2 === 1 ? "black" : "white";
            // console.log({ i, j, cellSize, color: ctx.fillStyle });
            fillCell(i, j, color, cellSize, ctx);
        }
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
function getCanvasSize(windowWidth, windowHeight, relativeSize, boardSize) {
    // console.log(`getCanvasSize(${windowWidth}, ${windowHeight}, ${relativeSize}, ${boardSize})`);
    const rawSideLength = Math.min(windowWidth, windowHeight) * relativeSize;
    const roundedSideLength = Math.floor(rawSideLength / boardSize) * boardSize;
    // console.log(`getCanvasSize returning ${roundedSideLength}`);
    return roundedSideLength;
}
