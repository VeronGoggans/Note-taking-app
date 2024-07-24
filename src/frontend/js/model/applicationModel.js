import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class ApplicationModel {
    constructor() {
        this.folderObjects = [];
    }

    clearFolderIdlist() {
        this.folderObjects = [];
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
        return lastFolder ? lastFolder: 'f-1';
    }
    
    
    async getSearchOptions(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}`, options);
    }
}