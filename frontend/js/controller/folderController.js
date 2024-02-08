import { FolderView } from '../view/folderView.js';
import { FolderModel } from '../model/folderModel.js';

export class FolderController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.folderView = new FolderView(this, dialog);
        this.folderModel = new FolderModel();
    }

    async getFolders() {
        const RESPONSE = await this.folderModel.getFolders('/folders');
        const FOLDERS = RESPONSE.folders;
        this.folderView.renderFolders(FOLDERS);
    }


    async addFolder(name) {
        const RESPONSE = await this.folderModel.addFolder('/folder', name);
        const FOLDER = RESPONSE.Object;
        this.folderView.renderFolder(FOLDER);
    }


    async updateFolder(folderId, newName, color) {
        const RESPONSE = await this.folderModel.updateFolder('/folder', folderId, newName, color);
        const FOLDER = RESPONSE.Folder;
        this.folderView.renderFolderUpdate(FOLDER);
    }


    async deleteFolder(folderId) {
        const RESPONSE = await this.folderModel.deleteFolder('/folder', folderId);
        const FOLDER = RESPONSE.Object;
        this.folderView.removeFolder(FOLDER);
    }
    

    async navigateIntoFolder(folderId, name) {
        this.applicationController.navigateIntoFolder(folderId, name);
    }
}