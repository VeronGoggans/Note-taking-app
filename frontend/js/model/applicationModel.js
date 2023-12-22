export class ApplicationModel {
    constructor() {
        // use a set for this 
        this.currentFolder = null;
        this.foldersIds = [null];
    }

    getCurrentFolderID() {
        return this.currentFolder;
    }

    setCurrentFolderID(ID) {
        this.currentFolder = ID;
    }
}