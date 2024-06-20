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


export const folderColorNames = {
    'rgb(255, 255, 255)': 'White',
    'rgb(169, 215, 255)': 'Light Sky Blue',
    'rgb(223, 193, 255)': 'Lavender',
    'rgb(159, 251, 149)': 'Light Green',
    'rgb(255, 224, 158)': 'Peach',
    'rgb(225, 175, 209)': 'Pink Lavender',
    'rgb(142, 122, 181)': 'Blue Violet',
    'rgb(238, 165, 166)': 'Salmon Pink',
    'rgb(158, 213, 197)': 'Turquoise',
    'rgb(255, 191, 169)': 'Sunset Orange'
}


export const folderColorClasses = {
    'rgb(255, 255, 255)': 'color-original',
    'rgb(169, 215, 255)': 'color-light-sky-blue',
    'rgb(255, 224, 158)': 'color-peach',
    'rgb(159, 251, 149)': 'color-light-green',
    'rgb(223, 193, 255)': 'color-lavender',
    'rgb(225, 175, 209)': 'color-pink-lavender',
    'rgb(238, 165, 166)': 'color-salmon-pink',
    'rgb(142, 122, 181)': 'color-blue-violet',
    'rgb(158, 213, 197)': 'color-turquoise',
    'rgb(255, 191, 169)': 'color-sunset-orange',
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


export const notificationTypes = {
    'SAVED': 'Saved',
    'UPDATED': 'Updated',
    'DELETED': 'Deleted',
    'NEW': 'New',
    'EMPTY': 'Empty',
    'EXPORT': 'Export'
}


export const notificationIcons = {
    'SAVED': 'fa-solid fa-check',
    'UPDATED': 'fa-solid fa-pen',
    'DELETED': 'fa-regular fa-trash-can',
    'NEW': 'fa-solid fa-plus',
    'EMPTY': 'fa-regular fa-bell',
    'EXPORT': 'fa-solid fa-download'
}


export const notificationMessages = {
    'SAVED': 'Note successfully created.',
    'UPDATED': 'Your changes have been saved.',
    'DELETED': 'has been deleted.',
    'NEW': 'Changes saved.\nCreating a new note.',
    'EMPTY': 'This folder is empty.<br>Start by making a note or subfolder.',
    'EXPORT': 'Export successful'
}