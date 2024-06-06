import { Folder } from '../components/folder.js';
import { ListFolder, NoFolderMessage } from '../components/listFolder.js';
import { FolderObjectArray, HTMLArray } from '../util/array.js';
import { NoContentFeedbackHandler } from "../handlers/userFeedback/noContentFeedbackHandler.js";
import { NoteDeleteModal } from '../components/modals/noteDeleteModal.js';
import { AnimationHandler } from '../handlers/animation/animationHandler.js';
import { DragAndDrop } from '../handlers/drag&drop/dragAndDropHandler.js';
import { formatName } from "../util/formatters.js";
import { folderColorClasses } from '../constants/constants.js';

export class FolderView {
    constructor(folderController, applicationController, dialog, notificationHandler) {
        this.folderController = folderController;
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.notificationHandler = notificationHandler;
        this.noContentFeedbackHandler = new NoContentFeedbackHandler();
        this.folderObjects = new FolderObjectArray();
        this.dragAndDrop = new DragAndDrop(this);

        this.#initializeDomElements();
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
                const LIST_FOLDER_CARD = this.#listFolder(FOLDER);
                const FOLDER_CARD = this.#folder(FOLDER);
    
                this._content.appendChild(FOLDER_CARD);
                this._list.appendChild(LIST_FOLDER_CARD);
                AnimationHandler.fadeInFromBottom(FOLDER_CARD);
                AnimationHandler.fadeInFromBottom(LIST_FOLDER_CARD);
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
        const LIST_FOLDER_CARD = this.#listFolder(folder);
        const FOLDER_CARD = this.#folder(folder);

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
        const folderCards = new HTMLArray(this._content.children, 'folder'); 
        console.log(folderCards);
        const folderListCards = this._list.children;

        for (let i = 0; i < folderCards.length; i++) {
            if (folderCards[i].id === folder.id) {
                const h4 = folderCards[i].querySelector('h4');
                h4.textContent = formatName(folder.name);

                const span = folderListCards[i].querySelector('span');
                span.textContent = formatName(folder.name);

                this.#applyFolderColor(folderCards[i], folder.color);
                this.folderObjects.update(folder);
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
                if (this.folderObjects.size() === 0) {
                    this.noContentFeedbackHandler.noFolders(new NoFolderMessage());
                }
            }
        }
        this.dialog.hide();
    }

    /**
    * type has to be one of the following 
    * (saved, deleted, new, empty).
    * 
    * noteName is optional and only nessecary for the 
    * deleted type.
    * 
    * @param {String} type 
    * @param {String} noteName 
    */
    pushNotification(type, noteName = null) {
        this.notificationHandler.push(type, noteName);
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

    renderEditFolderModal(id) {
        const folder = this.getFolderObject(id);
        this.dialog.renderEditFolderModal(folder, this);
    }

    /**
     * This method creates a ListFolder component and returns it.
     * 
     * @param {Object} folder
     * @returns {ListFolder} 
     */
    #listFolder(folder) {
        return new ListFolder(folder, this, this.dragAndDrop);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {Object} folder
     * @returns {Folder}
     */
    #folder(folder) {
        this.folderObjects.add(folder)
        return new Folder(folder, this);
    }

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-folders');
    }

    #applyFolderColor(folderCard, color) {
        console.log(folderCard);
        const folderColorClass = folderColorClasses[color];
        const folderClasses = Array.from(folderCard.classList);

        for (const cls of folderClasses) {
            if (cls.includes('color')) {
                folderCard.classList.remove(cls);
            }
        }

        folderCard.classList.add(folderColorClass);
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
        await this.applicationController.moveNote(noteId, folderId)
    }

    async handleFolderDrop(droppedFolderId, parentFolderId) {

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
        this.applicationController.navigateIntoFolder(id, name);
    }

    getFolderObject(folderId) {
        return this.folderObjects.get(folderId);
    }
}