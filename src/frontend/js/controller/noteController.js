import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this, applicationController, dialog, notificationHandler);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId) {
        const RESPONSE = await this.noteModel.getNotes('/notes', folderId);
        const NOTES = await RESPONSE.Note;
        this.noteView.renderNoteCards(NOTES);
    }

    async getNoteById(noteId) {
        const RESPONSE = await this.noteModel.getNoteById('/noteById', noteId);
        const NOTE = await RESPONSE.Note;
        const FOLDER_ID = await RESPONSE.Folder_id;
        const FOLDER_NAME = await RESPONSE.Folder_name;
        return [NOTE, FOLDER_ID, FOLDER_NAME]
    }

    async addNote(folderId, content, name) {
        const RESPONSE = await this.noteModel.addNote('/note', folderId, content, name);
        let note = await RESPONSE.Note;
        note.content = content;
        this.noteView.renderNoteCard(note);
        this.noteView.pushNotification('Saved');
        this.applicationController.addSearchObject(note.id, note.title);
        return await note
    }

    async updateNote(noteId, name, content, bookmark, color) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark, color);
        const NOTE = await RESPONSE.Note;
        this.noteView.renderNoteUpdate(NOTE);
        this.noteView.pushNotification('Updated');
        this.applicationController.updateSearchObject(noteId, name);
    }

    async deleteNote(noteId) {
        const RESPONSE = await this.noteModel.deleteNote('/note', noteId);
        const NOTE = await RESPONSE.Note;
        this.noteView.removeNote(NOTE);
        this.noteView.pushNotification('Deleted', NOTE.title);
        this.applicationController.deleteSearchObject(noteId);
    }

    async exportNote(format, name, content) {
        console.log(format, name, content);
        const RESPONSE = await this.noteModel.exportNote('/exportNote', format, name, content);
        const STATUS = await RESPONSE.Status_code;
        if (STATUS === 200) this.noteView.pushNotification('Export');
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
}