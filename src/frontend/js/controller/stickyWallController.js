import { HttpModel } from "../model/httpModel.js";
import { StickyNoteView } from "../view/stickyNoteView.js";


export class StickWallController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
        this.objectNum = 0
    }

    async init() {
        this.view = new StickyNoteView(this, this.dialog);
        await this.get()
    }

    async add(stickyNote) {
        const response  = await this.model.add('/stickyNote', stickyNote);
        this.view.renderOne(
            response[this.objectNum].stickyNote
        );
    }

    async get() {
        const response = await this.model.get(`/stickyNotes`);
        const stickyNotes = response[this.objectNum].stickyNotes;
        this.view.renderAll(stickyNotes);
    }

    async update(stickyNote) {
        const response  = await this.model.update('/stickyNote', stickyNote);
        this.view.renderUpdate(
            response[this.objectNum].stickyNote
        );
    }

    async delete(stickyNoteId) {
        await this.model.delete(`/stickyNote/${stickyNoteId}`);
        this.view.renderDelete(
            stickyNoteId
        );
    }
}