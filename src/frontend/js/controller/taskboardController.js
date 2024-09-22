import { HttpModel } from "../model/httpModel.js";
import { TaskboardView } from "../view/taskboardView.js";


export class TaskBoardController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new TaskboardView(this, this.applicationController);
        await this.get()
    }

    async add(taskboardInfo) {
        const { taskboard }  = await this.model.add('/taskboard', taskboardInfo);
        this.view.renderOne(taskboard);
    }


    async get() {
        const { taskboards } = await this.model.get(`/taskboards`);
        this.view.renderAll(taskboards);
    }


    async getById(taskboardId) {
        const { taskboard } = await this.model.get(`/taskboard/${taskboardId}`);
        return taskboard
    }


    async update(updatedTaskboard) {
        await this.model.update('/taskboard', updatedTaskboard);
        this.view.renderUpdate(updatedTaskboard);
    }


    async delete(taskboardId) {
        await this.model.delete(`/taskboard/${taskboardId}`);
        this.view.renderDelete(taskboardId);
    }
}