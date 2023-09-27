// ____________________________________ RenderNoteCard ____________________________________

function renderNote(id, note_name, note_content, bookmark, passwordProtection) {
    // creating parent container 
    const noteContainer = document.querySelector(".notes_container");

    // Creating the html elements
    const noteCard = NodeCrafter.create('div', {'class': 'note_card', 'id': id});
    const noteTitleBox = NodeCrafter.create('div', {'class': 'note_card_title_bar'});
    const noteName = NodeCrafter.create('h4', {'textContent': note_name});
    const settingsIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-ellipsis'});
    const noteContentBox = NodeCrafter.create('div', {'class': 'note_card_content_box'});
    const noteContent = NodeCrafter.create('p', {});
    noteContent.innerHTML = StringUtil.fromatString(note_content);
    const bottomDiv = NodeCrafter.create('div', {});
    const bookmarkIcon = NoteUtils.createBookmarkIcon(bookmark);

    // Adding event listeners
    settingsIcon.addEventListener('click', ()=> {
        NoteUtils.storeNoteDataToSessionStorage(id, note_name);
        renderNoteSettingsContainer(); // This function is in the noteSettingsContainer.js file 
    })

    noteContent.addEventListener('click', ()=> {
        NoteUtils.storeNoteDataToSessionStorage(id, noteName.textContent, StringUtil.replaceBreakToNewLine(noteContent.innerHTML), passwordProtection, bookmark)
        renderPieceOfPaper('edit-note'); // This function is in the papersheet.js file
    })

    // Appending children
    noteTitleBox.appendChild(noteName);
    noteTitleBox.appendChild(settingsIcon);
    noteContentBox.appendChild(noteContent);
    bottomDiv.appendChild(bookmarkIcon)
    noteContentBox.appendChild(bottomDiv);
    noteCard.appendChild(noteTitleBox);
    noteCard.appendChild(noteContentBox);
    noteContainer.appendChild(noteCard);
}

// ____________________________________ Behavior ________________________________________________
// This function will update a note card if a note has been edited and is not password protected. 
// This function takes in 3 parameters.
// Parameter 1 - noteId is used to search the DOM for the note that needs to be updated
// Parameter 2 - noteName will be put in the h4 tag representing the note title.
// Parameter 3 - noteContent will be put in the p tag representing the new note content.
function renderNoteUpdate(noteId, noteName, noteContent, secure) {
    const note = document.getElementById(noteId)

    if (secure == 'false') {

        const noteTitleBar = note.querySelector('.note_card_title_bar');
        noteTitleBar.querySelector('h4').textContent = noteName;

        const noteContentBox = note.querySelector('.note_card_content_box');
        noteContentBox.querySelector('p').innerHTML = StringUtil.fromatString(noteContent);

        MySessionStorage.set('note-name', noteName);
    }  
    if (secure == 'true') {
        const noteTitleBar = note.querySelector('.psw_note_card_title_bar');
        noteTitleBar.querySelector('h4').textContent = noteName;
    }  
}

// function renderSecureNoteUpdate(noteId) {
//     const note = document.getElementById(noteId)
// }