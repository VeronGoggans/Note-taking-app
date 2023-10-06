// const noteTitleInput = NodeCrafter.create('div', {'class': 'note-title-input', 'type': 'text', 'placeholder': 'Note title'});

// // ____________________________________ RenderPaperNoteBtnBar ____________________________________
// // This function will render a button bar for basic text manipulations 
// // on the top of the screen when a note is being created or edited.
// function renderPaperNoteBtnBar() {
//     // Creating the html elements
//     const buttonBar = NodeCrafter.create('div', {'class': 'button-bar'});
//     const titleBox = NodeCrafter.create('div', {'class': 'note-title-box'});
//     const buttonBox = NodeCrafter.create('div', {'class': 'button-box'});
//     const boldBtn = NodeCrafter.create('button', {'class': 'bold-btn', 'title': 'Bold'});
//     const boldIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-bold'});
//     const cursiveBtn = NodeCrafter.create('button', {'class': 'cursive-btn', 'title': 'Cursive'});
//     const cursiveIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-italic'});
//     const colorPicker = NodeCrafter.create('input', {'class': 'color-picker', 'type': 'color'});
//     const imageBtn = NodeCrafter.create('button', {'class': 'image-btn'});
//     const imageIcon = NodeCrafter.create('i', {'class': 'fa-regular fa-image'});



//     // Appending children
//     boldBtn.appendChild(boldIcon);
//     cursiveBtn.appendChild(cursiveIcon);
//     imageBtn.appendChild(imageIcon);
//     buttonBox.appendChild(boldBtn);
//     buttonBox.appendChild(cursiveBtn);
//     buttonBox.appendChild(colorPicker);
//     buttonBox.appendChild(imageBtn);
//     titleBox.appendChild(noteTitleInput);
//     buttonBar.appendChild(titleBox);
//     buttonBar.appendChild(buttonBox);
//     cover2.appendChild(buttonBar);                      
// }