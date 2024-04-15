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
    
    /** 
     * Gets the current folder ID.
     * @returns {String|undefined} The ID of the current folder, or undefined if no folder is set.
     */
    getCurrentFolderID() {
        const lastFolder = this.folderIds[this.folderIds.length - 1];
        return lastFolder ? lastFolder.id : undefined;
    }

    /**
     * This method returns the current folder name
     * The name of the folder the user is currently in.
     * 
     * @returns {String}
     */
    getCurrentFolderName() {
        if (this.folderIds.length > 0) {
            return this.folderIds[this.folderIds.length - 1].name;
        }
        return undefined
    }


    addFolderIdToList(ID, name) {
        if (this.folderIds.length > 0) {
            // if the id is not already in the last index of the array, push.
            if (ID !== this.folderIds[this.folderIds.length - 1].id) {
                this.folderIds.push({'id': ID, 'name': name});
                this.createNoteButtonContext();
            }
        } else {
            this.folderIds.push({'id': ID, 'name': name});
            this.createNoteButtonContext();
        }
        console.log(this.folderIds);
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
        this.createNoteButtonContext();
        console.log(this.folderIds);
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