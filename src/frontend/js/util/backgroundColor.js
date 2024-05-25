import { colorToHexcodeMap, hexcodeToColorMap } from "../constants/constants.js";

 
/**
 * Returns an object containing the hex colors for paper and editor based on the input color.
 * @param {string} color - Color name.
 * @returns {Object|null} Object containing paper and editor hex colors or null if not found.
 */
export function getNoteHexColor(color) {
    return colorToHexcodeMap[color] || null; // Return the color object from map or null if not found
  }

/**
 * Maps hexColor values to corresponding color names.
 * @param {string} hexColor - Hexadecimal color code.
 * @returns {string|null} Corresponding color name or null if not found.
 */
export function getNoteColor(hexColor) {
    return hexcodeToColorMap[hexColor] || null; // Return the color from map or null if not found
  }