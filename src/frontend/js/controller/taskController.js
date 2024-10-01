import { HttpModel } from "../model/httpModel.js";
import { TaskView } from "../view/taskView.js";

export class TaskController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    async init(taskboard) {
        this.view = new TaskView(this, this.applicationController);
        this.view.renderTaskboard(taskboard)
        // Rendering the tasks
        await this.get(taskboard.id)
    }

    async add(taskInfo) {
        const { task }  = await this.model.add('/task', taskInfo);
        this.view.renderOne(task);
    }


    async get(taskboardId) {
        const { tasks } = await this.model.get(`/tasks/${taskboardId}`);
        this.view.renderAll(tasks);
    }


    async update(updatedTask, renderUpdate = true) {
        const { task }  = await this.model.update('/task', updatedTask);
        if (renderUpdate) {
            this.view.renderUpdate(task);
        }
    }


    async delete(taskId) {
        await this.model.delete(`/task/${taskId}`);
        this.view.renderDelete(taskId);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        console.log(previousView);
        
        this.applicationController.initView(previousView);
    }
}