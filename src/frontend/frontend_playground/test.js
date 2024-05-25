const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');



const headingsMap = {
    'H1': 'Heading 1',
    'H2': 'Heading 2',
    'H3': 'Heading 3',
    'H4': 'Heading 4',
    'H5': 'Heading 5',
    'H6': 'Heading 6'
}



const headingsList = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6']

const headingSet = new Set(headingsList)

function searchMap(heading) {
    console.time('searchMap')
    const result = headingsMap[heading]
    console.timeEnd('searchMap');
    return result
}


function searchSet(heading) {
    console.time('searchSet')
    const result = headingSet.has(heading)
    console.timeEnd('searchSet'); 
    return result
}

function searchList(heading) {
    console.time('searchList')
    const result = headingsList.includes(heading)
    console.timeEnd('searchList');
    return result
}

button1.addEventListener('click', () => {searchMap('Heading 6')});
button2.addEventListener('click', () => {searchSet('Heading 6')});
button3.addEventListener('click', () => {searchList('Heading 6')});