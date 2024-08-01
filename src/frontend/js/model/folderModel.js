import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class FolderModel {
    constructor() {
        this.folderObjects = []
    }

    async add(name, color='rgb(255, 255, 255)') {
        const parentId = this.getCurrentFolderID()
        const options = RequestOptionsBuilder.buildPostOptions({'folder_id': parentId, 'name': name, 'color': color}) 
        return fetchData(`/folder/${parentId}`, options);
    }
    
    async get() {
        const parentId = this.getCurrentFolderID()
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`/folders/${parentId}`, options)
    }

    async getById(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, options)
    }

    async getSearchItems() {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData('/folderSearchItems', options)
    }

    async update(folderId, name, color) {
        const options = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'name': name, 'color': color})
        return fetchData('/folder', options)
    }

    async updateVisitTime(folderId) {
        const options = RequestOptionsBuilder.buildPatchOptions()
        return fetchData(`/viewedFolderTime/${folderId}`, options)
    }

    async delete(folderId) {
        const parentId = this.getCurrentFolderID()
        const options = RequestOptionsBuilder.buildDeleteOptions();
        return fetchData(`/folder/${parentId}/${folderId}`, options);
    }

    clearFolderIdlist() {
        this.folderObjects = [];
    }

    getCurrentFolderObject() {
        const lastFolder = this.folderObjects[this.folderObjects.length - 1];
        return lastFolder ? lastFolder : {id: 'f-1', name: 'Home'};
    }
    /** 
     * @returns {String} The ID of the current folder, 
     * or the home folder id if the stack is empty.
     */
    getCurrentFolderID() {
        const lastFolder = this.folderObjects[this.folderObjects.length - 1];
        return lastFolder ? lastFolder.id : 'f-1';
    }
    
    getCurrentFolderName() {
        if (this.folderObjects.length > 0) {
            return this.folderObjects[this.folderObjects.length - 1].name;
        }
        return undefined
    }

    getAllFolderNames() {
        let folderNames = []
        this.folderObjects.forEach(folderObject => {
            folderNames.push(folderObject.name)
        })
        return folderNames
    }


    addFolderIdToList(id, name) {
        if (this.folderObjects.length > 0) {
            // if the id is not already in the last index of the array, push.
            if (id !== this.folderObjects[this.folderObjects.length - 1].id) {
                this.folderObjects.push({'id': id, 'name': name});
            } else {
                console.log('Push rejected: ID already present in the list!');
            }
        } else {
            this.folderObjects.push({'id': id, 'name': name});
        }
    }

    /**
     * This method returns the parent folder ID of the subfolder
     * the user is currently in. 
     * 
     * This method also removes the folder ID of which the user is currently in.
     * 
     * @returns {String} parent folder ID
     */
    removeFolderIdFromList() {
        this.folderObjects.pop();
        const lastFolder = this.folderObjects[this.folderObjects.length - 1];
        return lastFolder ? lastFolder: {id: 'f-1', name: 'Home'};
    }
}