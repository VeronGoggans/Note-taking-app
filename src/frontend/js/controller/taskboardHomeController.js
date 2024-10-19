import { HttpModel } from "../model/httpModel.js";
import { TaskboardHomeView } from "../view/taskboardHomeView.js";


export class TaskboardHomeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new TaskboardHomeView(this, this.applicationController);
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