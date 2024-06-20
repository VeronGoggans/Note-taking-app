import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.view = new NoteView(this, applicationController, dialog, notificationHandler);
        this.model = new NoteModel();
    }

    async getNotes(folderId) {
        const response = await this.model.get('/notes', folderId);
        const notes = await response.Note;
        this.view.renderAll(notes);
    }

    async getNoteById(noteId) {
        const response = await this.model.getById('/noteById', noteId);
        const note = await response.Note;
        const folderId = await response.Folder_id;
        const folderName = await response.Folder_name;
        return [note, folderId, folderName]
    }

    async addNote(folderId, name, content) {
        const response = await this.model.add('/note', folderId, name, content);
        let note = await response.Note;
        const folderName = await response.folder_name
        note.content = content;
        this.view.renderOne(note);
        this.view.pushNotification('Saved');
        this.applicationController.addSearchObject(note.id, note.name, folderName);
        return await note
    }

    async updateNote(noteId, name, content, bookmark, favorite, color) {
        const response = await this.model.update('/note', noteId, name, content, bookmark, favorite, color);
        const note = await response.Note;
        this.view.renderUpdate(note);
        this.view.pushNotification('Updated');
        this.applicationController.updateSearchObject(noteId, name);
    }

    async deleteNote(noteId) {
        const response = await this.model.delete('/note', noteId);
        const note = await response.Note;
        this.view.renderDelete(note);
        this.view.pushNotification('Deleted', note.name);
        this.applicationController.deleteSearchObject(noteId);
    }

    async moveNote(noteId, folderId) {
        const response = await this.model.move('/moveNote', noteId, folderId);
        const note = response.Note;
        this.view.removeNote(note, false);
    }

    async updateNoteColor(noteId, color) {
        const response = await this.model.updateColor('/noteColor', noteId, color);
        const note = response.Note;
        this.view.update(note);
    }
}