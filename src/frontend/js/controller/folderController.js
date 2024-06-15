import { FolderView } from '../view/folderView.js';
import { FolderModel } from '../model/folderModel.js';

export class FolderController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.folderView = new FolderView(this, applicationController, dialog, notificationHandler);
        this.folderModel = new FolderModel();
    }

    async getFolders(parentId = undefined) {
        const RESPONSE = await this.folderModel.get(parentId);
        const FOLDERS = RESPONSE.Folders;
        this.folderView.renderFolders(FOLDERS);
    }

    async addFolder(name, parentId = undefined) {
        const RESPONSE = await this.folderModel.add(name, parentId);
        const FOLDER = RESPONSE.Folder;
        this.folderView.renderFolder(FOLDER);
    }

    async updateFolder(folderId, newName, color) {
        const RESPONSE = await this.folderModel.update(folderId, newName, color);
        const FOLDER = RESPONSE.Folder;
        this.folderView.renderFolderUpdate(FOLDER);
    }

    async deleteFolder(folderId) {
        const PARENT_ID = this.applicationController.getCurrentFolderID();
        const RESPONSE = await this.folderModel.delete(folderId, PARENT_ID);
        const FOLDER = RESPONSE.Folder;
        this.folderView.removeFolder(FOLDER);
    }
}