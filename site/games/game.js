/**
 * Gets the canvas and 2D context from the DOM
 * @returns {Result<{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}>}
 */
export function getDomElements() {
    const canvas = document.querySelector("canvas");
    if (canvas === null) {
        return { success: false, error: "Failed to get canvas" };
    }
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        return { success: false, error: "Failed to get canvas context" };
    }
    return { success: true, value: { canvas, ctx } };
}

/**
 * Calc the desired width and height of a square tiled canvas
 * @param {number} windowWidth Inner width of window
 * @param {number} windowHeight Inner height of window
 * @param {number} relativeSize Fraction of window size to take up, from 0 to 1
 * @param {number} boardSize Number of cells per side of the game board (int)
 * @returns {number} Desired width and height of a square canvas, in pixels, with guarantees:
 * - is an integer
 * - takes up less than or exactly relative size of window
 * - divisible by boardSize
 */
export function calcCanvasSize(windowWidth, windowHeight, relativeSize, boardSize) {
    // console.debug(`getCanvasSize(${windowWidth}, ${windowHeight}, ${relativeSize}, ${boardSize})`);
    const rawSideLength = Math.min(windowWidth, windowHeight) * relativeSize;
    const roundedSideLength = Math.floor(rawSideLength / boardSize) * boardSize;
    // console.debug(`getCanvasSize returning ${roundedSideLength}`);
    return roundedSideLength;
}

/**
 * Set the canvas to a square with the given side length in pixels
 * @param {number} size
 * @param {HTMLCanvasElement} canvas
 */
export function setCanvasSize(size, canvas) {
    canvas.setAttribute("width", size);
    canvas.setAttribute("height", size);
}

/**
 * @typedef {Object} FailResult
 * @property {false} success
 * @property {string} error message when not successful
 */
/**
 * @template T
 * @typedef {Object} SuccessResult
 * @property {true} success
 * @property {T} value
 */
/**
 * @template T
 * @typedef {FailResult|SuccessResult<T>} Result
 */

//#region Vectors

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

/**
 * Add two vectors
 * @param {import("../game.js").Vector2D} a First vector to add
 * @param {import("../game.js").Vector2D} b Second vector to add
 * @returns {import("../game.js").Vector2D} Sum of two vectors
 */
export function addVector2D(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Check if two vectors are equal
 * @param {import("../game.js").Vector2D} a First vector
 * @param {import("../game.js").Vector2D} b Second vector
 * @returns {boolean} True if vectors have same x and y components
 */
export function eqVector2D(a, b) {
    return a.x === b.x && a.y === b.y;
}

/**
 * Convert vector to string representation
 * @param {import("../game.js").Vector2D} v Vector to convert
 * @returns {string} String in format "(x, y)"
 */
export function strVector2D(v) {
    return `(${v.x}, ${v.y})`;
}

//#endregion Vectors
