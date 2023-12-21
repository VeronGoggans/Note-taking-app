import { Folder } from "../components/folder.js";
import { ListFolder } from "../components/listFolder.js";
import { DeleteFolderContainer } from '../components/deleteFolderContainer.js';



export class SubfolderView {
    constructor(controller) {
        this.subfolderController = controller;
        this.dialog = document.querySelector('.dialog');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
    }
    /**
     * This method renders a array of subfolders.
     * 
     * This method renders a array of subfolders to the list div.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} subfolders is an array of subfolders.
     */
    renderListViewSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.listSubfolder(ID, NAME);
            this._list.appendChild(SUBFOLDER_CARD);
        }
    }

    /**
     * This method renders a array of subfolders.
     * 
     * This method renders a array of subfolders to the content div.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} subfolders is an array of subfolders.
     */
    renderSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.subfolder(ID, NAME);
            this._content.appendChild(SUBFOLDER_CARD);
        }
    }

    /**
     * This method adds a single subfolder to the UI.
     * 
     * This method adds the subfolder to the content div and list div.
     * 
     * @param {dict} subfolder The subfolder that needs to be added to the UI. 
     */
    renderSubfolder(subfolder) {
        const ID = subfolder.id;
        const NAME = subfolder.name;
        const FOLDER_CARD = this.subfolder(ID, NAME);
        const FOLDER_LIST_CARD = this.listSubfolder(ID, NAME);
        this._content.appendChild(FOLDER_CARD);
        this._list.appendChild(FOLDER_LIST_CARD);
        this.removeDialog();
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the folder.
     * 
     * @param {String} id The ID of the folder wished to be deleted.
     * @param {String} name The name of the folder wished to be deleted.
     */
    renderDeleteFolderContainer(id, name) {
        this.dialog.appendChild(new DeleteFolderContainer(id, name, this));
        this.renderDialog();
    }


    /**
     * This method renders the dialog.
     */
    renderDialog() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    /**
     * This method removes the child of the dialog and the dialog itself from the UI.
     */
    removeDialog() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        const CHILD = this.dialog.firstChild;
        this.dialog.removeChild(CHILD);
    }


    /**
     * This method creates a ListFolder component and returns it.
     * 
     * @param {String} id The ID of the subfolder.
     * @param {String} name The name of the subfolder.
     * @returns {ListFolder} The list subfolder card 
     */
    listSubfolder(id, name) {
        return new ListFolder(id, name, this);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {String} id The ID of the subfolder.
     * @param {String} name The name of the subfolder.
     * @returns {Folder} The subfolder card 
     */
    subfolder(id, name) {
        return new Folder(id, name, this);
    }

    /**
     * This method updates a subfolder
     * 
     * This method will communicate to the subfolder controller 
     * to update a subfolder.
     * 
     * @param {String} id The ID of the subfolder wished to be updated.
     * @param {String} name The new name for the subfolder.
     */
    async updateFolder(id, name) {
        this.subfolderController.updateSubfolder(id, name);
    }

    /**
     * This method deletes a subfolder.
     * 
     * This method communicates with the subfolder controller
     * to delete the specified subfolder.
     * 
     * @param {String} id The ID of the subfolder wished to be updated
     */
    async handleConfirmButtonClick(id) {
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

    /**
     * Remove all the content from the sreen.
     * 
     * This method removes all the notes and folders from both the content div and list div.
     */
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
     * @param {dict} folder the folder to be removed from the UI.
     * This method recieves the folder from the backend through the subfolder model.
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
}