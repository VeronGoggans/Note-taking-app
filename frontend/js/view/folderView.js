import { FolderService } from "../service/folderService.js";
import { CNode } from '../util/CNode.js';

export class FolderView {
    constructor(folderService = new FolderService()) {
        this.folderService = folderService;
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
            const FOLDER = this.listFolder(ID, NAME)
            this.list.appendChild(FOLDER);
        }
    }

    async renderFolders() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._content
        }
    }

    listFolder(id, name) {
        const HOST = CNode.create('div', {'class': 'list-view-folder', 'id': id});
        const SPAN = CNode.create('span', {'class': 'folder-name', 'textContent': name});
        
        // Assemble elements.
        HOST.appendChild(SPAN);
        return HOST;
    }

    
    renderNewFolderDialog() {

    }
}