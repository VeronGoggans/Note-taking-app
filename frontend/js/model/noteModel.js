export class NoteModel {
    
    async getNotes(endpoint, folderId, noteType) {
        try {
            const RESPONSE = await fetch(`${endpoint}/${folderId}/${noteType}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async updateNote(endpoint, noteId, name, content, bookmark) {
        const PUT_NOTE_OBJECT = {
            'note_id': noteId,
            'title': name,
            'content': content,
            'bookmark': bookmark
        }
        console.log(PUT_NOTE_OBJECT);
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

    async deleteNote(endpoint, folderId, noteId) {
        const DELETE_NOTE_OBJECT = {
            'folder_id': folderId,
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