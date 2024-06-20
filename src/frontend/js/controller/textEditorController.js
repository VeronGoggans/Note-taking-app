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
     * This method opens a note inside the text editor.
     * 
     * This method is called when a note card has been clicked.
     */
    openNoteInTextEditor(note) {
        this.textEditorModel.storeNoteData(note);
        this.textEditorView.open(note);
    }

    openTemplateInTextEditor(template) {
        this.storeNoteData(template)
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
    storeNoteData(noteId, creation, lastEdit, bookmark, favorite, name, color) {
        this.textEditorModel.storeNoteData(noteId, creation, lastEdit, bookmark, favorite, name, color);
    }

    clearStoredNoteData() {
        this.textEditorModel.clear();
    }

    /** 
     * This method decides if the save button click 
     * was for an existing note or a new note.
     * 
     * If for an existing note, the changeNote method is called
     * If for a new note, the addNote method is called.
     */
    async save(content, name, bookmark, favorite, color) {
        const NOTE_ID = this.textEditorModel.getStoredNoteId();
        if (NOTE_ID !== null) {
            await this.applicationController.changeNote(NOTE_ID, name, content, bookmark, favorite, color)
        } else {
            await this.applicationController.addNote(content, name);
        }
    }

    async updateNoteColor(color) {
        const NOTE_ID = this.textEditorModel.getStoredNoteId();
        this.textEditorModel.storeNoteColor(color);
        this.applicationController.updateNoteColor(NOTE_ID, color);
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
    async handleConfirmButtonClick(noteId) {
        await this.applicationController.deleteNote(noteId);
    }
}