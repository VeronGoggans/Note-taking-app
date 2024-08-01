import { folderColorClasses } from "../constants/constants.js";
import { CNode } from "../util/CNode.js";
import { formatName } from "../util/formatters.js";

export class Folder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name;
        this.color = folder.color;
        this.view = view;

        this.#initializeElements();
        this.applyColor(this.color);
        this.#attachEventListeners();
        return this.#render();
    }

    #initializeElements() {
        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'folder', 'id': this.id});
        this.NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        this.H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': formatName(this.name), 'spellCheck': 'false'});
        this.LOGO = CNode.create('div', {'class': 'folder-logo'});
        this.ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        this.UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        this.COLOR_ICON = CNode.create('i', {'class': 'fa-solid fa-palette'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});
    }

    #render() {
        this.NAME_BOX.append(this.H4);
        this.LOGO.appendChild(this.ICON);
        this.UTIL_BAR.append(this.EDIT_ICON, this.DELETE_ICON);
        this.HOST.append(this.NAME_BOX, this.LOGO, this.UTIL_BAR);
        return this.HOST;
    }

    /**
     * 
     * This method is called when the folder gets rendered,
     * to check if the folder already has a custom color.
     *  
     * @param {String} color 
     */
    applyColor(color) {
        const cardClass = folderColorClasses[color];
        const folderClasses = Array.from(this.HOST.classList);

        if (this.HOST.classList.length > 3) {
            for (let i = 0; i < folderClasses.length; i++) {
                if (folderClasses[i].includes('color')) {
                    this.HOST.classList.remove(folderClasses[i]);
                    this.HOST.classList.add(cardClass);
                }
            }        
        } else {
            this.HOST.classList.add(cardClass);
        }
    }

    #attachEventListeners() {
        this.EDIT_ICON.addEventListener('click', () => {this._toggleEditableFolderName()});
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteModal(this.id, this.name)});
        this.LOGO.addEventListener('click', () => { this.view.handleFolderCardClick(this.id, this.H4.textContent)});
    }

    _togglePalette() {
        this.COLOR_CONTAINER.style.visibility = this.COLOR_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
        this.COLOR_CONTAINER.style.opacity = this.COLOR_CONTAINER.style.opacity === '100' ? '0' : '100';
    }

    _toggleEditableFolderName() {
        this.view.renderEditFolderModal(this.id);
    }

    async updateFolder(color = this.color, toggle = true) {
        this.view.updateFolder(this.id, this.H4.textContent, color);
        if (toggle) {
            this._toggleEditableFolderName();
        } else {
            this.applyColor(color);
            this._togglePalette();
        }
    }
}


export class RecentFolder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name
        this.view = view;

        this.#initializeElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #initializeElements() {
        this.HOST = CNode.create('div', {'class': 'recent-folder', 'id': this.id});
        this.ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        this.PARAGRAPH = CNode.create('p', {'textContent': this.name});
    }

    #render() {
        this.HOST.append(this.ICON, this.PARAGRAPH);
        return this.HOST;
    }

    #attachEventListeners() {
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id)})
    }
}