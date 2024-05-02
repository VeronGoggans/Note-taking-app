/**
 * Returns an object containing the hex colors for paper and editor based on the input color.
 * @param {string} color - Color name.
 * @returns {Object|null} Object containing paper and editor hex colors or null if not found.
 */
export function getNoteHexColor(color) {
    const colorMap = {
      'blue': {'paper': '#bcd2e9', 'editor': '#cfdae6'},
      'purple': {'paper': '#c2bce9', 'editor': '#d6cfe6'},
      'red': {'paper': '#ffacac', 'editor': '#ffcaca'},
      'pink': {'paper': '#ffd7e6', 'editor': '#ffe6ef'},
      'orange': {'paper': '#efba94', 'editor': '#e9cebb'},
      'yellow': {'paper': '#fffba3', 'editor': '#fffcd3'},
      'old-white': {'paper': '#fefded', 'editor': '#e4dfcf'},
      'green': {'paper': '#aee4cb', 'editor': '#cfe6dc'},
      'black': {'paper': '#000000', 'editor': '#535353'}
    };
    return colorMap[color] || null; // Return the color object from map or null if not found
  }

/**
 * Maps hexColor values to corresponding color names.
 * @param {string} hexColor - Hexadecimal color code.
 * @returns {string|null} Corresponding color name or null if not found.
 */
export function getNoteColor(hexColor) {
    const colorMap = {
      '#ffffff': 'white','#bcd2e9': 'blue','#c2bce9': 'purple',
      '#ffacac': 'red','#ffd7e6': 'pink','#efba94': 'orange',
      '#fffba3': 'yellow','#fefded': 'old-white','#aee4cb': 'green',
      '#000000': 'black'
    };
    return colorMap[hexColor] || null; // Return the color from map or null if not found
  }