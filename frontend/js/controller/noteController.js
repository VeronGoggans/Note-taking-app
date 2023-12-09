import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId, noteType) {
        const RESPONSE = await this.noteModel.getNotes('/notes', folderId, noteType);
        const NOTES = RESPONSE.Object;
    }

    async addNote() {

    }

    async updateNote() {

    }

    async deleteNote() {

    }

}