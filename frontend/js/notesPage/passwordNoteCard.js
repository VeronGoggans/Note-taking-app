// ____________________________________ RenderPasswordNoteCard ____________________________________
function renderSecureNote(id, note_name, note_content, bookmark, passwordProtection) {
    // creating parent container 
    const noteContainer = document.querySelector(".notes_container");

    // Creating the html elements
    const secureNoteCard = NodeCrafter.create('div', {'class': 'psw_note_card', 'id': id});
    const secureNoteTitleBox = NodeCrafter.create('div', {'class': 'psw_note_card_title_bar'});
    const noteName = NodeCrafter.create('h5', {'textContent': note_name});
    const settingsIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-ellipsis'});
    const secureNoteContentBox = NodeCrafter.create('div', {'class': 'psw_note_card_content_box'});
    const lockIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-key', 'title': 'Unlock', 'id': 'lock_icon'});
    const bottomDiv = NodeCrafter.create('div', {});
    const bookmarkIcon = NoteUtils.createBookmarkIcon(bookmark);

    // Adding event listeners
    settingsIcon.addEventListener('click', ()=> {
        NoteUtils.storeNoteDataToSessionStorage(id, note_name)
        renderNoteSettingsContainer(true);
    })

    lockIcon.addEventListener('click', ()=> {
        NoteUtils.storeNoteDataToSessionStorage(id);
        renderNotePasswordContainer('unlock-note');
    })

    // Appending children
    secureNoteTitleBox.appendChild(noteName);
    secureNoteTitleBox.appendChild(settingsIcon);
    secureNoteContentBox.appendChild(lockIcon);
    bottomDiv.appendChild(bookmarkIcon)
    secureNoteContentBox.appendChild(bottomDiv);
    secureNoteCard.appendChild(secureNoteTitleBox);
    secureNoteCard.appendChild(secureNoteContentBox);
    noteContainer.appendChild(secureNoteCard);
}