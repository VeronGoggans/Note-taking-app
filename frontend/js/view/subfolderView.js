import { Folder } from "../components/folder.js";
import { ListFolder } from "../components/listFolder.js";
import { DeleteContainer } from '../components/deleteContainer.js';



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
     * This method renders a array of subfolders and adds them to the UI.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} subfolders is an array of subfolders.
     */
    renderSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_LIST_CARD = this.listSubfolder(ID, NAME);
            const SUBFOLDER_CARD = this.subfolder(ID, NAME);
            this._content.appendChild(SUBFOLDER_CARD);
            this._list.appendChild(SUBFOLDER_LIST_CARD);
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
        const SUBFOLDER_CARD = this.subfolder(ID, NAME);
        const SUBFOLDER_LIST_CARD = this.listSubfolder(ID, NAME);
        this._content.appendChild(SUBFOLDER_CARD);
        this._list.appendChild(SUBFOLDER_LIST_CARD);
        this.removeDialog();
    }

    /**
     * This method updates the subfolder card inside the list div.
     * 
     * @param {dict} subfolder the updated subfolder.
     */
    renderSubfolderUpdate(subfolder) {
        const ID = subfolder.id;
        const NAME = subfolder.name;
        const SUBFOLDER_LIST_CARDS = this._list.children;
        for (let i = 0; i < SUBFOLDER_LIST_CARDS.length; i++) {
            if (SUBFOLDER_LIST_CARDS[i].id === ID) {
                const SPAN = SUBFOLDER_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = NAME;
            }
        }
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the subfolder.
     * 
     * @param {String} id The ID of the subfolder wished to be deleted.
     * @param {String} name The name of the subfolder wished to be deleted.
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
     * using {@link removeContent}, and then it navigates into the specified folder, displaying its notes and subfolders
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id) {
        this.removeContent();
        this.subfolderController.navigateIntoFolder(id);
    }

    /**
     * Remove all the content from the sreen.
     * 
     * This method removes all the notes and folders from both the content div and list div.
     */
    removeContent() {
        const CONTENT = this._content;
        const LIST = this._list;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (LIST.firstChild) LIST.removeChild(LIST.firstChild);
    }

    /**
     * Removes a specific subfolder from the UI.
     *
     * This method removes the subfolder from the UI that it has been given.
     * @param {dict} subfolder the subfolder to be removed from the UI.
     * This method recieves the subfolder from the backend through the subfolder model.
     */
    removefolder(subfolder) {
        const ALL_SUBFOLDERS = this._content.children;
        const ALL_LIST_SUBFOLDERS = this._list.children;
        const ID = subfolder.id
        for (let i = 0; i < ALL_SUBFOLDERS.length; i++) {
            if (ALL_SUBFOLDERS[i].id === ID) {
                this._content.removeChild(ALL_SUBFOLDERS[i]);
                this._list.removeChild(ALL_LIST_SUBFOLDERS[i]);
            }
        }
        this.removeDialog();
    }
}