import { Folder } from "../components/folder.js";
import { FolderObjectArray } from "../util/array.js";
import { formatName } from "../util/formatters.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { folderColorClasses } from '../constants/constants.js';
import { removeContent } from "../util/ui.js";
import { BaseView } from "./baseView.js";

export class FolderView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;

        this.folderObjects = new FolderObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
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
                AnimationHandler.fadeOutCard(cards[i]);
                this.folderObjects.remove(folder);
            }
        }
        this.dialog.hide();
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
        const folderColorClass = folderColorClasses[color];
        const folderClasses = Array.from(folderCard.classList);

        for (const cls of folderClasses) {
            if (cls.includes('color')) {
                folderCard.classList.remove(cls);
            }
        }

        folderCard.classList.add(folderColorClass);
    }

    addFolder(name) {
        this.controller.addFolder(name)
    }

    async handleNoteDrop(noteId, folderId) {
        await this.applicationController.moveNote(noteId, folderId)
    }

    async handleFolderDrop(droppedFolderId, parentFolderId) {

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

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this.currentFolderName = document.querySelector('.current-folder-name');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.createFolderButton = document.querySelector('.create-folder-btn')
        this.homeButton = document.querySelector('.home-folder-btn')
    }

    #attachEventListeners() {
        this.backButton.addEventListener('click', async () => {await this.controller.navigateOutofFolder()})
        this.createFolderButton.addEventListener('click', () => {this.dialog.renderNewFolderModal(this)});
        this.homeButton.addEventListener('click', async () => {await this.controller.navigateIntoFolder('f-1', 'Home')})
    }
}