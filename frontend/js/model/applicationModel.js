export class ApplicationModel {
    constructor() {
        // use a set for this 
        this.currentFolder = null;
        this.parentFolder = null;
    }

    getParentFolderID() {
        return this.parentFolder;
    }

    setParentFolderID(ID) {
        this.parentFolder = ID; 
    }

    getCurrentFolderID() {
        return this.currentFolder;
    }

    setCurrentFolderID(ID) {
        this.parentFolder = this.currentFolder;
        this.currentFolder = ID;
    }
}