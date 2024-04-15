import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this, dialog, notificationHandler);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId) {
        const RESPONSE = await this.noteModel.getNotes('/notes', folderId);
        const NOTES = await RESPONSE.Object;
        this.noteView.renderNoteCards(NOTES);
    }

    async getNoteById(noteId) {
        const RESPONSE = await this.noteModel.getNoteById('/noteById', noteId);
        const NOTE = await RESPONSE.Note;
        const FOLDER_ID = await RESPONSE.Folder;
        return [NOTE, FOLDER_ID]
    }

    async addNote(folderId, content, name) {
        const RESPONSE = await this.noteModel.addNote('/note', folderId, content, name);
        let note = await RESPONSE.Note;
        note.content = content;
        this.noteView.renderNoteCard(note);
        this.noteView.pushNotification('Saved');
        this.addSearchObject(note.id, note.title);
        return await note
    }

    async updateNote(noteId, name, content, bookmark, color) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark, color);
        const NOTE = await RESPONSE.Note;
        this.noteView.renderNoteUpdate(NOTE);
        this.noteView.pushNotification('Updated');
        this.updateSearchObject(noteId, name);
    }

    async deleteNote(noteId) {
        const RESPONSE = await this.noteModel.deleteNote('/note', noteId);
        const NOTE = await RESPONSE.Note;
        this.noteView.removeNote(NOTE);
        this.noteView.pushNotification('Deleted', NOTE.title);
        this.deleteSearchObject(noteId);
    }

    async exportNote(format, name, content) {
        const RESPONSE = await this.noteModel.exportNote('/exportNote', format, name, content);
        const STATUS = await RESPONSE.Download_status;
        return await STATUS
    }

    async moveNote(noteId, folderId) {
        const RESPONSE = await this.noteModel.moveNote('/moveNote', noteId, folderId);
        const NOTE = RESPONSE.Note;
        this.noteView.removeNote(NOTE, false);
    }

    async updateNoteColor(noteId, color) {
        const RESPONSE = await this.noteModel.updateNoteColor('/noteColor', noteId, color);
        const NOTE = RESPONSE.Note;
        this.noteView.update(NOTE);
    }
    
    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor. 
     */
    handleNoteCardClick(content, name, creation, lastEdit, noteId, bookmark, color) {
        this.applicationController.openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark, color);
    }

    /**
     * This method will add a new note to the search bar's options
     * 
     * This method is called everytime a new note is created
     * 
     * @param {String} noteId 
     * @param {String} name 
     */
    addSearchObject(noteId, name) {
        this.applicationController.addSearchObject(noteId, name)
    }

    /**
     * This method will remove a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets deleted.
     * 
     * @param {String} noteId 
     */
    deleteSearchObject(noteId) {
        this.applicationController.deleteSearchObject(noteId);
    }

    /**
     * This method will update a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets updated.
     * 
     * @param {String} noteId 
     * @param {String} name 
     */
    updateSearchObject(noteId, name) {
        this.applicationController.updateSearchObject(noteId, name);
    }
}