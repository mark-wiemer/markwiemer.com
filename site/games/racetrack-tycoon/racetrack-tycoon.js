import * as core from "../game.js";

main();

function main() {
    const getDomElementsResult = core.getDomElements();
    if (!getDomElementsResult.success) {
        console.error(getDomElementsResult.error);
        return -1;
    }
    const { canvas, ctx } = getDomElementsResult.value;
    /** Fraction of shorter side of screen to take up */
    // includes small margin for scroll window for now
    const relativeSize = 0.9;

    /** Number of cells per side */
    const boardSize = 8;
    const canvasSize = core.calcCanvasSize(
        window.innerWidth,
        window.innerHeight,
        relativeSize,
        boardSize,
    );
    core.setCanvasSize(canvasSize, canvas);
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

    /** @type {GameState} */
    let state = calcInitialState(boardSize, cellSize, ctx, dirs);

    console.debug("Starting game with state:");
    console.debug(state);
    drawState(state);

    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("keydown", (e) => (state = handleInput(e, dirs, state)));
        state.interval = setInterval(() => (state = tick(klona(state))), Math.floor(1000.0 / 16));
    });
}

/**
 * Calculate a starting game state
 * @param {number} boardSize Number of cells on each size of the board
 * @param {number} cellSize Size in pixels of each board cell
 * @param {CanvasRenderingContext2D} ctx Drawing context for the canvas
 * @param {Directions} dirs
 * @returns {GameState} a starting game state
 */
function calcInitialState(boardSize, cellSize, ctx, dirs) {
    /** @type {GameState} */
    let state = {
        boardSize,
        cellSize,
        ctx,
    };
    return state;
}

/**
 * Mono-object tracking game state. Could be a bunch of globals, but this is easier to track
 * @typedef {Object} GameState
 * @property {number} boardSize number of cells on each side of the board. Each cell holds one track piece.
 * @property {number} cellSize side length, in pixels, of a game cell on the grid. Only for view
 * @property {CanvasRenderingContext2D} ctx Canvas context for drawing the game. Only for view
 * @property {NodeJS.Timeout} interval Tick interval, never cleared
 * @property {boolean} paused Whether the game is paused
 */
