import { Dialog } from "../util/dialog.js"

export class BaseView {
    constructor(controller) {
        this.controller = controller;
        this.dialog = new Dialog()
    }

    renderDeleteModal(id, name, notify = false) {
        this.dialog.renderDeleteModal(this.controller, id, name, notify)
    }
}