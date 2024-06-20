import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class NoteModel {
    
    async get(endpoint, folderId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}/${folderId}`, options);
    }

    async getById(endpoint, noteId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}/${noteId}`, options);
    }

    async add(endpoint, folderId, name, content) {
        const options = RequestOptionsBuilder.buildPostOptions({
            'folder_id': folderId,
            'name': name,
            'content': content
        })
        return fetchData(endpoint, options)
    }

    async update(endpoint, noteId, name, content, bookmark, favorite, color) {
        const options = RequestOptionsBuilder.buildPutOptions({
            'note_id': noteId,
            'name': name,
            'content': content,
            'bookmark': bookmark,
            'favorite': favorite,
            'color': color
        })
        return fetchData(endpoint, options)
    }

    async delete(endpoint, noteId) {
        const options = RequestOptionsBuilder.buildDeleteOptions();
        return fetchData(`${endpoint}/${noteId}`, options);
    }

    async getSearchOptions(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}`, options);
    }

    async move(endpoint, noteId, folderId) {
        const options = RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'note_id': noteId})
        return fetchData(endpoint, options)
    }

    async updateColor(endpoint, noteId, color) {
        const options = RequestOptionsBuilder.buildPutOptions({'note_id': noteId, 'color': color})
        return fetchData(endpoint, options)
    }
}