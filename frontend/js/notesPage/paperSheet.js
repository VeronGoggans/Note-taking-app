// ____________________________________ RenderPieceOfPaper ____________________________________

function renderPieceOfPaper(action) {
    cover2.style.visibility = "visible";
    cover2.style.top = "0";
    // Creating the html elements
    const paperNote = NodeCrafter.create("div", {'class': 'paper_note_container'});
    const paperNoteTitleBox = NodeCrafter.create("div", {'class': 'paper_note_title_box'});
    const paperNoteTitleInput = NodeCrafter.create("input", {'class': 'paper_note_title_input', 'placeholder': 'Title', 'spellcheck': 'false'});
    const papernoteContentBox = NodeCrafter.create("div", {'class': 'paper_note_content_box'});
    const paperNoteContentTxtArea = NodeCrafter.create("textarea", {'class': 'paper_note_content_textarea', 'placeholder': 'Type something here', 'spellcheck': 'false'});
    const closePaperNoteButton = NodeCrafter.create('button', {'class': 'close_paper_note_btn'});
    const closePaperNoteButtonIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-xmark'});

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

        paperNoteTitleInput.value = MySessionStorage.get('note-name');
        paperNoteContentTxtArea.value = MySessionStorage.get('note-content');
    }
    closePaperNoteButton.addEventListener('click', ()=> {
        cover2.style.top = '100%';
        clearCover2();
    })

    // Appending children
    paperNoteTitleBox.appendChild(paperNoteTitleInput);
    papernoteContentBox.appendChild(paperNoteContentTxtArea);
    paperNote.appendChild(paperNoteTitleBox);
    paperNote.appendChild(papernoteContentBox);
    closePaperNoteButton.appendChild(closePaperNoteButtonIcon)
    button.appendChild(i);
    cover2.appendChild(closePaperNoteButton)
    cover2.appendChild(button);
    cover2.appendChild(paperNote);
}

// ____________________________________ Behavior ________________________________________________
// This function will create a new note and send it to the backend 
async function requestAddNote() {
    const categoryName = MySessionStorage.get('categoryName');
    const noteTitle = document.querySelector('.paper_note_title_input').value;
    const noteContent = document.querySelector('.paper_note_content_textarea').value;
    const bookmark = false;
    const passwordProtected = false;
    const noteObject = {"title": noteTitle, "content": noteContent, "bookmark": bookmark, "password_protected": passwordProtected}
    const response = await addNote(categoryName, true, noteObject);
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
//
// From note 
// noteName from the input and the note content from the textarea.
// Ones it has collected all of the information, it sends a PUT request to the server updating the note.
async function requestUpdateNote() {
    const noteId = MySessionStorage.get('note-id');
    const noteName = document.querySelector('.paper_note_title_input').value;
    const noteContent = document.querySelector('.paper_note_content_textarea').value;
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