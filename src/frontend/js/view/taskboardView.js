import { TaskboardCard } from "../components/task.js";
import { TaskboardObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";

export class TaskboardView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.taskboardObjects = new TaskboardObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }

    renderAll(taskboards) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < taskboards.length; i++) {
            const taskboard = this.#taskboard(taskboards[i]);
            AnimationHandler.fadeInFromBottom(taskboard)
            contentFragment.appendChild(taskboard);
        }
        this._taskBoardsList.append(contentFragment);
    }

    renderOne(taskboard) {
        const taskboardCard = this.#taskboard(taskboard);
        AnimationHandler.fadeInFromBottom(taskboardCard);
        this._taskBoardsList.appendChild(taskboardCard);
        this.closeDialog();
    }


    renderDelete(taskboardId) {
        const taskboards = this._taskBoardsList.children 
        
        for (let i = 0; i < taskboards.length; i++) {
            if (taskboards[i].id === taskboardId) {
                AnimationHandler.fadeOutCard(taskboards[i])
                this.taskboardObjects.remove(taskboardId);
                this.closeDialog();
            }
        }
    }

    renderUpdate(taskboard) {
        const taskboards = this._taskBoardsList.children; 

        for (let i = 0; i < taskboards.length; i++) {
            if (taskboards[i].id === taskboard.id) {    

                taskboards[i].querySelector('h3').textContent = taskboard.name;
                this.taskboardObjects.update(taskboard);
                this.closeDialog()
            }
        }
    }

    getTaskboardObject(taskboardId) {
        return this.taskboardObjects.get(taskboardId);
    }

    async handleTaskboardCardClick(taskboardId) {
        const taskboard = await this.controller.getById(taskboardId)
        this.applicationController.initView('task', 
            {
                taskboard: taskboard,
                previousView: 'taskboard', 
            }
        );
    }

    #taskboard(taskboard) {
        this.taskboardObjects.add(taskboard);
        return new TaskboardCard(this, taskboard, this.controller, this.dialog);
    }

    #attachEventListeners() {
            this._addNewTaskboardButton.addEventListener('click', () => {this.dialog.renderNewTaskboardModal(this.controller)});
    }

    #initializeDomElements() {
        this.viewElement = document.querySelector('.task-board-home-view');
        this._taskBoardsList = document.querySelector('.task-board-cards');
        this._addNewTaskboardButton = document.querySelector('.add-task-board-btn');  
    }
}