import { Dialog } from "../util/dialog.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js"

export class BaseView {
    constructor(controller) {
        this.controller = controller;
        this.notificationHandler = new NotificationHandler();
        this.dialog = new Dialog()
    }

    renderDeleteModal(id, name) {
        this.dialog.renderDeleteModal(id, name, this)
    }

    pushNotification(type, noteName = null) {
        this.notificationHandler.push(type, noteName);
    }

    closeDialog() {
        this.dialog.hide();
    }

    
    async deleteObject(id) {
        await this.controller.delete(id);
    }

    async updateObject(object) {
        await this.controller.update(object);
    }
}