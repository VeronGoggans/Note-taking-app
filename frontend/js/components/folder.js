import { CNode } from "../util/CNode.js";

export class Folder {
    constructor(id, name, view) {
        this.id = id;
        this.name = name;
        this.view = view;

        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'folder', 'id': id});
        this.NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        this.H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': name, 'spellCheck': 'false'});
        this.BTN_CONTAINER = CNode.create('div', {'class': 'update-folder-btns-container'});
        this.CONFIRM = CNode.create('button', {'class': 'confirm-folder-update-btn'});
        this.CONFIRM_ICON = CNode.create('i', {'class': 'fa-solid fa-check'});
        this.CANCEL = CNode.create('button', {'class': 'cancel-folder-update-btn'});
        this.CANCEL_ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
        this.LOGO = CNode.create('div', {'class': 'folder-logo'});
        this.ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        this.UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        this.EDIT = CNode.create('button', {'id': 'edit-folder-btn'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE = CNode.create('button', {'id': 'delete-folder-btn'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

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
        this.HOST.appendChild(this.UTIL_BAR);
        this.UTIL_BAR.appendChild(this.EDIT);
        this.EDIT.appendChild(this.EDIT_ICON);
        this.UTIL_BAR.appendChild(this.DELETE);
        this.DELETE.appendChild(this.DELETE_ICON); 
        return this.HOST;
    }


    attachEventListeners() {
        this.EDIT.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.CONFIRM.addEventListener('click', () => {this.updateFolder()});
        this.CANCEL.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.DELETE.addEventListener('click', () => {this.view.renderDeleteFolderContainer(this.id, this.name)});
        this.LOGO.addEventListener('click', () => { this.view.handleFolderCardClick(this.id)});
    }

    toggleEditableFolderName() {
        // Toggle contentEditable
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';

        // Toggle visibility
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    async updateFolder() {
        this.view.updateFolder(this.id, this.H4.textContent);
        this.toggleEditableFolderName();
    }
}