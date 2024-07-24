import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.view = new NoteView(this, applicationController, dialog, notificationHandler);
        this.model = new NoteModel();
        this.objectNum = 0;
    }

    async getNotes(folderId) {
        const response = await this.model.get('/notes', folderId);
        const notes = response[this.objectNum].notes;
        this.view.renderAll(notes);
    }

    async getNoteById(noteId) {
        const response = await this.model.getById('/noteById', noteId);
        const note = response[this.objectNum].note;
        const folderId = response.Folder_id;
        const folderName = response.Folder_name;
        return [note, folderId, folderName]
    }

    async addNote(folderId, name, content) {
        const response = await this.model.add('/note', folderId, name, content);
        let note = response[this.objectNum].note;
        const folderName = response.folder_name
        note.content = content;
        this.view.renderOne(note);
        this.applicationController.addSearchObject(note.id, note.name, folderName);
        return note
    }

    async updateNote(noteId, name, content, bookmark, favorite) {
        const response = await this.model.update('/note', noteId, name, content, bookmark, favorite);
        const note = response[this.objectNum].note;
        this.view.renderUpdate(note);
        this.applicationController.updateSearchObject(noteId, name);
    }

    async deleteNote(noteId) {
        const response = await this.model.delete('/note', noteId);
        const note = response[this.objectNum].note;
        this.view.renderDelete(note);
        this.applicationController.deleteSearchObject(noteId);
    }

    async moveNote(noteId, folderId) {
        const response = await this.model.move('/moveNote', noteId, folderId);
        const note = response[this.objectNum].note;
        this.view.removeNote(note, false);
    }
}