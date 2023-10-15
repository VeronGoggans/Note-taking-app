// This function gets triggert when the notes page loads, and recieves all the subcategories 
// from the backend and displays them on the page.
async function collectSubcategories(rerender) {
    if (!rerender) {
        const response = await getSubcategories();
        const subcategories = response.subcategory_names;
        if (response.status_code === 200) console.log("Subcategories Successful")
        else {
            const response = await getSubcategories(rerender);
            console.log(response.subcategory_names);
        }
    }
}

async function collectNotes(rerender, noteType) {
    const categoryName = window.sessionStorage.getItem('categoryName');
    if (!rerender) {
        const response = await getNotes(categoryName, true, false, noteType);
        const statusCode = response.status_code;
        const noteListLength = response.notes.length;
        if (statusCode === 200 && noteListLength > 0) {
            const notes = response.notes;
            for (let i = 0; i < notes.length; i++) renderSpecificNoteType(notes[i].id, notes[i].title, notes[i].content, notes[i].bookmark, notes[i].password_protected);
        }
    } 
    if (rerender) {
        const response = await getNotes(categoryName, true, true, noteType);
        const noteObject = response.notes;
        renderSpecificNoteType(noteObject.id, noteObject.title, noteObject.content, noteObject.bookmark, noteObject.password_protected);
    }
}

// This function gets called for every index in the notes list that is recieved from the backend. 
// It looks at the password_protected field and determins if it is supposed to render a normal note or a secure note.
function renderSpecificNoteType(id, note_name, note_content, bookmark, passwordProtection) {
    if (passwordProtection) renderSecureNote(id, note_name, note_content, bookmark, passwordProtection); 
    if (!passwordProtection) renderNote(id, note_name, note_content, bookmark, passwordProtection);
}


// This function will delete a category from the backend.
// And then return to the categories page. 
async function requestDeleteCategory() {
    const categoryId = window.sessionStorage.getItem('categoryId');
    const response = await deletecategory(categoryId)
    if (response.status_code === 200) returnToCategoryPage();
}

// This function will update the category name.
async function requestUpdateCategory(categoryName) {
    const categoryId = MySessionStorage.get('categoryId');
    const response = await updateCategory(categoryId, categoryName);
    if (response.status_code === 200) {
        MySessionStorage.set('categoryName', categoryName)
        cover1.style.top = '100%';
        clearCover1()
    }
}

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
        collectNotes(rerender=true, );
    } else alert("Error")
} 

// This function will collect all the information of a note from the session storage 
// noteId, bookmark, password protected 
// noteName from the input and the note content from the content editable div.
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