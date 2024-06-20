import { FolderView } from '../view/folderView.js';
import { FolderModel } from '../model/folderModel.js';

export class FolderController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.view = new FolderView(this, applicationController, dialog, notificationHandler);
        this.model = new FolderModel();
    }

    async getFolders(parentId = undefined) {
        const response = await this.model.get(parentId);
        const folders = response.Folders;
        this.view.renderAll(folders);
    }

    async addFolder(name, parentId = undefined) {
        const response = await this.model.add(name, parentId);
        const folder = response.Folder;
        this.view.renderOne(folder);
    }

    async updateFolder(folderId, newName, color) {
        const response = await this.model.update(folderId, newName, color);
        const folder = response.Folder;
        this.view.renderUpdate(folder);
    }

    async deleteFolder(folderId) {
        const parentId = this.applicationController.getCurrentFolderID();
        const response = await this.model.delete(folderId, parentId);
        const folder = response.Folder;
        this.view.renderDelete(folder);
    }
}