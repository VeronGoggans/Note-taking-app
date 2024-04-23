import { Folder } from '../components/folder.js';
import { ListFolder, NoFolderMessage } from '../components/listFolder.js';
import { FolderObjectArray } from '../util/array.js';
import { NoContentFeedbackHandler } from "../handlers/userFeedback/noContentFeedbackHandler.js";
import { NoteDeleteModal } from '../components/modals/noteDeleteModal.js';
import { AnimationHandler } from '../handlers/animation/animationHandler.js';

export class FolderView {
    constructor(folderController, dialog, notificationHandler) {
        this.folderController = folderController;
        this.dialog = dialog;
        this.notificationHandler = notificationHandler;
        this.noContentFeedbackHandler = new NoContentFeedbackHandler();
        this.folderObjects = new FolderObjectArray();

        this._initializeDomElements();
    }

    /** 
     * This method renders a array of folders and adds them to the UI.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} folders is an array of folders.
     */
    renderFolders(folders) {
        this.folderObjects.clear();
        if (folders.length > 0) {
            for (let i = 0; i < folders.length; i++) {
                const FOLDER = folders[i];
                const LIST_FOLDER_CARD = this._listFolder(FOLDER);
                const FOLDER_CARD = this._folder(FOLDER);
    
                this._content.appendChild(FOLDER_CARD);
                this._list.appendChild(LIST_FOLDER_CARD);
                AnimationHandler.fadeInFromBottom(FOLDER_CARD);
                AnimationHandler.fadeInFromSide(LIST_FOLDER_CARD);
            }
        } else {
            // give user feedback that this folder is empty
            this.noContentFeedbackHandler.noFolders(new NoFolderMessage());
        }
    }

    /**
     * This method adds a single folder to the UI.
     * 
     * @param {Object} folder
     */
    renderFolder(folder) {
        // Checking if the list-view html element currently says "no folders"
        if (this.folderObjects.size() === 0) {
            this.noContentFeedbackHandler.removeNoFoldersMessage();
        }
        const LIST_FOLDER_CARD = this._listFolder(folder);
        const FOLDER_CARD = this._folder(folder);

        this._content.insertBefore(FOLDER_CARD, this._content.firstChild);
        this._list.insertBefore(LIST_FOLDER_CARD, this._list.firstChild);
        AnimationHandler.fadeInFromBottom(FOLDER_CARD);
        AnimationHandler.fadeInFromSide(LIST_FOLDER_CARD);
        this.dialog.hide();
    }

    /**
     * This method updates the folder card inside the list div.
     * 
     * This method is called when a 
     * folder's name has been changed
     * 
     * @param {Object} folder
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
     * Removes a specific folder from the UI.
     * The folder is removed from both the content view and the list view,
     * After the animation for removing a folder is done
     *
     * @param {Object} folder 
     */
    removeFolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ALL_LIST_FOLDERS = this._list.children;
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === folder.id) {
                AnimationHandler.fadeOutCard(ALL_FOLDERS[i]);
                AnimationHandler.fadeOutCard(ALL_LIST_FOLDERS[i]);
                setTimeout(() => {
                    this._content.removeChild(ALL_FOLDERS[i]);
                    this._list.removeChild(ALL_LIST_FOLDERS[i]);
                }, 700);
                this.folderObjects.remove(folder);
                // Checking if there are no subfolder cards inside the list-view html element
                if (this.folderObjects.size() === 0) {
                    this.noContentFeedbackHandler.noFolders(new NoFolderMessage());
                }
            }
        }
        this.dialog.hide();
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the folder.
     * 
     * @param {String} id 
     * @param {String} name
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new NoteDeleteModal(id, name, this));
        this.dialog.show();
    }

    /**
     * This method creates a ListFolder component and returns it.
     * 
     * @param {Object} folder
     * @returns {ListFolder} 
     */
    _listFolder(folder) {
        this.folderObjects.add(folder, this, this.dragAndDrop)
        return new ListFolder(folder, this);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {Object} folder
     * @returns {Folder}
     */
    _folder(folder) {
        return new Folder(folder, this);
    }

    _initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-folders');
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

    async handleNoteDrop(noteId, folderId) {
        await this.folderController.moveNote(noteId, folderId)
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