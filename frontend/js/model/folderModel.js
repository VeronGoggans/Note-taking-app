export class FolderModel {
    constructor() {
        this.previousFolder = null;
    }

    getPreviousFolderID() {
        return this.previousFolder;
    }
    
    
    async getFolders(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async addFolder(endpoint, name) {
        const postFoldersObject = {'name': name}
        const OPTIONS = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postFoldersObject)
        }
        try {
            const response = await fetch(`/${endpoint}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async updateFolder(endpoint, folderId, newName) {
        const putFolderObject = {
            'folder_id': folderId,
            'new_name': newName
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(putFolderObject)
        }
        try {
            const response = await fetch(`/${endpoint}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async deleteFolder(endpoint, folderId) {
        const OPTIONS = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }
        try {
            const response = await fetch(`/${endpoint}/${folderId}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}