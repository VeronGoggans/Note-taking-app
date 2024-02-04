export class ApplicationModel {
    constructor() {
        this.folderIds = [];
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.createNoteButtonContext();
    }

    clearFolderIdlist() {
        this.folderIds = [];
        this.createNoteButtonContext();
    }

    
    getCurrentFolderID() {
        return this.folderIds[this.folderIds.length - 1];
    }


    addFolderIdToList(ID) {
        if (ID !== this.folderIds[this.folderIds.length - 1]) {
            this.folderIds.push(ID);
            this.createNoteButtonContext();
        }
    }

    removeFolderIdFromList() {
        this.folderIds.pop();
        this.createNoteButtonContext();
        return this.folderIds[this.folderIds.length - 1];
    }

    /**
     * This method checks if the create note button 
     * should be disabled or enabled.
     */
    createNoteButtonContext() {
        if (this.folderIds.length > 0) {
            if (this.createNoteButton.disabled) {
                this.createNoteButton.removeAttribute('disabled');
            }
        } else {
            this.createNoteButton.setAttribute('disabled', 'true');
        }
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