// containers
const cover1 = document.querySelector(".cover");
const cover2 = document.querySelector('.cover_paper_note');
const noteContainer = document.querySelector('.notes_container');

// sidebar buttons
const sidebarBackButton = document.querySelector(".notes-page-sidebar-back-button");
const sidebarSettingsButton = document.querySelector('.notes-page-sidebar-settings-button');
const sidebarAllButton = document.querySelector('.all-notes-filter-button');
const sidebarStandardButton = document.querySelector('.standard-notes-filter-button');
const sidebarBookmarkButton = document.querySelector('.bookmarked-notes-filter-button');
const sidebarSecureButton = document.querySelector('.protected-notes-filter-button');

// other buttons
const categorySettingsButton = document.querySelector('.category-settings-button');
const newNoteButton = document.querySelector(".new-note-button");
const addNoteBtn = document.querySelector('.add_note_btn');


// EventListeners
document.addEventListener("DOMContentLoaded", () => {collectSubcategories(rerender=false)});
document.addEventListener("DOMContentLoaded", () => {collectNotes(rerender=false, 'all')});
sidebarBackButton.addEventListener("click", () => window.location.href = "./categoryPage.html");
categorySettingsButton.addEventListener('click', ()=> {renderCategorySettingsContainer()});
newNoteButton.addEventListener("click", ()=> {showPaperNote('add-note')});

sidebarAllButton.addEventListener('click', async () => {
    clearNotesContainer();
    collectNotes(rerender=false, noteType='all')
});
sidebarStandardButton.addEventListener('click', async () => {
    clearNotesContainer();
    collectNotes(rerender=false, noteType='standard')
});
sidebarBookmarkButton.addEventListener('click', async () => {
    clearNotesContainer();
    collectNotes(rerender=false, noteType='bookmark')
});
sidebarSecureButton.addEventListener('click', async () => {
    clearNotesContainer();
    collectNotes(rerender=false, noteType='password_protected')
});

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

// Functions
// Theses functions will remove all child HTML elements from them
function clearCover1() {while (cover1.firstChild) cover1.removeChild(cover1.firstChild)}     
function clearCover2() {while (cover2.firstChild) cover2.removeChild(cover2.firstChild)} 
function clearNotesContainer() {while (noteContainer.firstChild) {noteContainer.removeChild(noteContainer.firstChild)}}  

function filterButtonActiveStyles() {
    
}