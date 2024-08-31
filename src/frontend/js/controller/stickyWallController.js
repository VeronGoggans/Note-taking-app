import { HttpModel } from "../model/httpModel.js";
import { StickyNoteView } from "../view/stickyNoteView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";


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
        try {
            const { stickyNote }  = await this.model.add('/stickyNote', sticky);
            this.view.renderOne(stickyNote);
        } catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get() {
        try {
            const { stickyNotes } = await this.model.get(`/stickyNotes`);
            this.view.renderAll(stickyNotes);
        } catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async update(sticky) {
        try {
            const { stickyNote }  = await this.model.update('/stickyNote', sticky);
            this.view.renderUpdate(stickyNote);
        } catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(stickyNoteId) {
        try  {
            await this.model.delete(`/stickyNote/${stickyNoteId}`);
            this.view.renderDelete(stickyNoteId);
        } catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }
}