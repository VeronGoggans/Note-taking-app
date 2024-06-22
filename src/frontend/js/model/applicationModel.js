export class ApplicationModel {
    constructor() {
        this.folderIds = [];
    }

    clearFolderIdlist() {
        this.folderIds = [];
    }

    /** 
     * @returns {String} The ID of the current folder, 
     * or the home folder id if the stack is empty.
     */
    getCurrentFolderID() {
        const lastFolder = this.folderIds[this.folderIds.length - 1];
        return lastFolder ? lastFolder.id : 'f-1';
    }

    
    getCurrentFolderName() {
        if (this.folderIds.length > 0) {
            return this.folderIds[this.folderIds.length - 1].name;
        }
        return undefined
    }


    addFolderIdToList(id, name) {
        if (this.folderIds.length > 0) {
            // if the id is not already in the last index of the array, push.
            if (id !== this.folderIds[this.folderIds.length - 1].id) {
                this.folderIds.push({'id': id, 'name': name});
                console.log({'id': id, 'name': name});
            } else {
                console.log('Push rejected: ID already present in the list!');
            }
        } else {
            this.folderIds.push({'id': id, 'name': name});
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
        this.folderIds.pop();
        const lastFolder = this.folderIds[this.folderIds.length - 1];
        return lastFolder ? lastFolder: 'f-1';
    }
    


    async getSearchOptions(endpoint) {
        try {
            const RESPONSE = await fetch(`${endpoint}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}