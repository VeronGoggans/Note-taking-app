import FolderService from "../service/folderService";

class FolderView {
    constructor(folderService = FolderService()) {
        this.folderService = folderService;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
    }

    async renderListViewFolder() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._list
        }
    }

    async renderFolder() {
        const RESPONSE = await this.folderService.getFolders('folders');
        const FOLDERS = RESPONSE.folders;

        for (let i = 0; i < FOLDERS.length; i++) {
            // code appending a Lit element to this._content
        }
    }

    
    renderNewFolderDialog() {

    }
}

export default FolderView;