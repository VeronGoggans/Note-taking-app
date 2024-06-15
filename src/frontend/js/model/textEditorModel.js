export class TextEditorModel {
    constructor() {
        this._noteId = null;
        this._creation = null;
        this._lastEdit = null;
        this._bookmark = null;
        this._favorite = null;
        this._name = null;
        this._color = null;
    }

    /**
     * Stores note data of the note that has been clicked on.
     */
    storeNoteData(noteId, creation, lastEdit, bookmark, favorite, name, color) {
        this._noteId = noteId
        this._creation = creation;
        this._lastEdit = lastEdit;
        this._bookmark = bookmark;
        this._favorite = favorite;
        this._name = name;
        this._color = color;
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

    /**     
     * Returns the stored note id.
     * @returns {String} The stored note id.
     */
    getStoredNoteId() {
        return this._noteId;
    }

    /**
     * This method removes the stored note data.
     */
    clear() {
        this._noteId = null;
        this._creation = null;
        this._lastEdit = null;
        this._bookmark = null;
        this._favorite = null;
        this._name = null;
        this._color = null;
    }
}