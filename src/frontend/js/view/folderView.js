import { Folder } from '../components/folder.js';
import { FolderObjectArray } from '../util/array.js';
import { DeleteModal } from '../components/modals/deleteModal.js';
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
        this.folderObjects = new FolderObjectArray();
        this.dragAndDrop = new DragAndDrop(this);

        this.#initializeDomElements();
    }


    renderAll(folders) {
        this.folderObjects.clear();
        for (let i = 0; i < folders.length; i++) {
            const folderCard = this.#folder(folders[i]);
            this._content.appendChild(folderCard);
            AnimationHandler.fadeInFromBottom(folderCard);
        }
    }
    

    renderOne(folder) {
        const folderCard = this.#folder(folder);
        this._content.insertBefore(folderCard, this._content.firstChild);
        AnimationHandler.fadeInFromBottom(folderCard);
        this.dialog.hide();
    }


    renderUpdate(folder) {
        const folderCards = this._content.children; 

        for (let i = 0; i < folderCards.length; i++) {
            if (folderCards[i].id === folder.id) {
                const h4 = folderCards[i].querySelector('h4');
                h4.textContent = formatName(folder.name);

                this.#applyFolderColor(folderCards[i], folder.color);
                this.folderObjects.update(folder);
            }
        }
    }

    
    renderDelete(folder) {
        const cards = this._content.children;
        
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === folder.id) {
                AnimationHandler.fadeOutCard(cards[i], this._content);
                this.folderObjects.remove(folder);
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


    renderDeleteContainer(id, name) {
        this.dialog.addChild(new DeleteModal(id, name, this));
        this.dialog.show();
    }

    renderEditFolderModal(id) {
        const folder = this.getFolderObject(id);
        this.dialog.renderEditFolderModal(folder, this);
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
    }

    #applyFolderColor(folderCard, color) {
        const folderColorClass = folderColorClasses[color];
        const folderClasses = Array.from(folderCard.classList);

        for (const cls of folderClasses) {
            if (cls.includes('color')) {
                folderCard.classList.remove(cls);
            }
        }

        folderCard.classList.add(folderColorClass);
    }

    
    async updateFolder(id, name, color) {
        await this.folderController.updateFolder(id, name, color);
    }


    async handleDeleteButtonClick(id) {
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