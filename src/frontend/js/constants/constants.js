export const months = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
    '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Aug',
    '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dec', 
}


export const colorToHexcodeMap = {
    'blue': {'paper': '#bcd2e9', 'editor': '#cfdae6'},
    'purple': {'paper': '#c2bce9', 'editor': '#d6cfe6'},
    'red': {'paper': '#ffacac', 'editor': '#ffcaca'},
    'pink': {'paper': '#ffd7e6', 'editor': '#ffe6ef'},
    'orange': {'paper': '#efba94', 'editor': '#e9cebb'},
    'yellow': {'paper': '#fffba3', 'editor': '#fffcd3'},
    'old-white': {'paper': '#fefded', 'editor': '#e4dfcf'},
    'green': {'paper': '#aee4cb', 'editor': '#cfe6dc'},
    'black': {'paper': '#000000', 'editor': '#535353'}
}


export const hexcodeToColorMap = {
    '#ffffff': 'white','#bcd2e9': 'blue','#c2bce9': 'purple',
    '#ffacac': 'red','#ffd7e6': 'pink','#efba94': 'orange',
    '#fffba3': 'yellow','#fefded': 'old-white','#aee4cb': 'green',
    '#000000': 'black'
}


export const headingsMap = {
    'H1': 'Heading 1',
    'H2': 'Heading 2',
    'H3': 'Heading 3',
    'H4': 'Heading 4',
    'H5': 'Heading 5',
    'H6': 'Heading 6'
}

export const arrowKeys = new Set([
    'ArrowUp', 
    'ArrowDown', 
    'ArrowLeft', 
    'ArrowRight'
]);