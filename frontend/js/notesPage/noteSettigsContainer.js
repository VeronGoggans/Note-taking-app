
// ____________________________________ RenderNoteSettingsContainer ____________________________________
function renderNoteSettingsContainer(secure) {
    cover1.style.visibility = "visible";
    cover1.style.top = "0";
    let button1TextContent = '';
    secure ? button1TextContent = "Remove password protection" : button1TextContent = "Add password protection";
    

    // Creating the html elements
    const container = NodeCrafter.create('div', {'class': 'note_settings_container'});
    const button1 = NodeCrafter.create('button', {'class': 'password_protected_btn', 'textContent': button1TextContent});
    const button2 = NodeCrafter.create('button', {'class': 'move_note_btn', 'textContent': 'Move note'});
    const button3 = NodeCrafter.create('button', {'class': 'delete_note_btn', 'textContent': 'Delete'});

    // Adding event listeners
    if (secure) {
        button1.addEventListener('click', async()=> {
            requestDeleteNotePassword()
        })
    }
    if (!secure) {
        button1.addEventListener('click', ()=> {
            clearCover1();
            renderNotePasswordContainer('add-password-to-note');
        })
    }

    button2.addEventListener('click', ()=> {
        clearCover1();
        collectCategories();
    })

    button3.addEventListener('click', ()=> {
        clearCover1();
        renderNoteDeleteContainer();
    })

    // Appending children
    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3); 
    cover1.appendChild(container);
}




function renderNoteDeleteContainer() {
    cover1.style.visibility = "visible";
    cover1.style.top = "0";

    const storedNoteName = window.sessionStorage.getItem('note-name');

    // Creating the html elements
    const container = NodeCrafter.create('div', {'class': 'confirm_note_delete_container'})
    const span = NodeCrafter.create('span', {'textContent': storedNoteName})
    const deleteMessage1 = 'Doing this will pirmenantly delete ';
    const p1 = NodeCrafter.create('p', {'textContent': deleteMessage1, 'class': 'delete_info_message'});
    const button = NodeCrafter.create('button', {'class': 'confirm_delete_note_btn', 'textContent': 'Delete'});

    button.addEventListener('click', requestDeleteNote);

    // Appending children
    p1.appendChild(span);
    container.appendChild(p1);
    container.appendChild(button);
    cover1.appendChild(container);
}
// ____________________________________ Behavior ________________________________________________
async function requestDeleteNote() {
    const noteId = window.sessionStorage.getItem('note-id');
    const response = await deleteNote(noteId, true);
    if (response.status_code === 200) {
        removeDeletedNoteFromPage(noteId);
        clearCover1();
        cover1.style.top = '100%';
    }
}

async function requestDeleteNotePassword() {
    const noteId = MySessionStorage.get('note-id');
    const parent = true;
    const response = await deleteNotePassword(noteId, parent);
    if (response.status_code === 200) {
        clearCover1()
        cover1.style.top = "100%";
        window.location.reload();
    }
}

function removeDeletedNoteFromPage(noteId) {
    const noteCardToRemove = document.getElementById(noteId);
    noteCardToRemove.remove();
}




// ____________________________________ RenderNotePassWordContainer ____________________________________

function renderNotePasswordContainer(action) {
    // Creating the html elements
    let container = null;
    let button = null;
    if (action === 'add-password-to-note') {
        container = NodeCrafter.create('div', {'class': 'password_protection_container'});
        button = NodeCrafter.create('button', {'class': 'save_password_btn', 'textContent': 'Save'});
    }
    if (action === 'unlock-note') {
        cover1.style.visibility = "visible";
        cover1.style.top = "0";
        container = NodeCrafter.create('div', {'class': 'confirm_password_container'});
        button = NodeCrafter.create('button', {'class': 'unlock_note_btn', 'textContent': 'Unlock'});
    }
    const inputBox = NodeCrafter.create('div', {'class': 'password_protection_input_box'});
    const p = NodeCrafter.create('p', {'textContent': 'Protect your notes with a password'});
    const lockIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-key', 'id': 'lock_icon'});
    const eyeIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-eye-slash', 'id': 'password_eye_icon'});
    const input = NodeCrafter.create('input', {'id': 'note_password_input', 'type': 'password', 'placeholder': 'Password'});

    // Adding event listeners and event listener functions
    eyeIcon.addEventListener('click', passwordInputIconClick);

    if (action === 'add-password-to-note') {
        button.addEventListener('click', async ()=> {
            const noteId = MySessionStorage.get('note-id');
            const parent = true
            const password = input.value;
            const response = await addNotePassword(noteId, password, parent);
            if (response.status_code === 200) {
                cover1.style.top = '100%';
                clearCover1();
                window.location.reload();
            }
        })  
    }
    if (action === 'unlock-note') {
        button.addEventListener('click', async ()=> {
            const noteId = MySessionStorage.get('note-id');
            const password = input.value;
            const response1 = await getNotePasswordCheck(noteId, password);

            if (response1.status_code === 200) {
                const response2 = await getNoteById(true, noteId);
                if (response2.status_code === 200) {
                    const note = response2.note;
                    MySessionStorage.set('note-name', note.title);
                    MySessionStorage.set('note-content', note.content);
                    MySessionStorage.set('note-bookmark', note.bookmark);
                    MySessionStorage.set('note-password-protect', note.password_protected);
                    cover1.style.top = '100%';
                    clearCover1();
                    renderPieceOfPaper('edit-note')
                }
            }
        })
    }
        

    // Appending children
    container.appendChild(lockIcon);
    inputBox.appendChild(input);
    inputBox.appendChild(eyeIcon);
    if (action === 'add-password-to-note') {container.appendChild(p)}
    container.appendChild(inputBox);
    container.appendChild(button);
    cover1.appendChild(container);
}

// ____________________________________ Behavior ________________________________________________

function passwordInputIconClick() {
    const passwordInput = document.querySelector('#note_password_input');
    const eyeIcon = document.getElementById('password_eye_icon');
    passwordInput.type === "password" ? passwordInput.type = "text": passwordInput.type = "password";
    passwordInput.type === "password" ? eyeIcon.setAttribute('class', 'fa-solid fa-eye-slash'): eyeIcon.setAttribute('class', 'fa-solid fa-eye')
}
