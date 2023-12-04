import { CNode } from "../../util/CNode.js";
import { FolderView } from "../folder/folderView.js";

export class DialogView {
    constructor(instanceFolderView) {
        this._folderView = instanceFolderView;
        this._dialog = document.querySelector('.dialog');
        this._createFolderBtn = document.querySelector('.create-folder-btn');
        this._dialog.addEventListener('click', () => this.removeDialog());
        this._createFolderBtn.addEventListener('click', () => this.renderDialog());
    }


    renderDialog() {
        this._dialog.style.visibility = 'visible';
        this._dialog.style.top = '0%';
    }

    removeDialog() {
        this._dialog.style.visibility = 'hidden';
        this._dialog.style.top = '100%';
    }

    renderDeleteFolderDialog(name) {
        const HOST = CNode.create('div', {'class': 'delete-folder-container'});
        const MESSAGE = CNode.create('p', {'class': 'delete-warning'});
        const FOLDER_NAME = CNode.create('p', {'class': 'delete-folder-name', 'trextContent': name});
        const DELETE = CNode.create('button', {'class': 'confirm-delete-folder-btn', 'textContent': 'Confirm'});

        // Assemble elements.
        HOST.appendChild(MESSAGE);
        HOST.appendChild(FOLDER_NAME);
        HOST.appendChild(DELETE);

        // Functionality.
        DELETE.addEventListener('click', this._folderView.removefolder())

        return HOST;

    }
 }