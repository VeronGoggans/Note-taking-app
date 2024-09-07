import { HttpModel } from "../model/httpModel.js";
import { StickyNoteView } from "../view/stickyNoteView.js";


export class StickWallController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new StickyNoteView(this, this.dialog);
        await this.get()
    }

    async add(sticky) {
        const { stickyNote }  = await this.model.add('/stickyNote', sticky);
        this.view.renderOne(stickyNote);
    }


    async get() {
        const { stickyNotes } = await this.model.get(`/stickyNotes`);
        this.view.renderAll(stickyNotes);
    }


    async update(sticky) {
        const { stickyNote }  = await this.model.update('/stickyNote', sticky);
        this.view.renderUpdate(stickyNote);
    }


    async delete(stickyNoteId) {
        await this.model.delete(`/stickyNote/${stickyNoteId}`);
        this.view.renderDelete(stickyNoteId);
    }
}