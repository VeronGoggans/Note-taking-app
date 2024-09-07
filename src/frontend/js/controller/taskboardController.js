import { HttpModel } from "../model/httpModel.js";
import { TaskView } from "../view/taskboardView.js";

export class TaskboardController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    async init(taskboard) {
        this.view = new TaskView(this, this.applicationController);
        this.view.renderTaskboard(taskboard)
    }

    async add(taskInfo) {
        const { task }  = await this.model.add('/task', taskInfo);
        this.view.renderOne(task);
    }


    async get() {
        const { tasks } = await this.model.get(`/tasks`);
        this.view.renderAll(tasks);
    }


    async update(updatedTask) {
        const { task }  = await this.model.update('/task', updatedTask);
        this.view.renderUpdate(task);
    }


    async delete(taskId) {
        await this.model.delete(`/task/${taskId}`);
        this.view.renderDelete(taskId);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }
}