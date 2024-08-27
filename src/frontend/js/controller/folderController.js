import { FolderModel } from "../model/folderModel.js";
import { FolderView } from "../view/folderView.js";


export class FolderController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
        this.model = new FolderModel();
    }

    init(folderId = null, folderName = null) {
        this.view = new FolderView(this, this.applicationController)
        
        // If a folder on the home view has been clicked.
        if (folderId === null) {
            this.model.clearFolderIdlist();
        } 
        this.navigateIntoFolder(folderId, folderName, true)
    }

    async getFolders() {
        const parentFolderId = this.model.getCurrentFolderID();
        const response = await this.model.get(`/folders/${parentFolderId}`);
        const folders = response[this.objectNum].folders;
        this.view.renderAll(folders);
    }

    async getFolderById(folderId) {
        const response = await this.model.get(`folderById/${folderId}`);
        return response[this.objectNum].folder;
    }

    async getSearchItems() {
        const response = await this.model.get('/folderSearchItems')
        return response[this.objectNum].folders;
    }

    getAllFolderNames() {
        return this.model.getAllFolderNames()
    }

    getCurrentFolderObject() {
        return this.model.getCurrentFolderObject();
    }

    async addFolder(name) {
        const parentFolderId = this.model.getCurrentFolderID();
        const response = await this.model.add('/folder', {'folder_id': parentFolderId, 'name': name, 'color': 'rgb(255, 255, 255)'});
        const folder = response[this.objectNum].folder;
        this.view.renderOne(folder);
    }

    async update(object) {
        const response = await this.model.update('/folder', {'folder_id': object.id, 'name': object.name, 'color': object.color});
        const folder = response[this.objectNum].folder;
        this.view.renderUpdate(folder);
    }

    async delete(folderId) {
        const parentFolderId = this.model.getCurrentFolderID();
        const response = await this.model.delete(`/folder/${parentFolderId}/${folderId}`);
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
        this.model.patch(`/viewedFolderTime/${folderId}`);
        this.model.addFolderIdToList(folderId, name);

        await this.getFolders();
        if (!init) await this.applicationController.getNotes(folderId);
    }

    clearFolderHistory() {
        this.model.clearFolderIdlist();
    }
}