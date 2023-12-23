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

    async addNote() {

    }

    async updateNote(noteId, name, content, bookmark) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark);
        const NOTE = RESPONSE.Note;
        this.noteView.renderNoteCard(NOTE);
    }

    async deleteNote(noteId) {
        const PARENT_ID = this.applicationController.getCurrentFolderID();
        const RESPONSE = await this.noteModel.deleteNote('/note', PARENT_ID, noteId);
        const NOTE = RESPONSE.Note;
        this.noteView.removeNote(NOTE);
    }
}