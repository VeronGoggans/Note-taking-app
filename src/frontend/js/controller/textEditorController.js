import { TextEditorView } from "../view/textEditorView.js";
import { TextEditorModel } from "../model/textEditorModel.js";

export class TextEditorController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.textEditorView = new TextEditorView(this, applicationController, dialog);
        this.textEditorModel = new TextEditorModel();
    }

    /**
     * Save changes to a new or existing note
     */
    async save(name, content) {
        const folderId = this.applicationController.getCurrentFolderID();
        let entityObject = undefined;

        if (folderId !== 'f-3') {
            entityObject = this.textEditorModel.getStoredNoteData();
        }
        if (folderId === 'f-3') {
            entityObject = this.textEditorModel.getStoredTemplateData();
        }


        const entityId = entityObject?.id || null;

        if (entityId === null && folderId !== 'f-3') {
            await this.applicationController.addNote(name, content); 
        } 
        if (entityId !== null && folderId !== 'f-3') {
            await this.applicationController.changeNote(entityId, name, content, 
                entityObject.bookmark, entityObject.favorite, entityObject.color)
        }
            

        if (entityId === null && folderId === 'f-3') {
            await this.applicationController.addTemplate(name, content);
        }
        if (entityId !== null && folderId === 'f-3') {
            await this.applicationController.changeTemplate(entityId, name, content);
        } 
    }

    /**
     * 
     * This method is called when a note card has been clicked.
     */
    openNoteInTextEditor(note, allFolderNames, allTemplateNames) {
        this.textEditorModel.storeNoteData(note);
        this.textEditorView.open(note, allFolderNames, allTemplateNames);
    }

    /**
     * 
     * This method is called when a template card has been clicked.
     */
    openTemplateInTextEditor(template, allFolderNames, allTemplateNames) {
        this.textEditorModel.storeTemplateData(template)
        this.textEditorView.open(template, allFolderNames, allTemplateNames)
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

    storeTemplateData(template) {
        this.textEditorModel.storeTemplateData(template)
    }

    clearStoredNoteData() {
        this.textEditorModel.clear();
    }

    showTextEditor(allFolderNames, allTemplateNames) {
        this.textEditorView.show(allFolderNames, allTemplateNames);
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