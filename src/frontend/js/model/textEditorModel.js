export class TextEditorModel {
    constructor() {
        this.noteObject = null
        this.templateObject = null
    }

    storeNoteData(note) {
        this.noteObject = note;
        console.log(note);
    }

    storeTemplateData(template) {
        this.templateObject = template;
    }

    storeNoteColor(color) {
        this._color = color;
    }

    getStoredNoteData() {
        return this.noteObject
    }

    getStoredTemplateData() {
        return this.templateObject
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
        console.log(`removed Note: ${this.noteObject}`);
    }
}