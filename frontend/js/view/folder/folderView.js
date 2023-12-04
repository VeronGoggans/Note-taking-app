import { FolderService } from "../../service/folderService.js";
import { Folder } from './folder.js';
import { ListFolder } from './listFolder.js';
import { CNode } from '../../util/CNode.js';

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
            const FOLDER = ListFolder.render(ID, NAME);
            this._list.appendChild(FOLDER);
        }
    }

    async renderFolders() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._content
            const ID = FOLDERS[i].id;
            const NAME = FOLDERS[i].name;
            const FOLDER = Folder.render(ID, NAME);
            this._content.appendChild(FOLDER);
        }
    }
    
    renderNewFolderDialog() {

    }
}