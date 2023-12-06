import { FolderService } from "../../service/folderService.js";
import { Folder } from './folder.js';
import { ListFolder } from './listFolder.js';
import { DialogView } from "../dialog/dialogView.js";
import { CNode } from '../../util/CNode.js';

export class FolderView {
    constructor() {
        this.folderService = new FolderService();
        this.dialogView = new DialogView();
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
    }

    async renderListViewFolders() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._list
            const ID = FOLDERS[i].id;
            const NAME = FOLDERS[i].name;
            const FOLDER_CARD = ListFolder.render(ID, NAME);
            this._list.appendChild(FOLDER_CARD);
        }
    }

    async renderFolders() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._content
            const ID = FOLDERS[i].id;
            const NAME = FOLDERS[i].name;
            const FOLDER_CARD = this.folder(ID, NAME);
            this._content.appendChild(FOLDER_CARD);
        }
    }

    async removefolder(id) {
        await this.folderService.deleteFolder('folder', id);
        const FOLDER_CARDS_ONE = this._list.childNodes;
        const FOLDER_CARDS_TWO = this._content.childNodes;
        const FOLDER_CARD_ONE = 0
        const FOLDER_CARD_TWO =  0
    }

    folder(id, name) {
        const HOST = CNode.create('div', {'class': 'folder', 'id': id});
        const NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        const H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': name});
        const LOGO = CNode.create('div', {'class': 'folder-logo'});
        const ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        const UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        const EDIT = CNode.create('button', {'id': 'edit-folder-btn'});
        const EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        const DELETE = CNode.create('button', {'id': 'delete-folder-btn'});
        const DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

        // Assemble elements.
        HOST.appendChild(NAME_BOX);
        NAME_BOX.appendChild(H4);
        HOST.appendChild(LOGO);
        LOGO.appendChild(ICON);
        HOST.appendChild(UTIL_BAR);
        UTIL_BAR.appendChild(EDIT);
        EDIT.appendChild(EDIT_ICON);
        UTIL_BAR.appendChild(DELETE);
        DELETE.appendChild(DELETE_ICON);


        // Functionality
        DELETE.addEventListener('click', () => this.dialogView.renderDeleteFolderDialog(name, this.removefolder));

        return HOST
    }
    
    renderNewFolderDialog() {

    }
}