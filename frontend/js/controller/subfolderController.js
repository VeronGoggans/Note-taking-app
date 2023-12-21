import { SubfolderModel } from "../model/subfolderModel.js";
import { SubfolderView } from "../view/subfolderView.js";

export class SubfolderController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.subfolderModel = new SubfolderModel();
        this.subfolderView = new SubfolderView(this);
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


    async updateSubfolder(subfolderId, newName) {
        const RESPONSE = await this.subfolderModel.updateSubfolder('/subfolder', subfolderId, newName);
        const FOLDER = RESPONSE.Subfolder;
        this.subfolderView.renderSubfolderUpdate(FOLDER);
    }


    async deleteSubfolder(subfolderId) {
        const PARENT_ID = this.applicationController.getCurrentFolderID();
        const RESPONSE = await this.subfolderModel.deleteSubfolder('/subfolder', PARENT_ID, subfolderId);
        const FOLDER = RESPONSE.Subfolder;
        this.subfolderView.removefolder(FOLDER);
    }

    async navigateToHomescreen() {
        this.applicationController.navigateToHomescreen();
    }

    async navigateIntoFolder(folderId) {
        this.applicationController.navigateIntoFolder(folderId);
    }
}