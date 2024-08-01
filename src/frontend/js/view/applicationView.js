import { RecentFolder } from "../components/folder.js";
import { FolderObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";


export class ApplicationView {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.folderObjects = new FolderObjectArray()

        this.#initializeDomElements();
        this.#attachEventListeners();
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
        const searchBarValues = this.noteOptionsList.children;
        for (let i = 0; i < searchBarValues.length; i++) {
            const id = searchBarValues[i].id;
            const child = searchBarValues[i];
            if (child.nodeName === 'LI') {
                searchBarValues[i].addEventListener('click', () => {
                    this.handleSearch(id);
                    this.searchBarInput.value = '';
                });
            }
        }
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
        const inputValue = this.searchBarInput.value.toLowerCase();
        const filteredOptions = this._searchNoteObjects.filter(suggestion =>
          suggestion.name.toLowerCase().includes(inputValue)
        );
        this.renderSearchOptions(filteredOptions);
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
        let html = ''
        let currentFolderName = '';
        options.forEach(option => {
            if (currentFolderName !== option.folder_name) {
                currentFolderName = option.folder_name;
                html += `<p>${currentFolderName}<i class="fa-solid fa-folder"></i></p>`;
            }
            html += `<li id=${option.id}>${option.name}</li>`
        })
        this.noteOptionsList.innerHTML = html;
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
     * This method is called when the note button is clicked
     */
    showTextEditor() {
        this.applicationController.showTextEditor();
    }

    addSearchObject(id, name, folderName) {
        this._searchNoteObjects.push(
            {'id': id, 'name': name, 'folder_name': folderName}
        );
    }

    deleteSearchObject(id) {
        this._searchNoteObjects = this._searchNoteObjects.filter(obj => obj.id !== id);
    }

    updateSearchObject(noteId, newName) {
        const option = this._searchNoteObjects.find(obj => obj.id === noteId);
        option.name = newName;
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

    #initializeDomElements() {        
        this.searchBarInput = document.querySelector('.searchbar-input');
        this.noteOptionsList = document.querySelector('.note-suggestions-list');

        this._content = document.querySelector('.recent-folders');
        this._searchNoteObjects = [];
    }
    
    #attachEventListeners() {
        // this.searchBarInput.addEventListener('input', () => {this.handleSearchBarInput()});
        // this.searchBarInput.addEventListener('click', () => {this.handleSearchBarInput()});
        // this.searchBarInput.addEventListener('keydown', (event) => {});
        // document.addEventListener("click", (event) => {
        //     if (!event.target.closest(".search-container")) {
        //         this.noteOptionsList.innerHTML = "";
        //         this.noteOptionsList.style.visibility = 'hidden';
        //     }
        // });
    }
}