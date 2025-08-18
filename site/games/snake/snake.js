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
    const boardSize = 32;
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

    /** @type {GameState} */
    let state = calcInitialState(boardSize, cellSize, ctx, dirs);

    console.log("Starting game with state:");
    console.log(state);
    drawState(state);

    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("keydown", (e) => (state = handleInput(e, dirs, state)));
    });

    state.interval = setInterval(() => (state = tick(klona(state))), Math.floor(1000.0 / 16));
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
    let state = {
        boardSize,
        cellSize,
        ctx,
        snakeDir: dirs.down,
        snakeDirs: [],
        snakePos: [
            { x: 0, y: 2 },
            { x: 0, y: 1 },
            { x: 0, y: 0 },
        ],
    };
    state.applePos = calcApplePos(state);
    return state;
}

/**
 * Returns a valid position for an apple
 * @param {GameState} state
 */
function calcApplePos(state) {
    let foundValidPos = true;
    do {
        /** @type {Vector2D} */
        let applePos = {
            x: Math.floor(Math.random() * state.boardSize),
            y: Math.floor(Math.random() * state.boardSize),
        };
        for (let pos of state.snakePos) {
            if (pos.x === applePos.x && pos.y === applePos.y) {
                foundValidPos = false;
                break;
            }
        }
        if (foundValidPos) return applePos;
    } while (true);
}

/**
 * Draws the state of the game
 * - Background: black
 * - Snake: cornflowerblue
 * - Apple: darkred
 * @param {GameState} state
 */
function drawState(state) {
    state.ctx.fillStyle = "black";
    state.ctx.fillRect(0, 0, state.cellSize * state.boardSize, state.cellSize * state.boardSize);
    for (cell of state.snakePos) {
        fillCell(cell, "cornflowerblue", state.cellSize, state.ctx);
    }
    fillCell(state.applePos, "darkred", state.cellSize, state.ctx);
}

/**
 * Increments game state and draws new state
 * - Moves snake
 * - Draws new state
 * @param {GameState} newState To update directly (not pure)
 * @returns {GameState} updated game state (not pure)
 */
function tick(newState) {
    console.log("tick, new state:");
    calcGameOver(newState);
    if (newState.gameOver) {
        newState.interval = clearInterval(newState.interval);
        return newState;
    }
    moveSnake(newState);
    console.log(newState);
    drawState(newState);
    return newState;
}

/**
 * Updates the state's gameOver value
 * - If already game over, does nothing
 * - If snake will crash into wall, game is over
 * @param {GameState} state
 */
function calcGameOver(state) {
    if (state.gameOver) return;
    const newDir = state.snakeDirs[0] ?? state.snakeDir;
    const newHeadPos = addVector2D(state.snakePos[0], newDir);
    if (
        newHeadPos.x < 0 ||
        newHeadPos.x >= state.boardSize ||
        newHeadPos.y < 0 ||
        newHeadPos.y >= state.boardSize
    ) {
        console.log("game over");
        state.gameOver = true;
    }
}

/**
 * Moves the snake
 * - Does not check for collisions, use `calcGameOver` for that
 * - If apple at new head pos:
 *    - eats apple
 *    - calculates new apple position
 *    - grows snake by 1 cell
 * - Else, snake stays same size
 * - Turns up to one time if there is a direction in the queue
 * @param {GameState} state
 */
function moveSnake(state) {
    const oldHead = state.snakePos[0];
    state.snakeDir = state.snakeDirs.shift() ?? state.snakeDir;
    const newHead = addVector2D(oldHead, state.snakeDir);
    state.snakePos.unshift(newHead);
    if (eqVector2D(newHead, state.applePos)) state.applePos = calcApplePos(state);
    else state.snakePos.pop();
}

/**
 * Modifies the game state according to the user input
 * - Escape quits the game, clearing state interval
 * - WASD or arrow keys moves the snake, pushing an entry to `snakeDirs`
 * @param {KeyboardEvent} e
 * @param {Directions} dirs
 * @param {GameState} state
 */
function handleInput(e, dirs, state) {
    const newState = klona(state);
    console.log("keydown", e);
    if (e.key === " ") {
        return tick(newState, state);
    }
    const newDir = keyToDir(e.key, dirs);
    if (newDir) {
        console.log("newDir", newDir);
        newState.snakeDirs.push(newDir);
        return newState;
    }
    if (e.key === "Escape") {
        console.log("Quitting");
        newState.interval = clearInterval(newState.interval);
        return newState;
    }

    console.log(`Unused key pressed: '${e.key}'`);
    return newState;
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
 * Add two vectors
 * @param {Vector2D} a First vector to add
 * @param {Vector2D} b Second vector to add
 * @returns {Vector2D} Sum of two vectors
 */
function addVector2D(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

function eqVector2D(a, b) {
    return a.x === b.x && a.y === b.y;
}

/**
 *
 * @param {Vector2D} cell Cell coordinate to fill
 * @param {string} color CSS color string
 * @param {CanvasRenderingContext2D} ctx
 * @returns {undefined} But returns ctx.fillStyle to previous value
 */
function fillCell(cell, color, cellSize, ctx) {
    const oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize, color);
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

/**
 * Mono-object tracking game state. Could be a bunch of globals, but this is easier to track
 * @typedef {Object} GameState
 * @property {Vector2D} applePos position of current apple
 * @property {number} boardSize number of cells on each side of the board
 * @property {number} cellSize side length, in pixels, of a game cell on the grid. Only for view
 * @property {CanvasRenderingContext2D} ctx Canvas context for drawing the game. Only for view
 * @property {NodeJS.Timeout} interval Tick interval, can be cleared by quitting
 * @property {Vector2D} snakeDir current direction snake is moving in
 * @property {Vector2D[]} snakeDirs queued directions for the snake to turn in
 * @property {Vector2D[]} snakePos current positions of the snake's body.
 * First entry is snake's head
 */

/**
 * Copied from https://github.com/lukeed/klona, MIT licensed,
 * copyright Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 * @param {any} val Input to deep clone
 * @returns {any} Deep clone of input
 */
/*
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function klona(val) {
    var k, out, tmp;

    if (Array.isArray(val)) {
        out = Array((k = val.length));
        while (k--) out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
        return out;
    }

    if (Object.prototype.toString.call(val) === "[object Object]") {
        out = {}; // null
        for (k in val) {
            if (k === "__proto__") {
                Object.defineProperty(out, k, {
                    value: klona(val[k]),
                    configurable: true,
                    enumerable: true,
                    writable: true,
                });
            } else {
                out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
            }
        }
        return out;
    }

    return val;
}
