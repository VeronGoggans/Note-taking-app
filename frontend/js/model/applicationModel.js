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
            console.log(this.folderIds);
        }
    }

    removeFolderIdFromList() {
        this.folderIds.pop();
        return this.folderIds[this.folderIds.length - 1];
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