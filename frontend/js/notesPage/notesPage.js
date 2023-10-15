// containers
const cover1 = document.querySelector(".cover_delete_box");
const cover2 = document.querySelector('.cover_paper_note');

// sidebar buttons
const sidebarBackButton = document.querySelector(".notes-page-sidebar-back-button");
const sidebarSettingsButton = document.querySelector('.notes-page-sidebar-settings-button');

// other buttons
const categorySettingsButton = document.querySelector('.category-settings-button');
const newNoteButton = document.querySelector(".new-note-button");
const addNoteBtn = document.querySelector('.add_note_btn');


// EventListeners
document.addEventListener("DOMContentLoaded", () => {collectSubcategories(rerender=false)});
document.addEventListener("DOMContentLoaded", () => {collectNotes(rerender=false)});
sidebarBackButton.addEventListener("click", ()=> window.location.href = "./categoryPage.html");
categorySettingsButton.addEventListener('click', ()=> renderCategorySettingsContainer);
cover1.addEventListener("click", (event) => {
    if (
    !event.target.closest('.delete_note_box') && 
    !event.target.closest('.add_category_container') && 
    !event.target.closest('.category_settings_container') &&
    !event.target.closest('.confirm_category_delete_container') && 
    !event.target.closest('.note_settings_container') &&
    !event.target.closest('.password_protection_container') && 
    !event.target.closest('.confirm_password_container') && 
    !event.target.closest('.move-note-container')
    ) {
        cover1.style.top = '100%';
        clearCover1();
    }
});

newNoteButton.addEventListener("click", ()=> {
    renderPieceOfPaper('add-note');
    renderPaperNoteBtnBar();
});

// Functions

// This function will remove all child HTML elements from the cover1 element
function clearCover1() {while (cover1.firstChild) cover1.removeChild(cover1.firstChild)}     
function clearCover2() {while (cover2.firstChild) cover2.removeChild(cover2.firstChild)}   


// This function gets triggert when the notes page loads, and recieves all the subcategories 
// from the backend and displays them on the page.
async function collectSubcategories(rerender) {
    if (!rerender) {
        const response = await getSubcategories();
        const subcategories = response.subcategory_names;
        if (response.status_code === 200) {
            console.log("Subcategories Successful")
        } else {
            const response = await getSubcategories(rerender);
            console.log(response.subcategory_names);
        }
    }
}


// This function can get triggert in multiple use cases.
// Usecase 1 - loading the notes page (rerender=false)
// Usecase 2 - adding a note (rerender=true)
// Function parameters 
// Parameter 1 - rerender 
// This parameter tells the function what usecase it is supposed to complete
// If rerender is true the function will return the last note that is stored in the backend
// Rerender will only be true if a note is created.
// If rerender is false the function will return all notes. 
async function collectNotes(rerender) {
    const categoryName = window.sessionStorage.getItem('categoryName');
    if (!rerender) {
        const response = await getNotes(categoryName, true, false, 'all');
        const statusCode = response.status_code;
        const noteListLength = response.notes.length;

        if (statusCode === 200 && noteListLength > 0) {
            const notes = response.notes;
            for (let i = 0; i < notes.length; i++) {
                renderSpecificNoteType(notes[i].id, notes[i].title, notes[i].content, notes[i].bookmark, notes[i].password_protected);
            }
        }
    } 
    if (rerender) {
        const response = await getNotes(categoryName, true, true, 'all');
        const noteObject = response.notes;
        renderSpecificNoteType(noteObject.id, noteObject.title, noteObject.content, noteObject.bookmark, noteObject.password_protected);
    }
}

// This function gets called for every index in the notes list that is recieved from the backend. 
// It looks at the password_protected field and determins if it is supposed to render a normal note or a secure note.
function renderSpecificNoteType(id, note_name, note_content, bookmark, passwordProtection) {
    if (passwordProtection) {
        renderSecureNote(id, note_name, note_content, bookmark, passwordProtection);
    } 
    if (!passwordProtection) {
        renderNote(id, note_name, note_content, bookmark, passwordProtection);
    }
}