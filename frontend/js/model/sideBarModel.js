export class SidebarModel {
    constructor() {
        this.currentFolder = null;
        this.previousFolder = null;
    }

    setCurrentFolder(id) {
        if (this.currentFolder === null) {
            this.currentFolder = id;
        }
        else {
            this._setPreviousFolder(this.currentFolder);
            this.currentFolder = id;
        }        
    }
   
    _setPreviousFolder(id) {
        this.previousFolder = id;
    }
}