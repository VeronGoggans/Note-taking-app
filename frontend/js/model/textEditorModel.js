export class TextEditorModel {
    constructor() {
        this.noteId = null;
        this.creation = null;
        this.lastEdit = null;
        this.bookmark = null;
    }

    /**
     * This method stores some note data of the note that has been clicked on.
     * 
     * @param {String} noteId 
     * @param {String} creation 
     * @param {String} lastEdit 
     */
    storeNoteData(noteId, creation, lastEdit, bookmark) {
        this.noteId = noteId
        this.creation = creation;
        this.lastEdit = lastEdit;
        this.bookmark = bookmark;
        console.log(`Stored data: ${this.noteId}`);
    }

    /**
     * @returns A list of stored note data
     */
    getStoredNoteData() {
        return [this.noteId, this.creation, this.lastEdit, this.bookmark];
    }

    /**     * 
     * @returns The stored note id.
     */
    getStoredNoteId() {
        return this.noteId;
    }

    /**
     * This method removes the stored note data.
     */
    clear() {
        this.noteId = null;
        this.creation = null;
        this.lastEdit = null;
        this.bookmark = null;
    }
}