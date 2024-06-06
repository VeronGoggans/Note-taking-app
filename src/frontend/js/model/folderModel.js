import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";

export class FolderModel {
    
    async getFolders(parentId = undefined) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        const ENDPOINT = parentId !== undefined ? '/subfolders' : '/folders';

        if (parentId !== undefined) {
            return this._fetchData(`${ENDPOINT}/${parentId}`, OPTIONS)
        }
        return this._fetchData(ENDPOINT, OPTIONS)
    }

    async addFolder(name, parentId = undefined, color='rgb(255, 255, 255)') {
        const OPTIONS = parentId !== undefined ?
            RequestOptionsBuilder.buildPostOptions({'folder_id': parentId, 'name': name, 'color': color}) :
            RequestOptionsBuilder.buildPostOptions({'name': name, 'color': color});
        const ENDPOINT = parentId !== undefined ? '/subfolder': '/folder'
        return this._fetchData(ENDPOINT, OPTIONS);
    }

    async updateFolder(folderId, name, color) {
        const OPTIONS = folderId.startsWith('f') ?
            RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'name': name, 'color': color}) :
            RequestOptionsBuilder.buildPutOptions({'subfolder_id': folderId, 'name': name, 'color': color})
        const ENDPOINT = folderId.startsWith('s') ? '/subfolder': '/folder'
        return this._fetchData(ENDPOINT, OPTIONS)
    }

    async deleteFolder(folderId, parentId) {
        const OPTIONS = parentId !== 'f-1' ?
            RequestOptionsBuilder.buildDeleteOptions({'folder_id': parentId, 'subfolder_id': folderId}) :
            RequestOptionsBuilder.buildDeleteOptions({'folder_id': folderId})
        const ENDPOINT = parentId !== 'f-1' ? '/subfolder': '/folder'
        return this._fetchData(ENDPOINT, OPTIONS);
    }

    async _fetchData(endpoint, options) {
        try {
            const RESPONSE = await fetch(`${endpoint}`, options);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`)
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}