export class TextEditorModel {
    constructor() {
        this.noteId = null;
        this.creation = null;
        this.lastEdit = null;
        this.bookmark = null;
    }
    
    storeNoteData(noteId, creation, lastEdit) {
        this.noteId = noteId
        this.creation = creation;
        this.lastEdit = lastEdit;
    }

    getStoredNoteData() {
        return [this.noteId, this.creation, this.lastEdit];
    }
}