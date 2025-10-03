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
