export class NoteModel {
    
    async getNotes(endpoint, folderId) {
        try {
            const RESPONSE = await fetch(`${endpoint}/${folderId}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async getNoteById(endpoint, noteId) {
        try {
            const RESPONSE = await fetch(`${endpoint}/${noteId}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async getSearchOptions(endpoint) {
        try {
            const RESPONSE = await fetch(`${endpoint}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async addNote(endpoint, folderId, content, name) {
        const POST_NOTE_OBJECT = {
            'folder_id': folderId,
            'title': name,
            'content': content,
            'bookmark': false
        }
        const OPTIONS = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(POST_NOTE_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async updateNote(endpoint, noteId, name, content, bookmark, color) {
        const PUT_NOTE_OBJECT = {
            'note_id': noteId,
            'title': name,
            'content': content,
            'bookmark': bookmark,
            'color': color
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(PUT_NOTE_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async moveNote(endpoint, noteId, folderId) {
        const MOVE_NOTE_OBJECT = {
            'folder_id': folderId,
            'note_id': noteId
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(MOVE_NOTE_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async updateNoteColor(endpoint, noteId, color) {
        const PUT_NOTE_COLOR_OBJECT = {
            'note_id': noteId,
            'color': color
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(PUT_NOTE_COLOR_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async deleteNote(endpoint, noteId) {
        const DELETE_NOTE_OBJECT = {
            'note_id': noteId
        }
        const OPTIONS = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(DELETE_NOTE_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`)
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}