export class ApplicationModel {
    constructor() {
        // use a set for this 
        this.folderIds = [];
    }

    clearFolderIdlist() {
        this.folderIds = [];
    }

    
    getCurrentFolderID() {
        return this.folderIds[this.folderIds.length - 1];
    }


    addFolderIdToList(ID) {
        if (ID !== this.folderIds[this.folderIds.length - 1]) {
            this.folderIds.push(ID);
        }
    }

    removeFolderIdFromList() {
        this.folderIds.pop();
        return this.folderIds[this.folderIds.length - 1];
    }
}