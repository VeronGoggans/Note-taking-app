import { NewFolderContainer } from '../components/newFolderContainer.js';


export class ApplicationView {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.homeButton = document.querySelector('.home-screen-btn');
        this.searchBarInput = document.querySelector('.searchbar-input');
        this.noteOptionsList = document.querySelector('.note-suggestions-list');
        this.dialog = document.querySelector('.dialog');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._searchOptions = [];

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.backButton.addEventListener('click', () => {this.back()});
        this.homeButton.addEventListener('click', () => {this.home()});
        this.createNoteButton.addEventListener('click', () => {this.showTextEditor()});
        this.createFolderButton.addEventListener('click', () => {this.renderNewFolderContainer()});
        this.searchBarInput.addEventListener('input', () => {this.handleSearchBarInput()})
        this.dialog.addEventListener('click', (event) => {if (!event.target.closest('.new-folder-container') && !event.target.closest('.delete-folder-container')) this.removeDialog()})
    }

    renderNewFolderContainer() {
        this.dialog.appendChild(new NewFolderContainer(this));
        this.renderDialog();
    }

    renderDialog() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    removeDialog() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        const CHILD = this.dialog.firstChild;
        this.dialog.removeChild(CHILD);
    }

    giveSearchOptions(options) {
        this._searchOptions = options;
    }

    handleSearchBarInput() {
        const INPUT_VALUE = this.searchBarInput.value.toLowerCase();
        const FILTERED_OPTIONS = this._searchOptions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(INPUT_VALUE)
        );
        this.renderSearchOptions(FILTERED_OPTIONS);
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
    }

    /**
     * Removes folders from the UI.
     *
     * This method removes all the child elements from the content html div and list-view html div
     *
     */
    removeContent() {
        const CONTENT = this._content;
        const LIST = this._list;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (LIST.firstChild) LIST.removeChild(LIST.firstChild);
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