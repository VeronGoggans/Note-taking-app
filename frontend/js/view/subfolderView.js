import { Folder } from "../components/folder.js";
import { ListFolder } from "../components/listFolder.js";
import { DeleteFolderContainer } from '../components/deleteFolderContainer.js';
import { NewFolderContainer } from '../components/newFolderContainer.js';


export class SubfolderView {
    constructor(controller) {
        this.subfolderController = controller;
        this.dialog = document.querySelector('.dialog');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
    }

    renderDeleteFolderContainer(id, name) {
        this.dialog.appendChild(new DeleteFolderContainer(id, name, this));
        this.renderDialog();
    }

    renderNewFolderContainer() {
        this.dialog.appendChild(new NewFolderContainer(this));
        this.renderDialog();
    }

    renderListViewSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.listSubfolder(ID, NAME);
            this._list.appendChild(SUBFOLDER_CARD);
        }
    }

    renderSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.subfolder(ID, NAME);
            this._content.appendChild(SUBFOLDER_CARD);
        }
    }

    listSubfolder(id, name) {
        return new ListFolder(id, name, this);
    }

    subfolder(id, name) {
        return new Folder(id, name, this);
    }

    async updateFolder(id, name) {
        this.subfolderController.updateSubfolder(id, name);
    }

    async deleteFolder(id) {
        this.subfolderController.deleteSubfolder(id);
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
        this.subfolderController.navigateIntoFolder(id);
    }

    removeFolders() {
        const CONTENT = this._content;
        const LIST = this._list;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (LIST.firstChild) LIST.removeChild(LIST.firstChild);
    }


    /**
     * Removes a specific folder from the UI.
     *
     * This method removes the folder from the UI that it has been given.
     * @param {number} id the ID of the folder to be removed from the UI.
     * @returns {void}
     */
    removefolder(folder) {
        console.log(folder);
        const ALL_FOLDERS = this._content.children;
        const ID = folder.id
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === ID) {
                this._content.removeChild(ALL_FOLDERS[i]);
                this._list.querySelector(`#${ID}`);
            }
        }
        this.removeDialog();
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