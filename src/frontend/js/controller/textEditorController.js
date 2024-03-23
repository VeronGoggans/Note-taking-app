import { TextEditorView } from "../view/textEditorView.js";
import { TextEditorModel } from "../model/textEditorModel.js";

export class TextEditorController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.textEditorView = new TextEditorView(this, dialog);
        this.textEditorModel = new TextEditorModel();
    }

    showTextEditor() {
        this.textEditorView.show();
    }

    /**
     * This method opens a note inside the text editor.
     * 
     * This method is called when a note card has been clicked.
     * 
     * @param {String} content 
     * @param {String} name 
     */
    openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark) {
        this.textEditorModel.storeNoteData(noteId, creation, lastEdit, bookmark);
        this.textEditorView.open(content, name);
    }

    /**
     * This method returns a list of note data
     * 1. noteId
     * 2. creation date
     * 3. lastEdit date
     * 4. bookmark
     * 
     * And clears the stored data from the model.
     * 
     * @returns This method returns a list of stored note data.
     */
    getStoredNoteData() {
        return this.textEditorModel.getStoredNoteData();
    }

    /**
     * This method stores the following note data
     * 1. noteId
     * 2. creation date
     * 3. lastEdit date
     * 4. bookmark
     * 
     * And clears the stored data from the model.
     */
    storeNoteData(noteId, creation, lastEdit, bookmark) {
        this.textEditorModel.storeNoteData(noteId, creation, lastEdit, bookmark);
    }

    /**
     * This method turns all stored note values to null
     */
    clearStoredNoteData() {
        this.textEditorModel.clear();
    }

    /**
     * This method handles the save button click.
     * 
     * This method decides if the save button click 
     * was for an existing note or a new note.
     * 
     * If for an existing note, the changeNote method is called
     * If for a new note, the addNote method is called.
     * 
     * @param {String} content 
     * @param {String} name 
     * @param {Boolean} bookmark 
     */
    save(content, name, bookmark) {
        const NOTE_ID = this.textEditorModel.getStoredNoteId();
        if (NOTE_ID !== null) {
            this.applicationController.changeNote(NOTE_ID, name, content, bookmark)
            this.clearStoredNoteData();
        } else {
            this.applicationController.addNote(content, name);
        }
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

    async changeEditorPageStyle(init) {
        await this.applicationController.setEditorPageStyle(init);
    }
}