import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class NoteModel {
    constructor() {
        this.folderObjects = [];
    }
    
    async get(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, options);
    }

    async add(endpoint, folderId, name, content) {
        const options = RequestOptionsBuilder.buildPostOptions({
            'folder_id': folderId,
            'name': name,
            'content': content
        })
        return fetchData(endpoint, options)
    }

    async update(endpoint, note) {
        const options = RequestOptionsBuilder.buildPutOptions({
            'note_id': note.id,
            'name': note.name,
            'content': note.content,
            'bookmark': note.bookmark,
            'favorite': note.favorite,
        })
        return fetchData(endpoint, options)
    }

    async delete(endpoint, noteId) {
        const options = RequestOptionsBuilder.buildDeleteOptions();
        return fetchData(`${endpoint}/${noteId}`, options);
    }

    async moveNote(endpoint, noteId, folderId) {
        const options = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'note_id': noteId})
        return fetchData(endpoint, options)
    }
}