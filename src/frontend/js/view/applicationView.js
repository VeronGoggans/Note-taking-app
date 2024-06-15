export class ApplicationView {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;

        this._initializeDomElements();
        this._attachEventListeners();
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
        const INPUT_VALUE = this.searchBarInput.value.toLowerCase();
        const FILTERED_OPTIONS = this._searchNoteObjects.filter(suggestion =>
          suggestion.name.toLowerCase().includes(INPUT_VALUE)
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
     * This method removes all the creatable components from the UI
     */
    removeContent() {
        while (this._content.firstChild) 
            this._content.removeChild(this._content.firstChild);
    }

    /**
     * This method is called when the home button is clicked
     * The home button takes the user to the home screen
     */
    home() {
        this.displayFolderName('Home');
        this.applicationController.navigateToHomescreen();
    }

    /**
     * This method is called when the back button is clicked
     * The back button takes the user to the previous folder
     */
    back() {
        this.applicationController.navigateOutofFolder();
    }

    favorites() {
        this.applicationController.navigateIntoFolder('f-2', 'Favorites')
    }

    templates() {
        this.removeContent()
        this.displayFolderName('Templates')
        this.applicationController.getTemplates();
    }

    /**
     * This method is called when the note button is clicked
     */
    showTextEditor() {
        this.applicationController.showTextEditor();
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
    addSearchObject(id, name, folderName) {
        this._searchNoteObjects.push(
            {'id': id, 'name': name, 'folder_name': folderName}
        );
        console.log(folderName);
    }

    /**
     * This method removes a search object from 
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
     * This method updates a search object from 
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

    /**
     * This method displays the current folder name 
     * @param {String} name 
     */
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

    async updateTheme() {
        await this.applicationController.setTheme(false)
    }

    async updateEditorPageStyle() {
        await this.applicationController.updateEditorPageStyle()
    }

    _initializeDomElements() {
        // <main-top> 
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.currentFolderName = document.querySelector('.current-folder-name');
        this.searchBarInput = document.querySelector('.searchbar-input');
        this.noteOptionsList = document.querySelector('.note-suggestions-list');

        // <sidebar-content>
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.homeButton = document.querySelector('.home-screen-btn');
        this.templatesButton = document.querySelector('.templates-btn');
        this.favoritesButton = document.querySelector('.favorites-btn');
        this.settingsButton = document.querySelector('.settings-btn');

        // other
        this._content = document.querySelector('.content-view');
        this._listViewFolders = document.querySelector('.list-content-folders');
        this._listViewNotes = document.querySelector('.list-content-notes');
        this._searchNoteObjects = [];
    }
    
    _attachEventListeners() {
        this.backButton.addEventListener('click', () => {this.back()});
        this.homeButton.addEventListener('click', () => {this.home()});
        this.createNoteButton.addEventListener('click', () => {this.showTextEditor()});
        this.favoritesButton.addEventListener('click', () => {this.favorites()});
        this.templatesButton.addEventListener('click', () => {this.templates()});
        this.createFolderButton.addEventListener('click', () => {this.dialog.renderNewFolderModal(this)});
        this.settingsButton.addEventListener('click', () => {this.updateTheme()});
        this.searchBarInput.addEventListener('input', () => {this.handleSearchBarInput()});
        this.searchBarInput.addEventListener('keydown', (event) => {});
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".search-container")) {
                this.noteOptionsList.innerHTML = "";
                this.noteOptionsList.style.visibility = 'hidden';
            }
        });
    }
}