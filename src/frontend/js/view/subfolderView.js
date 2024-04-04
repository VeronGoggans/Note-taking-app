import { Folder } from "../components/folder.js";
import { ListFolder, NoFolderMessage } from "../components/listFolder.js";
import { DeleteContainer } from '../components/deleteContainer.js';
import { SubfolderObjectArray } from "../util/array.js";
import { NoContentFeedbackHandler } from "../handlers/userFeedback/noContentFeedbackHandler.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { DragAndDrop } from "../handlers/drag&drop/dragAndDropHandler.js";

export class SubfolderView {
    constructor(controller, dialog, notificationHandler) {
        this.subfolderController = controller;
        this.noContentFeedbackHandler = new NoContentFeedbackHandler();
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-folders');
        this.subfoldersObjects = new SubfolderObjectArray();
        this.dragAndDrop = new DragAndDrop(this);
        
        this.dialog = dialog;
        this.notificationHandler = notificationHandler;
    }
    /** 
     * This method renders a array of subfolders and adds them to the UI.
     * If the array is empty this method does nothing.
     * 
     * @param {Array} subfolders
     */
    renderSubfolders(subfolders) {
        this.subfoldersObjects.clear();
        if (subfolders.length > 0) {
            for (let i = 0; i < subfolders.length; i++) {
                const SUBFOLDER = subfolders[i];
                const SUBFOLDER_LIST_CARD = this.#listSubfolder(SUBFOLDER);
                const SUBFOLDER_CARD = this.#subfolder(SUBFOLDER);

                this._content.appendChild(SUBFOLDER_CARD);
                this._list.appendChild(SUBFOLDER_LIST_CARD);
                AnimationHandler.fadeInFromBottom(SUBFOLDER_CARD);
                AnimationHandler.fadeInFromSide(SUBFOLDER_LIST_CARD);
            }
        } else {
            // give user feedback that this folder is empty
            this.noContentFeedbackHandler.noFolders(new NoFolderMessage());
        }
    }

    /**
     * This method adds a single subfolder to the UI.
     * 
     * @param {dict} subfolder
     */
    renderSubfolder(subfolder) {
        // Checking if the list-view html element currently says "no folders"
        if (this.subfoldersObjects.size() === 0) {
            this.noContentFeedbackHandler.removeNoFoldersMessage();
        }
        // Creating the html for the subfolder
        const SUBFOLDER_CARD = this.#subfolder(subfolder);
        const SUBFOLDER_LIST_CARD = this.#listSubfolder(subfolder);

        // Adding the note html cards to the screen
        this._content.insertBefore(SUBFOLDER_CARD, this._content.firstChild);
        this._list.insertBefore(SUBFOLDER_LIST_CARD, this._list.firstChild);
        AnimationHandler.fadeInFromBottom(SUBFOLDER_CARD);
        AnimationHandler.fadeInFromSide(SUBFOLDER_LIST_CARD);
        this.dialog.hide();
    }

    /**
     * This method updates a specific subfolder card
     * 
     * @param {dict} subfolder
     */
    renderSubfolderUpdate(subfolder) {
        const SUBFOLDER_LIST_CARDS = this._list.children;
        for (let i = 0; i < SUBFOLDER_LIST_CARDS.length; i++) {
            if (SUBFOLDER_LIST_CARDS[i].id === subfolder.id) {
                const SPAN = SUBFOLDER_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = subfolder.name;
            }
        }
    }

    /**
     * Removes a specific subfolder from the UI.
     * The subfolder is removed from both the content view and the list view,
     * After the animation for removing a subfolder is done
     * 
     * @param {Object} subfolder 
     */
    removeSubfolder(subfolder) {
        const ALL_SUBFOLDERS = this._content.children;
        const ALL_LIST_SUBFOLDERS = this._list.children;

        for (let i = 0; i < ALL_SUBFOLDERS.length; i++) {
            if (ALL_SUBFOLDERS[i].id === subfolder.id) {
                AnimationHandler.fadeOutCard(ALL_SUBFOLDERS[i]);
                AnimationHandler.fadeOutCard(ALL_LIST_SUBFOLDERS[i]);
                setTimeout(() => {
                    this._content.removeChild(ALL_SUBFOLDERS[i]);
                    this._list.removeChild(ALL_LIST_SUBFOLDERS[i]);
                }, 700);
                this.subfoldersObjects.remove(subfolder);
                // Checking if there are no subfolder cards inside the list-view html element
                if (this.subfoldersObjects.size() === 0) {
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
     * This method creates a ListFolder component and returns it.
     * 
     * @param {Dict} subfolder
     * @returns {ListFolder}
     */
    #listSubfolder(subfolder) {
        return new ListFolder(subfolder, this, this.dragAndDrop);
    }

    /**
     * This method creates a Folder component and returns it.
     * 
     * @param {Dict} subfolder
     * @returns {Folder}
     */
    #subfolder(subfolder) {
        this.subfoldersObjects.add(subfolder);
        return new Folder(subfolder, this);
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the subfolder.
     * 
     * @param {String} id 
     * @param {String} name 
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new DeleteContainer(id, name, this));
        this.dialog.show();
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
    async updateFolder(id, name, color) {
        this.subfolderController.updateSubfolder(id, name, color);
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

    async handleNoteDrop(noteId, folderId) {
        await this.subfolderController.moveNote(noteId, folderId)
    }


    /**
     * Takes the user into a folder and displays the notes inside it.
     * 
     * This method is triggered when a folder card is clicked. It removes all existing folders from the screen
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id, name) {
        this.subfolderController.navigateIntoFolder(id, name);
    }
}