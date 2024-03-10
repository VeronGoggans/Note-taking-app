import { Folder } from '../components/folder.js';
import { ListFolder } from '../components/listFolder.js';
import { DeleteContainer } from '../components/deleteContainer.js';

export class FolderView {
    constructor(folderController, dialog, notificationHandler) {
        this.folderController = folderController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-folders');
        this.dialog = dialog;
        this.notificationHandler = notificationHandler;
    }

    /** 
     * This method renders a array of folders and adds them to the UI.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} folders is an array of folders.
     */
    renderFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            const FOLDER = folders[i];
            const LIST_FOLDER_CARD = this.listFolder(FOLDER);
            const FOLDER_CARD = this.folder(FOLDER);

            this._content.appendChild(FOLDER_CARD);
            this._list.appendChild(LIST_FOLDER_CARD);
            this.#fadeInFromBottom(FOLDER_CARD);
            this.#fadeInFromSide(LIST_FOLDER_CARD);
        }
    }

    /**
     * This method adds a single folder to the UI.
     * 
     * @param {dict} folder
     */
    renderFolder(folder) {
        const LIST_FOLDER_CARD = this.listFolder(folder);
        const FOLDER_CARD = this.folder(folder);

        this._content.appendChild(FOLDER_CARD);
        this._list.appendChild(LIST_FOLDER_CARD);
        this.#fadeInFromBottom(FOLDER_CARD);
        this.#fadeInFromSide(LIST_FOLDER_CARD);
        this.dialog.hide();
    }

    /**
     * This method updates the folder card inside the list div.
     * 
     * This method is called when a 
     * folder's name has been changed
     * 
     * @param {dict} folder
     */
    renderFolderUpdate(folder) {
        const FOLDER_LIST_CARDS = this._list.children;
        for (let i = 0; i < FOLDER_LIST_CARDS.length; i++) {
            if (FOLDER_LIST_CARDS[i].id === folder.id) {
                const SPAN = FOLDER_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = folder.name;
            }
        }
    }

    /**
     * This method removes a specific folder from the UI.
     * @param {String} id 
     */
    removeFolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ALL_LIST_FOLDERS = this._list.children;
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === folder.id) {
                this._content.removeChild(ALL_FOLDERS[i]);
                this._list.removeChild(ALL_LIST_FOLDERS[i]);
            }
        }
        this.dialog.hide();
    }

    /**
     * This method creates a ListFolder component and returns it.
     * 
     * @param {Dict} folder
     * @returns {ListFolder} 
     */
    listFolder(folder) {
        return new ListFolder(folder, this);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {Dict} folder
     * @returns {Folder}
     */
    folder(folder) {
        return new Folder(folder, this);
    }

    #fadeInFromBottom(folder) {
        setTimeout(() => {
            folder.classList.add('fadeInFromBottom');
        }, 50);
    }

    #fadeInFromSide(folder) {
        setTimeout(() => {
            folder.classList.add('fadeInFromSide');
        }, 50);
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the folder.
     * 
     * @param {String} id 
     * @param {String} name
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new DeleteContainer(id, name, this));
        this.dialog.show();
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
    async updateFolder(id, name, color) {
        await this.folderController.updateFolder(id, name, color);
    }

    /**
     * This method deletes a folder.
     * 
     * This method communicates with the folder controller
     * to delete the specified folder.
     * 
     * @param {String} id The ID of the folder wished to be deleted
     */
    async handleConfirmButtonClick(id) {
        await this.folderController.deleteFolder(id);
    }

    /**
     * This method takes the user into a folder 
     * and displays the notes inside it.
     * 
     * This method is triggered when a folder card is clicked. It removes all existing folders from the screen
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id, name) {
        this.folderController.navigateIntoFolder(id, name);
    }
}