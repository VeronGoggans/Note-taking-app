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
}