import { FolderModel } from "../model/folderModel.js";
import { FolderView } from "../view/folderView.js";


export class FolderController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
        this.model = new FolderModel();
    }

    /**
     * 
     * @param {String} folderId 
     * @param {String} folderName 
     * @param {Array} location - Hierarcical array of folder objects. 
     */
    init(folderId = null, folderName = null, location) {
        this.view = new FolderView(this, this.applicationController)
        
        // If a folder on the home view has been clicked.
        if (folderId === null) {
            this.model.clearFolderIdlist();
        }
        if (location !== null) {
            this.model.addHierarcyPath(location)
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
        return response[this.objectNum];
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
    
    getPreviousFolderObject() {
        return this.model.getPreviousFolderObject();
    }

    setNoteLocation(location) {
        this.model.addHierarcyPath(location)
    }

    async add(object) {
        const { name } = object
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


    async moveFolder(newParentFolderId, droppedFolderId) {
        const response = await this.model.update('/moveFolder', {
            'new_parent_folder_id': newParentFolderId, 
            'folder_id': droppedFolderId
        });
        const folder = response[this.objectNum].folder;
        this.view.renderDelete(folder);
    }

    async delete(folderId) {
        const response = await this.model.delete(`/folder/${folderId}`);
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