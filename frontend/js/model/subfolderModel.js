export class SubfolderModel {

    async getsubfolders(endpoint, parentID) {
        try {
            const response = await fetch(`${endpoint}/${parentID}`);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }


    async addSubfolder(endpoint, name, parentID, color='#ffffff') {
        const POST_SUBFOLDER_OBJECT = {'folder_id': parentID, 'name': name, 'color': color}
        const OPTIONS = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(POST_SUBFOLDER_OBJECT)
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


    async updateSubfolder(endpoint, subfolderID, newName, color) {
        const PUT_SUBFOLDER_OBJECT = {
            'subfolder_id': subfolderID,
            'name': newName,
            'color': color
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(PUT_SUBFOLDER_OBJECT)
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


    async deleteSubfolder(endpoint, folderId, subfolderId) {
        const DELETE_SUBFOLDER_OBJECT = {
            'folder_id': folderId,
            'subfolder_id': subfolderId
        }
        const OPTIONS = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(DELETE_SUBFOLDER_OBJECT)
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