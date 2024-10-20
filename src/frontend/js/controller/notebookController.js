import { HttpModel } from "../model/httpModel.js";
import { NotebookView } from "../view/notebookView.js";

export class NotebookController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    async init(notebook) {
        this.view = new NotebookView(this, this.applicationController);
        this.view.renderNotebook(notebook);
        await this.get()
    }

    async add(notebookItemInfo) {
        const { notebookItem }  = await this.model.add('/notebookItem', notebookItemInfo);
        this.view.renderOne(notebookItem);
    }

    async get() {
        const { notebookItems } = await this.model.get(`/notebookItems`);
        this.view.renderAll(notebookItems);
    }

    async delete(notebookItemId) {
        await this.model.delete(`/notebookItem/${notebookItemId}`);
        this.view.renderDelete(notebookItemId);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();        
        this.applicationController.initView(previousView);
    }
}