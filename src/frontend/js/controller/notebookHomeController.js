import { HttpModel } from "../model/httpModel.js";
import { NotebookHomeView } from "../view/notebookHomeView.js";

export class NotebookHomeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new NotebookHomeView(this, this.applicationController);
        await this.get()
    }

    async add(notebookInfo) {
        const { notebook }  = await this.model.add('/notebook', notebookInfo);
        this.view.renderOne(notebook);
    }

    async get() {
        const { notebooks } = await this.model.get(`/notebooks`);
        this.view.renderAll(notebooks);
    }

    async getById(notebookId) {
        const { notebook } = await this.model.get(`/notebook/${notebookId}`);
        return notebook
    }

    async update(updatedNotebook) {
        const { notebook } = await this.model.update('/notebook', updatedNotebook);
        this.view.renderUpdate(notebook);
    }

    async delete(notebookId) {
        await this.model.delete(`/notebook/${notebookId}`);
        this.view.renderDelete(notebookId);
    }
}