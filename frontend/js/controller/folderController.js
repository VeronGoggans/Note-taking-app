import { FolderView } from '../view/folder/folderView.js';
import { FolderModel } from '../model/folderModel.js';
import { NoteController } from './noteController.js';
import { ComminucationController } from './communicationController.js';

export class FolderController {
    constructor(CommController) {
        this.comminucationController = CommController;
        this.folderView = new FolderView(this);
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


    async updateFolder(folderId, newName) {
        const RESPONSE = await this.folderModel.updateFolder('/folder', folderId, newName);
        const FOLDER = RESPONSE.Object;
        this.folderView.updateFolder(FOLDER);
    }


    async deleteFolder(folderId) {
        const RESPONSE = await this.folderModel.deleteFolder('/folder', folderId);
        const FOLDER = RESPONSE.Object;
        this.folderView.removefolder(FOLDER);
    }

    async noteControllerComs(folderId) {
        this.CommController.folderToNoteCom(folderId);
    }
}