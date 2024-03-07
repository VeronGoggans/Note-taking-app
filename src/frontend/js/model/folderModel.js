export class FolderModel {
    
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


    async addFolder(endpoint, name, color='#ffffff') {
        const postFoldersObject = {'name': name, 'color': color}
        const OPTIONS = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postFoldersObject)
        }
        try {
            const response = await fetch(`${endpoint}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async updateFolder(endpoint, folderId, name, color) {
        const putFolderObject = {
            'folder_id': folderId,
            'name': name,
            'color': color
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(putFolderObject)
        }
        try {
            const response = await fetch(`${endpoint}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async deleteFolder(endpoint, folderId) {
        const DELETE_FOLDER_OBJECT = {
            'folder_id': folderId
        }
        const OPTIONS = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(DELETE_FOLDER_OBJECT)
        }
        try {
            const response = await fetch(`${endpoint}`, OPTIONS);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}