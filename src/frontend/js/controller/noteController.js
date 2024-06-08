import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this, applicationController, dialog, notificationHandler);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId) {
        const response = await this.noteModel.getNotes('/notes', folderId);
        const notes = await response.Note;
        this.noteView.renderNoteCards(notes);
    }

    async getNoteById(noteId) {
        const response = await this.noteModel.getNoteById('/noteById', noteId);
        const note = await response.Note;
        const folderId = await response.Folder_id;
        const folderName = await response.Folder_name;
        return [note, folderId, folderName]
    }

    async addNote(folderId, content, name) {
        const RESPONSE = await this.noteModel.addNote('/note', folderId, content, name);
        let note = await RESPONSE.Note;
        const folderName = await RESPONSE.folder_name
        note.content = content;
        this.noteView.renderNoteCard(note);
        this.noteView.pushNotification('Saved');
        this.applicationController.addSearchObject(note.id, note.title, folderName);
        return await note
    }

    async updateNote(noteId, name, content, bookmark, favorite, color) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark, favorite, color);
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