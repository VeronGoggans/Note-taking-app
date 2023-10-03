// ____________________________________ RenderPaperNoteBtnBar ____________________________________
// This function will render a button bar for basic text manipulations 
// on the top of the screen when a note is being created or edited.
function renderPaperNoteBtnBar() {
    // Creating the html elements
    const buttonBar = NodeCrafter.create('div', {'class': 'button-bar'});
    const boldBtn = NodeCrafter.create('button', {'class': 'bold-btn', 'title': 'Bold'});
    const boldIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-bold'});
    const cursiveBtn = NodeCrafter.create('button', {'class': 'cursive-btn', 'title': 'Cursive'});
    const cursiveIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-italic'});
    const colorPicker = NodeCrafter.create('input', {'class': 'color-picker', 'type': 'color'});



    // Appending children
    boldBtn.appendChild(boldIcon);
    cursiveBtn.appendChild(cursiveIcon);
    buttonBar.appendChild(boldBtn);
    buttonBar.appendChild(cursiveBtn);
    buttonBar.appendChild(colorPicker);
    cover2.appendChild(buttonBar);                      
}