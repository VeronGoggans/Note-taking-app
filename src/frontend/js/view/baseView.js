import { Dialog } from "../util/dialog.js";

export class BaseView {
    constructor(controller) {
        this.controller = controller;
        this.dialog = new Dialog()
    }

    renderDeleteModal(id, name, notify = false) {
        this.dialog.renderDeleteModal(id, name, notify, this)
    }

    closeDialog() {
        this.dialog.hide();
    }

    // methods to communicate with the childs controller

    async addObject(object) {
        await this.controller.add(object)
    }

    // False meaning don't notify the user it deleted something.
    async deleteObject(id) {
        await this.controller.delete(id, false);
    }

    async updateObject(object) {
        await this.controller.update(object);
    }
}