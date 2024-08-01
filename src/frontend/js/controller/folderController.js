import { FolderModel } from "../model/folderModel.js";
import { FolderView } from "../view/folderView.js";


export class FolderController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
        this.model = new FolderModel();
    }

    init(folderId = null, folderName = null) {
        this.view = new FolderView(this, this.applicationController, this.dialog, this.notificationHandler)
        
        // If a folder on the home view has been clicked.
        if (folderId === null) {
            this.model.clearFolderIdlist();
        } 
        this.navigateIntoFolder(folderId, folderName, true)
    }

    async getFolders() {
        const response = await this.model.get();
        const folders = response[this.objectNum].folders;
        this.view.renderAll(folders);
    }

    async getFolderById(folderId) {
        const response = await this.model.getById(`folderById/${folderId}`);
        const folder = response[this.objectNum].folder;
        return folder // <-- application controller
    }

    async getSearchItems() {
        const response = await this.model.getSearchItems()
        return response[this.objectNum].folders;
    }

    getAllFolderNames() {
        return this.model.getAllFolderNames()
    }

    getCurrentFolderObject() {
        return this.model.getCurrentFolderObject();
    }

    async addFolder(name) {
        const response = await this.model.add(name);
        const folder = response[this.objectNum].folder;
        this.view.renderOne(folder);
    }

    async updateFolder(folderId, newName, color) {
        const response = await this.model.update(folderId, newName, color);
        const folder = response[this.objectNum].folder;
        this.view.renderUpdate(folder);
    }

    async deleteFolder(folderId) {
        const response = await this.model.delete(folderId);
        const folder = response[this.objectNum].folder;
        this.view.renderDelete(folder);
    }
    
    async navigateOutofFolder() {
        const parentFolder = this.model.removeFolderIdFromList();
        await this.navigateIntoFolder(parentFolder.id, parentFolder.name);
    }

    /**
     * @param {*} init - Indicating if this method is called by the init method 
     * or by the folder view.  
     */
    async navigateIntoFolder(folderId, name, init = false) {
        // If the home button inside the notes view is clicked 
        if (folderId === this.homeFolderId) this.model.clearFolderIdlist();

        this.view.displayFolderName(name);
        this.model.updateVisitTime(folderId)
        this.model.addFolderIdToList(folderId, name);

        await this.getFolders();
        if (!init) await this.applicationController.getNotes(folderId);
    }

    clearFolderHistory() {
        this.model.clearFolderIdlist();
    }
}