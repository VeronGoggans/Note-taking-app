import { FolderService } from "../../service/folderService.js";
import { Folder } from './folder.js';
import { ListFolder } from './listFolder.js';
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
            const FOLDER_CARD = Folder.render(ID, NAME);
            this._content.appendChild(FOLDER_CARD);
        }
    }

    async removefolder(id) {
        await this.folderService.deleteFolder('folder', id);
        const FOLDER_CARDS_ONE = this._list.childNodes;
        const FOLDER_CARDS_TWO = this._content.childNodes;
        const FOLDER_CARD_ONE = FOLDER_CARDS_ONE.querySelector
        const FOLDER_CARD_TWO =  
    }
    
    renderNewFolderDialog() {

    }
}