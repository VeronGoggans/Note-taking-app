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
        this.BLUE = CNode.create('div', {'style': 'background-color: #c1e2ff;'});
        this.ORANGE = CNode.create('div', {'style': 'background-color: #ffe7b3;'});
        this.GREEN = CNode.create('div', {'style': 'background-color: #c7ffc1;'});
        this.PURPLE = CNode.create('div', {'style': 'background-color: #dfc1ff;'});
        this.RED = CNode.create('div', {'style': 'background-color: #ffc1c1;'});
        this.WHITE = CNode.create('div', {'style': 'background-color: #ffffff;'});
        this.UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        this.COLOR = CNode.create('button', {'class': 'color-folder-btn'});
        this.COLOR_ICON = CNode.create('i', {'class': 'fa-solid fa-palette'});
        this.EDIT = CNode.create('button', {'id': 'edit-folder-btn'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE = CNode.create('button', {'id': 'delete-folder-btn'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

        this.applyColor(this.color);
        this.attachEventListeners();
        return this.render();
    }

    render() {
        this.HOST.appendChild(this.NAME_BOX);
        this.NAME_BOX.appendChild(this.H4);
        this.CONFIRM.appendChild(this.CONFIRM_ICON);
        this.BTN_CONTAINER.appendChild(this.CONFIRM);
        this.CANCEL.appendChild(this.CANCEL_ICON);
        this.BTN_CONTAINER.appendChild(this.CANCEL);
        this.NAME_BOX.appendChild(this.BTN_CONTAINER);
        this.HOST.appendChild(this.LOGO);
        this.LOGO.appendChild(this.ICON);
        this.LOGO.appendChild(this.COLOR_CONTAINER);
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

    applyColor(color) {
        const CARD_CLASSES = {
            '#ffffff': null,
            '#c1e2ff': 'card-style-blue',
            '#ffe7b3': 'card-style-orange',
            '#c7ffc1': 'card-style-green',
            '#dfc1ff': 'card-style-purple',
            '#ffc1c1': 'card-style-red'
        }

        const CARD_CLASS = CARD_CLASSES[color];

        if (CARD_CLASS !== null){
            this.HOST.classList.add(CARD_CLASS);
        }
    }

    attachEventListeners() {
        this.EDIT.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.CONFIRM.addEventListener('click', () => {this.updateFolder()});
        this.CANCEL.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.DELETE.addEventListener('click', () => {this.view.renderDeleteContainer(this.id, this.name)});
        this.COLOR.addEventListener('click', () => {this.togglePalette()});
        this.LOGO.addEventListener('click', () => { this.view.handleFolderCardClick(this.id)});
    }

    togglePalette() {
        this.COLOR_CONTAINER.style.visibility = this.COLOR_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
        this.COLOR_CONTAINER.style.opacity = this.COLOR_CONTAINER.style.opacity === '100' ? '0' : '100';
    }

    toggleEditableFolderName() {
        // Toggle contentEditable
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(92, 125, 255)' ? 'transparent' : '#5c7dff';

        // Toggle visibility
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    async updateFolder() {
        this.view.updateFolder(this.id, this.H4.textContent, this.color);
        this.toggleEditableFolderName();
    }
}