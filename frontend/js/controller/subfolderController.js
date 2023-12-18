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
        console.log(SUBFOLDERS);
        // this.folderView.renderFolders(FOLDERS);
        // this.folderView.renderListViewFolders(FOLDERS);
    }


    // async addFolder(name) {
    //     const RESPONSE = await this.folderModel.addFolder('/folder', name);
    //     const FOLDER = RESPONSE.Object;
    //     this.folderView.renderFolder(FOLDER);
    // }


    // async updateFolder(folderId, newName) {
    //     const RESPONSE = await this.folderModel.updateFolder('/folder', folderId, newName);
    //     const FOLDER = RESPONSE.Object;
    // }


    // async deleteFolder(folderId) {
    //     const RESPONSE = await this.folderModel.deleteFolder('/folder', folderId);
    //     const FOLDER = RESPONSE.Object;
    //     this.folderView.removefolder(FOLDER);
    // }
}