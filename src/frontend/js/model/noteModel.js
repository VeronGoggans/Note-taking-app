import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js"

export class NoteModel {
    
    async getNotes(endpoint, folderId) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}/${folderId}`, OPTIONS);
    }

    async getNoteById(endpoint, noteId) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}/${noteId}`, OPTIONS);
    }

    async getSearchOptions(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}`, OPTIONS);
    }

    async addNote(endpoint, folderId, content, name) {
        const OPTIONS = RequestOptionsBuilder.buildPostOptions({
            'folder_id': folderId,
            'title': name,
            'content': content,
            'bookmark': false
        })
        return this.#fetchData(endpoint, OPTIONS)
    }

    async updateNote(endpoint, noteId, name, content, bookmark, color) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({
            'note_id': noteId,
            'title': name,
            'content': content,
            'bookmark': bookmark,
            'color': color
        })
        return this.#fetchData(endpoint, OPTIONS)
    }

    async moveNote(endpoint, noteId, folderId) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'note_id': noteId})
        return this.#fetchData(endpoint, OPTIONS)
    }

    async updateNoteColor(endpoint, noteId, color) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'note_id': noteId, 'color': color})
        return this.#fetchData(endpoint, OPTIONS)
    }

    async deleteNote(endpoint, noteId) {
        const OPTIONS = RequestOptionsBuilder.buildDeleteOptions({'note_id': noteId});
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