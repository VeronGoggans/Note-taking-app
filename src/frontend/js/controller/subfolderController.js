import { SubfolderModel } from "../model/subfolderModel.js";
import { SubfolderView } from "../view/subfolderView.js";

export class SubfolderController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.subfolderModel = new SubfolderModel();
        this.subfolderView = new SubfolderView(this, dialog, notificationHandler);
    }

    async getSubFolders(folderId) {
        const RESPONSE = await this.subfolderModel.getsubfolders('/subfolders', folderId);
        const SUBFOLDERS = RESPONSE.Subfolders;
        this.subfolderView.renderSubfolders(SUBFOLDERS);
    }


    async addSubfolder(name, folderId) {
        const RESPONSE = await this.subfolderModel.addSubfolder('/subfolder', name, folderId);
        const SUBFOLDER = RESPONSE.Subfolder;
        this.subfolderView.renderSubfolder(SUBFOLDER);
    }


    async updateSubfolder(subfolderId, newName, color) {
        const RESPONSE = await this.subfolderModel.updateSubfolder('/subfolder', subfolderId, newName, color);
        const FOLDER = RESPONSE.Subfolder;
        this.subfolderView.renderSubfolderUpdate(FOLDER);
    }


    async deleteSubfolder(subfolderId) {
        const PARENT_ID = this.applicationController.getCurrentFolderID();
        const RESPONSE = await this.subfolderModel.deleteSubfolder('/subfolder', PARENT_ID, subfolderId);
        const FOLDER = RESPONSE.Subfolder;
        this.subfolderView.removeSubfolder(FOLDER);
    }

    async navigateToHomescreen() {
        this.applicationController.navigateToHomescreen();
    }

    async navigateIntoFolder(folderId, name) {
        this.applicationController.navigateIntoFolder(folderId, name);
    }

    async moveNote(noteId, folderId) {
        await this.applicationController.moveNote(noteId, folderId);
    }
}