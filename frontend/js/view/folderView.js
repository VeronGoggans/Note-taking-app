import { Folder } from '../components/folder.js';
import { ListFolder } from '../components/listFolder.js';
import { DeleteContainer } from '../components/deleteContainer.js';


export class FolderView {
    constructor(folderController) {
        this.folderController = folderController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this.dialog = document.querySelector('.dialog');

    }

    /**
     * This method renders a array of folders.
     * 
     * This method renders a array of folders and adds them to the UI.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} folders is an array of folders.
     */
    renderFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const LIST_FOLDER_CARD = this.listFolder(ID, NAME);
            const FOLDER_CARD = this.folder(ID, NAME);
            this._content.appendChild(FOLDER_CARD);
            this._list.appendChild(LIST_FOLDER_CARD);
        }
    }

    /**
     * This method adds a single folder to the UI.
     * 
     * This method adds the folder to the content div and list div.
     * 
     * @param {dict} folder The folder that needs to be added to the UI. 
     */
    renderFolder(folder) {
        const ID = folder.id;
        const NAME = folder.name;
        const FOLDER_CARD = this.folder(ID, NAME);
        const FOLDER_LIST_CARD = this.listFolder(ID, NAME);
        this._content.appendChild(FOLDER_CARD);
        this._list.appendChild(FOLDER_LIST_CARD);
        this.removeDialog();
    }

    /**
     * This method updates the subfolder card inside the list div.
     * 
     * @param {dict} folder the updated folder.
     */
    renderFolderUpdate(folder) {
        const ID = folder.id;
        const NAME = folder.name;
        const FOLDER_LIST_CARDS = this._list.children;
        for (let i = 0; i < FOLDER_LIST_CARDS.length; i++) {
            if (FOLDER_LIST_CARDS[i].id === ID) {
                const SPAN = FOLDER_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = NAME;
            }
        }
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the folder.
     * 
     * @param {String} id The ID of the folder wished to be deleted.
     * @param {String} name The name of the folder wished to be deleted.
     */
    renderDeleteContainer(id, name) {
        this.dialog.appendChild(new DeleteContainer(id, name, this));
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
     * @param {String} id The ID of the folder.
     * @param {String} name The name of the folder.
     * @returns {ListFolder} The list folder card 
     */
    listFolder(id, name) {
        return new ListFolder(id, name, this);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {String} id The ID of the folder.
     * @param {String} name The name of the folder.
     * @returns {Folder} The folder card 
     */
    folder(id, name) {
        return new Folder(id, name, this);
    }

    /**
     * This method updates a folder
     * 
     * This method will communicate to the folder controller 
     * to update a folder.
     * 
     * @param {String} id The ID of the folder wished to be updated.
     * @param {String} name The new name for the folder.
     */
    async updateFolder(id, name) {
        await this.folderController.updateFolder(id, name);
    }

    /**
     * This method deletes a folder.
     * 
     * This method communicates with the folder controller
     * to delete the specified folder.
     * 
     * @param {String} id The ID of the folder wished to be updated
     */
    async handleConfirmButtonClick(id) {
        await this.folderController.deleteFolder(id);
    }

    /**
     * Takes the user into a folder and displays the notes inside it.
     * 
     * This method is triggered when a folder card is clicked. It removes all existing folders from the screen
     * using {@link removeContent}, and then it navigates into the specified folder, displaying its notes and subfolders
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id) {
        this.removeContent();
        this.folderController.navigateIntoFolder(id);
    }

    /**
     * Removes folders from the UI.
     *
     * This method removes all the child elements from the content html div and list-view html div
     *
     * @returns {void}
     */
    removeContent() {
        const CONTENT = this._content;
        const LIST = this._list;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (LIST.firstChild) LIST.removeChild(LIST.firstChild);
    }

    /**
     * Removes a specific folder from the UI.
     *
     * This method removes the folder from the UI that it has been given.
     * @param {String} id the ID of the folder to be removed from the UI.
     */
    removefolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ALL_LIST_FOLDERS = this._list.children;
        const ID = folder.id
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === ID) {
                this._content.removeChild(ALL_FOLDERS[i]);
                this._list.removeChild(ALL_LIST_FOLDERS[i]);
            }
        }
        this.removeDialog();
    }
}