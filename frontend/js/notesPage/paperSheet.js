function showPaperNote(action) {
    const cover2 = document.querySelector('.cover_paper_note');
    const noteTitleInput = document.querySelector('.note-name-input');
    const paperNoteContent = document.querySelector('.paper-note');
    cover2.style.top = '0%';
    cover2.style.visibility = 'visible';

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
        paperNoteContent.innerHTML = MySessionStorage.get('note-content');
    }
    button.appendChild(i);
    cover2.appendChild(button);
}