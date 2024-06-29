export class TextEditorModel {
    constructor() {
        this.noteObject = null
        this.templateObject = null
        this.currentlyHandledEntity = '';
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

    getStoredNoteData() {
        console.log(this.noteObject);
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
    }
}