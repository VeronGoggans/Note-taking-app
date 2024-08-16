import { TextEditorView } from "../view/textEditorView.js";
import { TextEditorModel } from "../model/textEditorModel.js";
import { FlashcardModel } from "../model/flashcardModel.js";

export class TextEditorController {
    constructor(applicationController, dialog) {
        this.dialog = dialog;
        this.applicationController = applicationController;
        this.model = new TextEditorModel();
    }

    init() {
        this.textEditorView = new TextEditorView(this, this.applicationController, this.dialog);
        this.flashcardModel = new FlashcardModel();
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        if (previousView === 'notes'){
            const currentFolder = this.applicationController.getCurrentFolderObject();
            // The notes view will be initialized in the folder they were in before opening the editor
            this.applicationController.initView(previousView, {folder: currentFolder});
        } else {
            this.applicationController.initView(previousView);
        }
        this.model.clear();
    }

    async save(name, content) {
        const { editorObject, editorObjectType } = this.model.getStoredObject();
        this.model.clear();

        // Note cases
        if (editorObject !== null && editorObjectType === 'note') {
            editorObject.name = name;
            editorObject.content = content;
            
            await this.applicationController.updateNote(editorObject)
        }
        if (editorObject === null && editorObjectType === 'note') {
            await this.applicationController.addNote(name, content)
        }
        // Template cases
        if (editorObject !== null && editorObjectType === 'template') {
            editorObject.name = name;
            editorObject.content = content;
            await this.applicationController.updateTemplate(editorObject)
        }
        if (editorObject === null && editorObjectType === 'template') {
            await this.applicationController.addTemplate(name, content)
        } 
    }

    openInTextEditor(editorObject, editorObjectType, allFolderNames, allTemplateNames) {
        this.model.storeEditorObject(editorObject, editorObjectType);
        this.textEditorView.open(editorObject, allFolderNames, allTemplateNames);
    }

    storeEditorObject(editorObject, editorObjectType) {
        this.model.storeEditorObject(editorObject, editorObjectType);
    }

    showTextEditor(editorObjectType, allFolderNames, allTemplateNames) {
        this.model.storeEditorObjectType(editorObjectType);
        this.textEditorView.show(allFolderNames, allTemplateNames);
    }

    clearStoredObject() {
        this.model.clear()
    }

    getStoredObject() {
        return this.model.getStoredObject();
    }

    /**
     * Temporarely saves a flashcard object
     * 
     * @param {Object} flashcard 
     */
    saveCardToModel(flashcard) {
        this.flashcardModel.save(flashcard);
    }

    /**
     * Returns a list of saved flashcard objects
     * @returns {Array[Object]}
    */
    getSavedFlashcards() {
        return this.flashcardModel.getSavedFlashcards();
    }

    async addDeck(deckName, flashcards) {
        await this.applicationController.addDeck(deckName, flashcards);
    }

    async handleDeleteButtonClick(noteId) {
        await this.applicationController.deleteNote(noteId);
    }
}