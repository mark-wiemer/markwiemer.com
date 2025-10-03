/**
 * @template T
 * @typedef {Object} Result
 * @property {boolean} success
 * @property {T} [value] - Present when success is true
 * @property {string} [error] - Present when success is false
 */

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
