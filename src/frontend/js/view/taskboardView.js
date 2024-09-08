import { TaskCard } from "../components/task.js";
import { TaskObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";

export class TaskView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.taskObjects = new TaskObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }

    renderTaskboard(taskboard) {
        document.querySelector('.task-board-name').textContent = taskboard.name;
        document.querySelector('.task-board-description').textContent = taskboard.description;
        this.#renderAll(taskboard.todo, this.toDoSection, this.todoCount)
        this.#renderAll(taskboard.inprogress, this.inProgressSection, this.inprogressCount)
        this.#renderAll(taskboard.done, this.doneSection, this.doneCount)
    }


    #renderAll(tasks, boardSection, countSpan) {
        const contentFragment = document.createDocumentFragment();

        countSpan.textContent = tasks.length
        for (let i = 0; i < tasks.length; i++) {
            const taskboard = this.#task(tasks[i]);
            contentFragment.appendChild(taskboard);
        }
        boardSection.append(contentFragment);
    }


    renderOne(task) {
        const taskCard = this.#task(task);
        AnimationHandler.fadeInFromBottom(taskCard);
        this._taskBoardsList.appendChild(taskCard);
        this.closeDialog();
    }


    renderDelete(taskboardId) {
        const taskboards = this._taskBoardsList.children 
        
        for (let i = 0; i < taskboards.length; i++) {
            if (taskboards[i].id === taskboardId) {
                AnimationHandler.fadeOutCard(taskboards[i])
                this.taskObjects.remove(taskboardId);
                this.closeDialog();
            }
        }
    }

    renderUpdate(stickyNote) {
        const stickyNotes = this._stickyWall.children 

        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id === stickyNote.id) {    

                stickyNotes[i].querySelector('p').innerHTML = captureNewLines(stickyNote.content);
                stickyNotes[i].querySelector('h3').textContent = stickyNote.name;

                this.taskObjects.update(stickyNote);
            }
        }
    }

    getTaskboardObject(taskboardId) {
        return this.taskObjects.get(taskboardId);
    }

    handleTaskboardCardClick(taskboardId) {
        const taskboard = this.taskObjects.get(taskboardId);
        this.applicationController.initView('taskboard', 
            {
                taskboard: taskboard,
                previousView: 'taskboardHome', 
            }
        );
    }

    #task(task) {
        this.taskObjects.add(task);
        return new TaskCard(this, task, this.controller, this.dialog);
    }

    #attachEventListeners() {
        this.addTaskButton.addEventListener('click', () => {this.dialog.renderTaskModal(this.controller)});
        this.exitButton.addEventListener('click', () => {this.controller.loadPreviousView()})
    }

    #initializeDomElements() {
        this.viewElement = document.querySelector('.task-board-view');
        this.toDoSection = document.querySelector('.todo .tasks');
        this.inProgressSection = document.querySelector('.inprogress .tasks');
        this.doneSection= document.querySelector('.done .tasks');
        this.exitButton = document.querySelector('.exit-taskboard-btn');
        this.todoCount = document.querySelector('.todo .board-section-name span')
        this.inprogressCount = document.querySelector('.inprogress .board-section-name span')
        this.doneCount = document.querySelector('.done .board-section-name span')
        this.addTaskButton = document.querySelector('.add-task-btn');
        // this._taskBoardsList = document.querySelector('.task-board-cards');
        // this._addNewTaskboardButton = document.querySelector('.add-task-board-btn');  
    }
}