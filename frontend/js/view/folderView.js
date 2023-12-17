import { DeleteFolderContainer } from '../components/deleteFolderContainer.js';
import { Folder } from '../components/folder.js';
import { ListFolder } from '../components/listFolder.js';
import { NewFolderContainer } from '../components/newFolderContainer.js';

export class FolderView {
    constructor(folderController) {
        this.folderController = folderController;
        this.backoutButton = document.querySelector('.exit-folder-btn');
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.dialog = document.querySelector('.dialog');
        this.homeButton = document.querySelector('.home-screen-btn');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this._folders = [];

        this.backoutButton.addEventListener('click', () => {this.homeScreen()});
        this.homeButton.addEventListener('click', () => {this.homeScreen()});
        this.createFolderButton.addEventListener('click', () => {this.renderNewFolderContainer()});
        this.dialog.addEventListener('click', (event) => {if (!event.target.closest('.new-folder-container') && !event.target.closest('.delete-folder-container')) this.removeDialog()})
    }

    renderDeleteFolderContainer(id, name) {
        this.dialog.appendChild(new DeleteFolderContainer(id, name, this));
        this.renderDialog();
    }

    renderNewFolderContainer() {
        this.dialog.appendChild(new NewFolderContainer(this));
        this.renderDialog();
    }

    renderListViewFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const FOLDER_CARD = this.listFolder(ID, NAME);
            this._list.appendChild(FOLDER_CARD);
        }
    }

    renderFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
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
        this.removeDialog();
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

    async deleteFolder(id) {
        this.folderController.deleteFolder(id);
    }

    async addFolder(name) {
        this.folderController.addFolder(name);
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
        const CONTENT_VIEW_LIST = this._content.children;
        this.removeFolders(CONTENT_VIEW_LIST);
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
    removeFolders(items) {
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            const ID = this._folders[i];
            const LIST_FOLDER = this._list.querySelector(`#${ID}`);
            const CONTENT_FOLDER = this._content.querySelector(`#${ID}`);
        
            LIST_FOLDER.remove();
            CONTENT_FOLDER.remove();
        }
    }


    /**
     * Removes a specific folder from the UI.
     *
     * This method removes the folder from the UI that it has been given.
     * @param {number} id the ID of the folder to be removed from the UI.
     * @returns {void}
     */
    removefolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ID = folder.id
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === ID) {
                this._content.removeChild(ALL_FOLDERS[i]);
                this._list.querySelector(`#${ID}`);
            }
        }
        this.removeDialog();
        this._folders.remove()
    }


    clearContent() {
        const ITEMS = this._content.children;
        for (let i = 0; i < ITEMS.length; i++) {
            const ITEM = ITEMS[i]
            ITEM.remove();
        }
    }


    homeScreen() {
        this.clearContent();
        this.folderController.navigateOutOfFolder();
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
}