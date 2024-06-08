import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js"

export class NoteModel {
    
    async getNotes(endpoint, folderId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}/${folderId}`, options);
    }

    async getNoteById(endpoint, noteId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}/${noteId}`, options);
    }

    async addNote(endpoint, folderId, content, name) {
        const options = RequestOptionsBuilder.buildPostOptions({
            'folder_id': folderId,
            'title': name,
            'content': content
        })
        return this.#fetchData(endpoint, options)
    }

    async updateNote(endpoint, noteId, name, content, bookmark, favorite, color) {
        const options = RequestOptionsBuilder.buildPutOptions({
            'note_id': noteId,
            'title': name,
            'content': content,
            'bookmark': bookmark,
            'favorite': favorite,
            'color': color
        })
        return this.#fetchData(endpoint, options)
    }

    async deleteNote(endpoint, noteId) {
        const options = RequestOptionsBuilder.buildDeleteOptions({'note_id': noteId});
        return this.#fetchData(endpoint, options);
    }

    async exportNote(endpoint, format, name, content) {
        const options = RequestOptionsBuilder.buildPostOptions({'format': format, 'title': name, 'content': content});
        return this.#fetchData(endpoint, options)
    }

    async getSearchOptions(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(`${endpoint}`, options);
    }

    async moveNote(endpoint, noteId, folderId) {
        const options = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'note_id': noteId})
        return this.#fetchData(endpoint, options)
    }

    async updateNoteColor(endpoint, noteId, color) {
        const options = RequestOptionsBuilder.buildPutOptions({'note_id': noteId, 'color': color})
        return this.#fetchData(endpoint, options)
    }

    async #fetchData(endpoint, options) {
        try {
            const response = await fetch(`${endpoint}`, options);
            if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}