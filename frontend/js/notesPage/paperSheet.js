// ____________________________________ RenderPieceOfPaper ____________________________________

function renderPieceOfPaper(action) {
    cover2.style.visibility = "visible";
    cover2.style.top = "0";
    // Creating the html elements

    const buttonBar = NodeCrafter.create('div', {'class': 'button-bar'});
    const noteTitleInput = NodeCrafter.create('input', {'class': 'note-title-input', 'type': 'text', 'placeholder': 'Note title'});
    const closePaperNoteButton = NodeCrafter.create('button', {'class': 'close_paper_note_btn'});
    const closePaperNoteButtonIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-xmark'});
    const boldBtn = NodeCrafter.create('button', {'class': 'bold-btn', 'title': 'Bold'});
    const boldIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-bold'});
    const cursiveBtn = NodeCrafter.create('button', {'class': 'cursive-btn', 'title': 'Cursive'});
    const cursiveIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-italic'});
    const colorPicker = NodeCrafter.create('input', {'class': 'color-picker', 'type': 'color'});
    const imageBtn = NodeCrafter.create('button', {'class': 'image-btn'});
    const imageIcon = NodeCrafter.create('i', {'class': 'fa-regular fa-image'});

    closePaperNoteButton.addEventListener('click', ()=> {
        cover2.style.top = '100%';
        clearCover2();
    })

    // Appending children
    boldBtn.appendChild(boldIcon);
    cursiveBtn.appendChild(cursiveIcon);
    imageBtn.appendChild(imageIcon);
    closePaperNoteButton.appendChild(closePaperNoteButtonIcon);
    buttonBar.appendChild(closePaperNoteButton);
    buttonBar.appendChild(boldBtn);
    buttonBar.appendChild(cursiveBtn);
    buttonBar.appendChild(imageBtn);
    buttonBar.appendChild(colorPicker);    
    cover2.appendChild(buttonBar); 


    // Creating the html elements
    const paperNote = NodeCrafter.create("div", {'class': 'paper_note_container'});
    const papernoteContentBox = NodeCrafter.create("div", {'class': 'paper_note_content_box'});
    const paperNoteContentTxtArea = NodeCrafter.create("div", {'class': 'paper_note_content_textarea', 'spellcheck': 'false', 'contenteditable': true});

    let button = null;
    let i = null;
    if (action === "add-note") {
        button = NodeCrafter.create('button', {'class': 'add_note_btn'});
        button.addEventListener('click', requestAddNote)
        i = NodeCrafter.create('i', {'class': 'fa-solid fa-plus'});
    }
    if (action === "edit-note") {
        button = NodeCrafter.create('button', {'class': 'edit_note_btn'});
        button.addEventListener('click', requestUpdateNote)
        i = NodeCrafter.create('i', {'class': 'fa-solid fa-pen'})

        noteTitleInput.value = MySessionStorage.get('note-name');
        paperNoteContentTxtArea.innerHTML = MySessionStorage.get('note-content');
    }

    // Appending children
    papernoteContentBox.appendChild(paperNoteContentTxtArea);
    paperNote.appendChild(papernoteContentBox);
    button.appendChild(i);
    cover2.appendChild(button);
    cover2.appendChild(paperNote);
}

// ____________________________________ Behavior ________________________________________________
// This function will create a new note and send it to the backend 
async function requestAddNote() {
    const categoryId = MySessionStorage.get('categoryId');
    const noteTitle = document.querySelector('.paper_note_title_input').value;
    const noteContent = document.querySelector('.paper_note_content_textarea').innerHTML;
    const bookmark = false;
    const passwordProtected = false;
    const noteObject = {"title": noteTitle, "content": noteContent, "bookmark": bookmark, "password_protected": passwordProtected}
    const response = await addNote(categoryId, true, noteObject);
    if (response.status_code === 200) {
        cover2.style.top = "100%";
        cover2.removeChild(cover2.lastChild)
        collectNotes(rerender=true);
    } else {
        alert("Error")
    }
} 

// This function will collect all the information of a note from the session storage and the note
// From session storage.
// noteId, bookmark, password protected
// From note 
// noteName from the input and the note content from the textarea.
// Ones it has collected all of the information, it sends a PUT request to the server updating the note.
async function requestUpdateNote() {
    const noteId = MySessionStorage.get('note-id');
    const noteName = document.querySelector('.paper_note_title_input').value;
    const noteContent = document.querySelector('.paper_note_content_textarea').innerHTML;
    const bookmark = MySessionStorage.get('note-bookmark');
    const passwordProtected = MySessionStorage.get('note-password-protect');

    const noteObject = {"title": noteName, "content": noteContent, "bookmark": bookmark, "password_protected": passwordProtected}
    const response = await updateNote(noteId, true, noteObject);

    if (response.status_code === 200) {
        const note = response.updated_note;
        cover2.style.top = "100%";
        clearCover2();
        renderNoteUpdate(noteId, note.title, note.content, passwordProtected);
    }
}