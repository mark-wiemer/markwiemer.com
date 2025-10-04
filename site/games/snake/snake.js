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
    const boardSize = 32;
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
 * @returns {import("../game.js").Vector2D} A position that doesn't overlap with the snake
 */
function calcApplePos(state) {
    let foundValidPos = false;
    do {
        /** @type {import("../game.js").Vector2D} */
        let applePos = {
            x: Math.floor(Math.random() * state.boardSize),
            y: Math.floor(Math.random() * state.boardSize),
        };
        foundValidPos = true; // assume it worked
        // console.debug(`New apple pos: ${core.strVector2D(applePos)}`);
        if (state.snakePos.some((pos) => core.eqVector2D(pos, applePos))) {
            foundValidPos = false;
            // console.debug("New apple position overlaps snake, trying again");
        }
        if (foundValidPos) return applePos;
    } while (!foundValidPos);
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
    for (const cell of state.snakePos) {
        core.fillCell(cell, "cornflowerblue", state.cellSize, state.ctx);
    }
    core.fillCell(state.applePos, "darkred", state.cellSize, state.ctx);
}

/**
 * Increments game state and draws new state
 * - Moves snake
 * - Draws new state
 * @param {GameState} newState To update directly (not pure)
 * @returns {GameState} updated game state (not pure)
 */
function tick(newState) {
    if (newState.paused) return newState;
    calcGameOver(newState);
    if (newState.gameOver) return newState;
    moveSnake(newState);
    drawState(newState);
    // console.debug("tick, new state:");
    // console.debug(newState);
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
    const newHeadPos = core.addVector2D(state.snakePos[0], newDir);
    // If crashed into wall
    if (
        newHeadPos.x < 0 ||
        newHeadPos.x >= state.boardSize ||
        newHeadPos.y < 0 ||
        newHeadPos.y >= state.boardSize
    ) {
        // console.debug("Game over, crashed into wall");
        state.gameOver = true;
        return;
    }
    // If crashed into self
    if (
        state.snakePos
            // first 4 positions can't intersect with new head pos
            // last position intersecting isn't a problem, it will move out of the way
            .slice(3, state.snakePos.length - 1)
            .some((pos) => core.eqVector2D(pos, newHeadPos))
    ) {
        // console.debug("Game over, crashed into self");
        state.gameOver = true;
        return;
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
    const newHead = core.addVector2D(oldHead, state.snakeDir);
    state.snakePos.unshift(newHead);
    if (core.eqVector2D(newHead, state.applePos)) state.applePos = calcApplePos(state);
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
    // console.debug("keydown", e);
    // Debug mode: tick then pause
    if (e.key === " ") {
        newState.paused = false;
        tick(newState);
        newState.paused = true;
        return newState;
    }
    // Change direction
    const newDir = keyToDir(e.key, dirs);
    if (newDir) {
        // console.debug("newDir", newDir);
        if (isValidDir(newState, newDir)) {
            newState.snakeDirs.push(newDir);
        } else {
            // console.debug("New direction not valid, ignoring");
        }
        return newState;
    }
    // Pause and unpause
    if (e.key === "Escape") {
        // console.debug(`${newState.paused ? "Unpausing" : "Pausing"}`);
        newState.paused = !newState.paused;
        return newState;
    }
    if (e.key === "r") {
        return calcInitialState(state.boardSize, state.cellSize, state.ctx, dirs);
    }
    // console.debug(`Unused key pressed: '${e.key}'`);
    return newState;
}

/**
 * Dir can be queued if it's perpendicular to last queued dir.
 * - If no other dir queued, then given dir must be perp. to current dir.
 * @param {GameState} state
 * @param {import("../game.js").Vector2D} dir
 * @returns {boolean} Whether the given dir can be queued onto the given state
 */
function isValidDir(state, dir) {
    const relevantDir = state.snakeDirs[state.snakeDirs.length - 1] ?? state.snakeDir;
    return (relevantDir.x + dir.x) % 2 !== 0;
}

/**
 * Convert keyboard key to direction vector
 * @param {string} key Key string, e.g. `w` or `ArrowUp`
 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
 * @param {Directions} dirs
 * @returns {import("../game.js").Vector2D | undefined} Direction vector or undefined if key doesn't match
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
 * Mono-object tracking game state. Could be a bunch of globals, but this is easier to track
 * @typedef {Object} GameState
 * @property {import("../game.js").Vector2D} applePos position of current apple
 * @property {number} boardSize number of cells on each side of the board
 * @property {number} cellSize side length, in pixels, of a game cell on the grid. Only for view
 * @property {CanvasRenderingContext2D} ctx Canvas context for drawing the game. Only for view
 * @property {NodeJS.Timeout} interval Tick interval, never cleared
 * @property {boolean} paused Whether the game is paused
 * @property {import("../game.js").Vector2D} snakeDir current direction snake is moving in
 * @property {Vector2D[]} snakeDirs queued directions for the snake to turn in
 * @property {Vector2D[]} snakePos current positions of the snake's body.
 * First entry is snake's head
 */

//
// Klona library
//
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
    let k, out, tmp;

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
