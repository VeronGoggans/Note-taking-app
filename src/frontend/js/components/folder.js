import { CNode } from "../util/CNode.js";

export class Folder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name;
        this.color = folder.color;
        this.view = view;

        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'folder', 'id': this.id});
        this.NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        this.H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': this.name, 'spellCheck': 'false'});
        this.BTN_CONTAINER = CNode.create('div', {'class': 'update-folder-btns-container'});
        this.CONFIRM = CNode.create('button', {'class': 'confirm-folder-update-btn'});
        this.CONFIRM_ICON = CNode.create('i', {'class': 'fa-solid fa-check'});
        this.CANCEL = CNode.create('button', {'class': 'cancel-folder-update-btn'});
        this.CANCEL_ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
        this.LOGO = CNode.create('div', {'class': 'folder-logo'});
        this.ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        this.COLOR_CONTAINER = CNode.create('div', {'class': 'folder-color-options-container'});
        this.BLUE = CNode.create('div', {'style': 'background-color: #a9d7ff;'});
        this.ORANGE = CNode.create('div', {'style': 'background-color: #ffe09e;'});
        this.GREEN = CNode.create('div', {'style': 'background-color: #9ffb95;'});
        this.PURPLE = CNode.create('div', {'style': 'background-color: #dfc1ff;'});
        this.RED = CNode.create('div', {'style': 'background-color: #ffa3a3;'});
        this.WHITE = CNode.create('div', {'style': 'background-color: #ffffff;'});
        this.UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        this.COLOR = CNode.create('button', {'class': 'color-folder-btn'});
        this.COLOR_ICON = CNode.create('i', {'class': 'fa-solid fa-palette'});
        this.EDIT = CNode.create('button', {'id': 'edit-folder-btn'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE = CNode.create('button', {'id': 'delete-folder-btn'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

        this.applyColor(this.color);
        this._attachEventListeners();
        return this._render();
    }

    _render() {
        this.HOST.appendChild(this.NAME_BOX);
        this.NAME_BOX.appendChild(this.H4);
        this.CONFIRM.appendChild(this.CONFIRM_ICON);
        this.BTN_CONTAINER.appendChild(this.CONFIRM);
        this.CANCEL.appendChild(this.CANCEL_ICON);
        this.BTN_CONTAINER.appendChild(this.CANCEL);
        this.NAME_BOX.appendChild(this.BTN_CONTAINER);
        this.HOST.appendChild(this.LOGO);
        this.LOGO.appendChild(this.ICON);
        this.UTIL_BAR.appendChild(this.COLOR_CONTAINER);
        this.COLOR_CONTAINER.appendChild(this.BLUE);
        this.COLOR_CONTAINER.appendChild(this.ORANGE);
        this.COLOR_CONTAINER.appendChild(this.GREEN);
        this.COLOR_CONTAINER.appendChild(this.PURPLE);
        this.COLOR_CONTAINER.appendChild(this.RED);
        this.COLOR_CONTAINER.appendChild(this.WHITE);
        this.HOST.appendChild(this.UTIL_BAR);
        this.UTIL_BAR.appendChild(this.COLOR);
        this.COLOR.appendChild(this.COLOR_ICON);
        this.UTIL_BAR.appendChild(this.EDIT);
        this.EDIT.appendChild(this.EDIT_ICON);
        this.UTIL_BAR.appendChild(this.DELETE);
        this.DELETE.appendChild(this.DELETE_ICON); 
        return this.HOST;
    }

    /**
     * This method will apply a specified color to the folder.
     * 
     * This method is called when the folder gets rendered,
     * to check if the folder already has a custom color.
     * 
     * This method is called when the user changes the folder color. 
     * 
     * @param {String} color 
     */
    applyColor(color) {
        const CARD_CLASSES = {
            '#ffffff': null,'#a9d7ff': 'card-style-blue',
            '#ffe09e': 'card-style-orange','#9ffb95': 'card-style-green',
            '#dfc1ff': 'card-style-purple','#ffa3a3': 'card-style-red'
        }
        const CARD_CLASS = CARD_CLASSES[color];
        const CURRENT_CLASSES = Array.from(this.HOST.classList);
        if (this.HOST.classList.length > 3) {
            for (let i = 0; i < CURRENT_CLASSES.length; i++) {
                if (CURRENT_CLASSES[i].includes('card-style')) {
                    this.HOST.classList.remove(CURRENT_CLASSES[i]);
                    this.HOST.classList.add(CARD_CLASS);
                }
            }        
        } else {
            this.HOST.classList.add(CARD_CLASS);
        }
    }

    _attachEventListeners() {
        this.EDIT.addEventListener('click', () => {this._toggleEditableFolderName()});
        this.CONFIRM.addEventListener('click', () => {this.updateFolder()});
        this.CANCEL.addEventListener('click', () => {this._toggleEditableFolderName()});
        this.DELETE.addEventListener('click', () => {this.view.renderDeleteContainer(this.id, this.name)});
        this.COLOR.addEventListener('click', () => {this._togglePalette()});
        this.LOGO.addEventListener('click', () => { this.view.handleFolderCardClick(this.id, this.H4.textContent)});
        this.BLUE.addEventListener('click', () => {this.updateFolder('#a9d7ff', false)});
        this.ORANGE.addEventListener('click', () => {this.updateFolder('#ffe09e', false)});
        this.GREEN.addEventListener('click', () => {this.updateFolder('#9ffb95', false)});
        this.PURPLE.addEventListener('click', () => {this.updateFolder('#dfc1ff', false)});
        this.RED.addEventListener('click', () => {this.updateFolder('#ffa3a3', false)});
        this.WHITE.addEventListener('click', () => {this.updateFolder('#ffffff', false)});
    }

    _togglePalette() {
        this.COLOR_CONTAINER.style.visibility = this.COLOR_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
        this.COLOR_CONTAINER.style.opacity = this.COLOR_CONTAINER.style.opacity === '100' ? '0' : '100';
    }

    _toggleEditableFolderName() {
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(116, 122, 160)' ? 'transparent' : '#747aa0';
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
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