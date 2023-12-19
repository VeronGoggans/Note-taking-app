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
        this.subfolderView.renderListViewSubfolders(SUBFOLDERS);
        this.subfolderView.renderSubfolders(SUBFOLDERS);
    }


    // async addFolder(name) {
    //     const RESPONSE = await this.folderModel.addFolder('/folder', name);
    //     const FOLDER = RESPONSE.Object;
    //     this.folderView.renderFolder(FOLDER);
    // }


    async updateSubfolder(subfolderId, newName) {
        const RESPONSE = await this.subfolderModel.updateSubfolder('/subfolder', subfolderId, newName);
        const FOLDER = RESPONSE.Object;
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