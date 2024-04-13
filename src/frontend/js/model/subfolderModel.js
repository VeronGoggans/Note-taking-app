import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";

export class SubfolderModel {

    async getsubfolders(endpoint, parentID) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}/${parentID}`, OPTIONS)
    }

    async addSubfolder(endpoint, name, parentID, color='#ffffff') {
        const OPTIONS = RequestOptionsBuilder.buildPostOptions({'folder_id': parentID, 'name': name, 'color': color})
        return this.#fetchData(endpoint, OPTIONS)
    }

    async updateSubfolder(endpoint, subfolderID, newName, color) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'subfolder_id': subfolderID, 'name': newName, 'color': color})
        return this.#fetchData(endpoint, OPTIONS)
    }

    async deleteSubfolder(endpoint, folderId, subfolderId) {
        const OPTIONS = RequestOptionsBuilder.buildDeleteOptions({'folder_id': folderId, 'subfolder_id': subfolderId})
        return this.#fetchData(endpoint, OPTIONS)
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