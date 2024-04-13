import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";

export class FolderModel {
    
    async getFolders(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(endpoint, OPTIONS)
    }

    async addFolder(endpoint, name, color='#ffffff') {
        const OPTIONS = RequestOptionsBuilder.buildPostOptions({'name': name, 'color': color});
        return this.#fetchData(endpoint, OPTIONS);
    }

    async updateFolder(endpoint, folderId, name, color) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'name': name, 'color': color});
        return this.#fetchData(endpoint, OPTIONS)
    }

    async deleteFolder(endpoint, folderId) {
        const OPTIONS = RequestOptionsBuilder.buildDeleteOptions({'folder_id': folderId});
        return this.#fetchData(endpoint, OPTIONS);
    }

    async #fetchData(endpoint, options) {
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