import { TextEditorView } from "../view/textEditorView.js";
import { TextEditorModel } from "../model/textEditorModel.js";

export class TextEditorController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.textEditorView = new TextEditorView(this, applicationController, dialog);
        this.textEditorModel = new TextEditorModel();
    }

    showTextEditor() {
        this.textEditorView.show();
    }

    /**
     * 
     * This method is called when a note card has been clicked.
     */
    openNoteInTextEditor(note) {
        this.textEditorModel.storeNoteData(note);
        this.textEditorView.open(note);
    }

    /**
     * 
     * This method is called when a template card has been clicked.
     */
    openTemplateInTextEditor(template) {
        this.textEditorModel.storeTemplateData(template)
        this.textEditorView.open(template)
    }

    /**
     * This method returns a list of note data 
     * And clears the stored data from the model.
     * 
     * @returns This method returns a list of stored note data.
     */
    getStoredNoteData() {
        return this.textEditorModel.getStoredNoteData();
    }

    /**
     * This method stores the following note data 
     * And clears the stored data from the model.
     */
    storeNoteData(note) {
        this.textEditorModel.storeNoteData(note);
    }

    clearStoredNoteData() {
        this.textEditorModel.clear();
    }

    /**
     * Save changes to a new or existing note
     */
    async save(name, content) {
        const note = this.textEditorModel.getStoredNoteData();
        const noteId = note?.id || null;

        if (noteId !== null) {
            await this.applicationController.changeNote(noteId, name, content, note.bookmark, note.favorite, note.color)
        } else {
            await this.applicationController.addNote(name, content);
        }
    }

    async updateNoteColor(color) {
        const noteId = this.textEditorModel.getStoredNoteId();
        this.textEditorModel.storeNoteColor(color);
        this.applicationController.updateNoteColor(noteId, color);
    }

    /**
     * This method deletes a specific note from withing 
     * the text editor
     * 
     * This method is called when the confirm button 
     * inside the noteDeleteContainer is clicked.
     * 
     * @param {String} noteId 
     */
    async handleDeleteButtonClick(noteId) {
        this.clearStoredNoteData();
        await this.applicationController.deleteNote(noteId);
    }
}