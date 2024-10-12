import { Folder } from "../components/folder.js";
import { FolderObjectArray } from "../util/array.js";
import { formatName } from "../util/formatters.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { folderColors } from '../constants/constants.js';
import { removeContent, addEmptyMessage, removeEmptyMessage } from "../util/ui.js";
import { BaseView } from "./baseView.js";

export class FolderView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;

        this.folderObjects = new FolderObjectArray();
        this.#initElements();
        this.#eventListeners();
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
        removeEmptyMessage(this._content);
        const folderCard = this.#folder(folder);
        this._content.insertBefore(folderCard, this._content.firstChild);
        AnimationHandler.fadeInFromBottom(folderCard);
        this.closeDialog();
    }

    renderUpdate(folder) {
        const folderCards = this._content.children; 
    
        for (let i = 0; i < folderCards.length; i++) {
            if (folderCards[i].id == folder.id) {
                folderCards[i].querySelector('h4').textContent = formatName(folder.name);

                this.#applyFolderColor(folderCards[i], folder.color);
                this.folderObjects.update(folder);
            }
        }
    }
    
    renderDelete(folder) {      
        const folders = this._content.children;
        
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].id == folder.id) {
                AnimationHandler.fadeOutCard(folders[i]);
                this.folderObjects.remove(folder);
            }
        }
        addEmptyMessage(this._content);
        this.closeDialog();
    }

    renderEditFolderModal(id) {
        const folder = this.getFolderObject(id);
        this.dialog.renderEditFolderModal(folder, this);
    }


    #folder(folder) {
        this.folderObjects.add(folder)
        return new Folder(folder, this);
    }


    #applyFolderColor(folderCard, color) {
        const newColor = folderColors[color];
        const folderClasses = Array.from(folderCard.classList);
        
        for (const cls of folderClasses) {
            if (cls.includes('color')) {
                folderCard.classList.remove(cls);
            }
        }        
        folderCard.classList.add(newColor);
    }

    async handleNoteDrop(folderId, droppedNoteId) {
        await this.applicationController.moveNote(folderId, droppedNoteId)
    }

    async handleFolderDrop(newParentFolderId, droppedFolderId) {
        await this.applicationController.moveFolder(newParentFolderId, droppedFolderId);
    }

    handleFolderCardClick(id, name) {
        this.controller.navigateIntoFolder(id, name);
    }

    getFolderObject(folderId) {
        return this.folderObjects.get(folderId);
    }

    displayFolderName(name) {
        removeContent(this._content);
        this.currentFolderName.textContent = name;
    }

    #initElements() {
        this._content = document.querySelector('.content-view');
        this.currentFolderName = document.querySelector('.current-folder-name');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.createFolderButton = document.querySelector('.create-folder-btn')
        this.homeButton = document.querySelector('.home-folder-btn')
    }

    #eventListeners() {
        this.backButton.addEventListener('click', async () => {await this.controller.navigateOutofFolder()})
        this.createFolderButton.addEventListener('click', () => {this.dialog.renderNewFolderModal(this)});
        this.homeButton.addEventListener('click', async () => {await this.controller.navigateIntoFolder(1, 'Home')})
    }
}