export class TextEditorModel {
    constructor() {
        this.noteObject = null
        this.templateObject = null
    }

    storeNoteData(note) {
        this.noteObject = note;
    }

    storeTemplateData(template) {
        this.templateObject = template;
    }

    storeNoteColor(color) {
        this._color = color;
    }

    /**
     * Returns stored note data as an array.
     * @returns {Array} A list of stored note data
     */
    getStoredNoteData() {
        return [
            this._noteId, 
            this._creation, 
            this._lastEdit, 
            this._bookmark, 
            this._favorite, 
            this._color
        ]
    }

    getStoredNoteId() {
        return this.noteObject.id;
    }

    getStoredTemplateId() {
        return this.templateObject.id
    }

    clear() {
        this.noteObject = null;
        this.templateObject = null;
    }
}