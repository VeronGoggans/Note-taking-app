import { CNode } from "../util/CNode.js";

export class DialogView {
    constructor() {
        this._dialog = document.querySelector('.dialog');
        this._createFolderBtn = document.querySelector('.create-folder-btn');
        this._dialog.addEventListener('click', () => this.removeDialog());
        this._createFolderBtn.addEventListener('click', () => this.renderDialog());
        this._deleteFolderMsg = 'Press Confirm to delete';
    }


    renderDialog() {
        this._dialog.style.visibility = 'visible';
        this._dialog.style.top = '0%';
    }

    removeDialog() {
        this._dialog.style.visibility = 'hidden';
        this._dialog.style.top = '100%';
    }

    renderDeleteFolderDialog(name, instance) {
        const HOST = CNode.create('div', {'class': 'delete-folder-container'});
        const MESSAGE = CNode.create('p', {'class': 'delete-warning', 'textContent': this._deleteFolderMsg});
        const FOLDER_NAME = CNode.create('p', {'class': 'delete-folder-name', 'textContent': name});
        const DELETE = CNode.create('button', {'class': 'confirm-delete-folder-btn', 'textContent': 'Confirm'});

        // Assemble elements.
        HOST.appendChild(MESSAGE);
        HOST.appendChild(FOLDER_NAME);
        HOST.appendChild(DELETE);

        // Functionality.
        DELETE.addEventListener('click', instance.removeFolder)

        this._dialog.appendChild(HOST);
        this.renderDialog();
    }
 }