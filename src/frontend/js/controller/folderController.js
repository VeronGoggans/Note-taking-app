import { FolderModel } from "../model/folderModel.js";
import { FolderView } from "../view/folderView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";


export class FolderController {
    constructor(applicationController) {
        this.applicationController = applicationController;
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


    async add(object) {
        const { name } = object
        const parentFolderId = this.model.getCurrentFolderID();

        try {
            const { folder } = await this.model.add('/folder', {'folder_id': parentFolderId, 'name': name});
            this.view.renderOne(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get() {
        const parentFolderId = this.model.getCurrentFolderID();

        try {
            const { folders } = await this.model.get(`/folders/${parentFolderId}`);
            this.view.renderAll(folders);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getById(folderId) {
        try {
            return await this.model.get(`folderById/${folderId}`);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getSearchItems() {
        try {
            const { folders } = await this.model.get('/folderSearchItems') 
            return folders 
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async update(object) {
        try {
            const { folder } = await this.model.update('/folder', {'folder_id': object.id, 'name': object.name, 'color': object.color});
            this.view.renderUpdate(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async move(newParentFolderId, droppedFolderId) {
        try {
            const { folder } = await this.model.update('/moveFolder', {'new_parent_folder_id': newParentFolderId, 'folder_id': droppedFolderId});
            this.view.renderDelete(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(folderId) {
        try {
            const { folder } = await this.model.delete(`/folder/${folderId}`);
            this.view.renderDelete(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
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

        await this.get();
        if (!init) {
            await this.applicationController.getNotes(folderId);
        }
    }

    clearFolderHistory() {
        this.model.clearFolderIdlist();
    }

    setNoteLocation(location) {
        this.model.addHierarcyPath(location)
    }
}