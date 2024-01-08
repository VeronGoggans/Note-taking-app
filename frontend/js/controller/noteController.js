import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId, noteType='all') {
        const RESPONSE = await this.noteModel.getNotes('/notes', folderId, noteType);
        const NOTES = RESPONSE.Object;
        this.noteView.renderNoteCards(NOTES);
    }

    async getNoteById(noteId) {
        const RESPONSE = await this.noteModel.getNoteById('/noteById', noteId);
        const NOTE = RESPONSE.Note;
        return NOTE;
    }

    async addNote(folderId, content, name) {
        const RESPONSE = await this.noteModel.addNote('/note', folderId, content, name);
        let note = RESPONSE.Note;
        note.content = content;
        this.noteView.renderNoteCard(note);
    }

    async updateNote(noteId, name, content, bookmark) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark);
        const NOTE = RESPONSE.Note;
        this.noteView.renderNoteUpdate(NOTE);
    }

    async deleteNote(noteId) {
        const PARENT_ID = this.applicationController.getCurrentFolderID();
        const RESPONSE = await this.noteModel.deleteNote('/note', PARENT_ID, noteId);
        const NOTE = RESPONSE.Note;
        this.noteView.removeNote(NOTE);
    }

    /**
     * This method clears the noteObjects list 
     * inside the noteView
     */
    clearNotObjectsList() {
        this.noteView.clearNoteObjectsList()
    }


    
    // Methods that communicate with the application controller
    // communicating <--- 

    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content is the content of the note.
     * @param {String} name is the name/title of the note. 
     */
    handleNoteCardClick(content, name, creation, lastEdit, noteId, bookmark) {
        this.applicationController.openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark);
    }

    /**
     * This method updates the searchbar.
     * 
     * This method updates the searchbar for the following events
     * 1. Note name changed 
     * 2. Note deleted 
     * 3. Note added
     */
    handleSearchbarUpdate() {
        

    }
}