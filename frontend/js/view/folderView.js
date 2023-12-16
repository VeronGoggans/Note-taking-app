import { CNode } from '../util/CNode.js';
import { Folder } from '../components/folder.js';
import { ListFolder } from '../components/listFolder.js';

export class FolderView {
    constructor(folderController) {
        this.folderController = folderController;
        this.backoutButton = document.querySelector('.exit-folder-btn');
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.homeButton = document.querySelector('.home-screen-btn');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this._folders = [];

        this.backoutButton.addEventListener('click', () => {this.homeScreen()});
        this.homeButton.addEventListener('click', () => {this.homeScreen()});
    }

    renderListViewFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            // code appending a Lit element to this._list
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const FOLDER_CARD = this.listFolder(ID, NAME);
            this._list.appendChild(FOLDER_CARD);
        }
    }

    renderFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            // code appending a Lit element to this._content
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const FOLDER_CARD = this.folder(ID, NAME);
            this._content.appendChild(FOLDER_CARD);
        }
    }

    renderFolder(folder) {
        const ID = folder.id;
        const NAME = folder.name;
        const FOLDER_CARD = this.folder(ID, NAME);
        this._content.appendChild(FOLDER_CARD);
    }

    listFolder(id, name) {
        return new ListFolder(id, name, this);
    }

    folder(id, name) {
        this._folders.push(id);
        return new Folder(id, name, this);
    }

    async updateFolder(id, name) {
        this.folderController.updateFolder(id, name);
    }

    /**
     * Takes the user into a folder and displays the notes inside it.
     * 
     * This method is triggered when a folder card is clicked. It removes all existing folders from the screen
     * using {@link removeFolders}, and then it navigates into the specified folder, displaying its notes and subfolders
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id) {
        this.removeFolders();
        this.folderController.navigateIntoFolder(id);
    }

    /**
     * Removes folders from the UI and empties the internal folders array.
     *
     * This method iterates through the `_folders` array, and removes the corresponding
     * elements from both the `_list` and `_content` elements based on their IDs, and
     * finally, empties the `_folders` array.
     *
     * @returns {void}
     */
    removeFolders() {
        for (let i = 0; i < this._folders.length; i++) {
            const ID = this._folders[i];
            const LIST_FOLDER = this._list.querySelector(`#${ID}`);
            const CONTENT_FOLDER = this._content.querySelector(`#${ID}`);
        
            LIST_FOLDER.remove();
            CONTENT_FOLDER.remove();
        }
        // Make the array empty.
        this._folders.splice(0, this._folders.length);
    }


    /**
     * Removes a specific folder from the UI.
     *
     * This method removes the folder from the UI that it has been given.
     * @param {object} folder the folder to be removed from the UI.
     * @returns {void}
     */
    removefolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ID = folder.id;
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === ID) this._content.removeChild(ALL_FOLDERS[i]);
        }
    }


    clearContent() {
        const NOTES = this._content.children;
        for (let i = 0; i < NOTES.length; i++) {
            const NOTE = NOTES[i]
            NOTE.remove();
        }
    }


    homeScreen() {
        this.clearContent();
        this.folderController.navigateOutOfFolder();
    }
}