import { NewFolderContainer } from '../components/newFolderContainer.js';
import { SettingsContainer } from '../components/settingsContainer.js';
import { Dialog } from '../util/dialog.js';
import { Themes } from '../util/themes.js';


export class ApplicationView {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.themes = new Themes(window.localStorage.getItem('theme'));
        this.dialog = new Dialog();
        
        // <main-top> 
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.currentFolderName = document.querySelector('.current-folder-name');
        this.searchBarInput = document.querySelector('.searchbar-input');
        this.noteOptionsList = document.querySelector('.note-suggestions-list');

        // <sidebar-content>
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.homeButton = document.querySelector('.home-screen-btn');
        this.settingsButton = document.querySelector('.settings-btn');

        // other
        this._dialog = document.querySelector('.dialog');
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
        this.settingsButton.addEventListener('click', () => {this.renderSettingsContainer()});
        this.searchBarInput.addEventListener('input', () => {this.handleSearchBarInput()});

        this._dialog.addEventListener('click', (event) => {
            if (!event.target.closest('.new-folder-container') && 
            !event.target.closest('.delete-folder-container') &&
            !event.target.closest('.settings-container') && 
            !event.target.closest('.dont-forget-to-save-container')) {
                this.dialog.hide();
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
     * This method listens for li element clicks 
     * within the noteOptionsList ul element
     * 
     * This method is called everytime the suggested 
     * notes are updated.
     * 
     * The suggested notes in the searchbar are updated 
     * when the user gives input.
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
        const CONTAINER = new NewFolderContainer(this);
        this.dialog.addChild(CONTAINER);
        this.dialog.show();
    }
    
    renderSettingsContainer() {
        this.dialog.addChild(new SettingsContainer(this, this.themes));
        this.dialog.show();
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
        const HTML = options.map(option => `<li id=${option.id}>${option.name}</li>`).join("");
        this.noteOptionsList.innerHTML = HTML;
        this.listenForSearchClicks();
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

    /**
     * This method toggles the text editor visibility
     * 
     * This method is called by the following events 
     * 1. Note button inside sidebar is clicked
     * 2. Note suggestion inside the searchbar is clicked
     * 3. Note card is clicked
     * 4. Return button inside text editor is clicked
     */
    toggleTextEditorVisibility() {
        // toggle the visibility.
        this.textEditorWrapper.style.visibility = this.textEditorWrapper.style.visibility === 'visible' ? 'hidden' : 'visible';
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
          suggestion.name.toLowerCase().includes(INPUT_VALUE)
        );
        this.renderSearchOptions(FILTERED_OPTIONS);
      }

    /**
     * This method is called when the home button is clicked
     */
    home() {
        this.removeContent();
        this.displayFolderName('Home');
        this.applicationController.navigateToHomescreen();
    }

    /**
     * This method is called when the back button is clicked
     */
    back() {
        this.removeContent();
        this.applicationController.navigateOutofFolder();
    }

    /**
     * This method is called when the note button is clicked
     */
    showTextEditor() {
        this.applicationController.showTextEditor();
    }

    displayFolderName(name) {
        this.currentFolderName.textContent = name;
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
     * This method is called from with in the new folder container
     *  
     * @param {String} name 
     */
    async handleAddFolderButtonClick(name) {
        await this.applicationController.handleAddFolder(name);
    }

    /**
     * This method will add a search bar object to the 
     * _searchNoteObjects array. 
     * 
     * This method is called everytime a new note is created.
     * 
     * @param {String} id 
     * @param {String} name 
     */
    addSearchObject(id, name) {
        const SEARCH_OBJECT = {'id': id, 'name': name};
        this._searchNoteObjects.push(SEARCH_OBJECT);
    }

    /**
     * This method will remove a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets deleted.
     * 
     * @param {String} id 
     */
    deleteSearchObject(id) {
        this._searchNoteObjects = this._searchNoteObjects.filter(obj => obj.id !== id);
    }

    /**
     * This method will update a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets updated.
     * 
     * @param {String} noteId 
     * @param {String} name 
     */
    updateSearchObject(noteId, newName) {
        const OPTION = this._searchNoteObjects.find(obj => obj.id === noteId);
        OPTION.name = newName;
    }
}