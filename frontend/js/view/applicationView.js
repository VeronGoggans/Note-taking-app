import { NewFolderContainer } from '../components/newFolderContainer.js';


export class ApplicationView {
    constructor(applicationController) {
        this.applicationController = applicationController;
        // <main-top> 
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.searchBarInput = document.querySelector('.searchbar-input');
        this.noteOptionsList = document.querySelector('.note-suggestions-list');

        // <sidebar-content>
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.homeButton = document.querySelector('.home-screen-btn');

        // other
        this.dialog = document.querySelector('.dialog');
        this._content = document.querySelector('.content-view');
        this._listViewFolders = document.querySelector('.list-content-folders');
        this._listViewNotes = document.querySelector('.list-content-notes');
        this._searchNoteObjects = [];

        this.attachEventListeners();
    }

    /**
     * This method initiates all the event listeners 
     * that are in the following html elements
     * - <main-top>
     * - <sidebar-content>
     * - <dialog>
     */
    attachEventListeners() {
        this.backButton.addEventListener('click', () => {this.back()});
        this.homeButton.addEventListener('click', () => {this.home()});
        this.createNoteButton.addEventListener('click', () => {this.showTextEditor()});
        this.createFolderButton.addEventListener('click', () => {this.renderNewFolderContainer()});
        this.searchBarInput.addEventListener('input', () => {this.handleSearchBarInput()})
        this.dialog.addEventListener('click', (event) => {
            if (!event.target.closest('.new-folder-container') && 
            !event.target.closest('.delete-folder-container')) {
                this.removeDialog();
            }
        });
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".search-container")) {
                this.noteOptionsList.innerHTML = "";
                this.noteOptionsList.style.visibility = 'hidden';
            }
        });
    }

    /**
     * This method is listens for <li> clicks 
     * within the noteOptionsList <ul> tag
     * 
     * This method is called everytime the suggested 
     * notes are updated.
     */
    listenForSearchClicks() {
        const SEARCHBAR_VALUES = this.noteOptionsList.children;
        for (let i = 0; i < SEARCHBAR_VALUES.length; i++) {
            const ID = SEARCHBAR_VALUES[i].id;
            SEARCHBAR_VALUES[i].addEventListener('click', () => {
                this.handleSearch(ID);
                this.searchBarInput.value = '';
            });
        }
    }

    /**
     * This method renders a new folder container
     * 
     * The new folder container contains a input and a button 
     * Input is for the new folder name and the 
     * button is to confirm the new folder 
     */
    renderNewFolderContainer() {
        this.dialog.appendChild(new NewFolderContainer(this));
        this.renderDialog();
    }

    /**
     * This method shows the dialog to the screen.
     */
    renderDialog() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    /**
     * This method renders all the note names 
     * in the search options container
     * 
     * This method is called by the start method 
     * in the application controller.
     * @param {Array} options 
     */
    renderSearchOptions(options) { 
        const HTML = options.map(option => `<li id=${option.id}>${option.title}</li>`).join("");
        this.noteOptionsList.innerHTML = HTML;
        this.listenForSearchClicks();
    }

    /**
     * This method hides the dialog from the screen
     */
    removeDialog() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        const CHILD = this.dialog.firstChild;
        this.dialog.removeChild(CHILD);
    }

    /**
     * This method puts all the note option objects
     * in the _searchNoteObjects list
     * 
     * @param {Array} options 
     */
    giveSearchOptions(options) {
        this._searchNoteObjects = options;
    }


    /**
     * This method removes the following from the UI
     * - list folder card 
     * - folder card
     * - list note card 
     * - note card
     */
    removeContent() {
        const CONTENT = this._content;
        const FOLDERS = this._listViewFolders;
        const NOTES = this._listViewNotes;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (FOLDERS.firstChild) FOLDERS.removeChild(FOLDERS.firstChild);
        while (NOTES.firstChild) NOTES.removeChild(NOTES.firstChild);
    }

    toggleTextEditorVisibility() {
        // toggle the visibility.
        this.textEditorWrapper.style.visibility = this.textEditorWrapper.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    // Communication with the application controller
    home() {
        this.removeContent();
        this.applicationController.navigateToHomescreen();
    }

    back() {
        this.removeContent();
        this.applicationController.navigateOutofFolder();
    }

    showTextEditor() {
        this.applicationController.showTextEditor();
    }

    /**
     * This method handles input in the searchbar
     * 
     * This method takes the current value of the searchbar 
     * and looks if that string takes place in any of the 
     * note names.
     * 
     * Then it rerenders the remaining notes
     * by calling the renderSearchOptions method
     */
    handleSearchBarInput() {
        this.noteOptionsList.style.visibility = 'visible';
        const INPUT_VALUE = this.searchBarInput.value.toLowerCase();
        const FILTERED_OPTIONS = this._searchNoteObjects.filter(suggestion =>
          suggestion.title.toLowerCase().includes(INPUT_VALUE)
        );
        this.renderSearchOptions(FILTERED_OPTIONS);
      }

    /**
     * This method handles the  event of a user 
     * searching for a note.
     * 
     * This method is called when a user clicks on 
     * a note in the search suggestions.
     * 
     * @param {String} noteId 
     */
    async handleSearch(noteId) {
        this.noteOptionsList.style.visibility = 'hidden';
        await this.applicationController.getSearchedNote(noteId);
    }

    /**
     * This method handle the add folder button click 
     * 
     * This method is triggered from with in the new folder container
     *  
     * @param {String} name 
     */
    async handleAddFolderButtonClick(name) {
        await this.applicationController.handleAddFolder(name);
    }
}