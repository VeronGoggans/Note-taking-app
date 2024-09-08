import { CNode } from "../util/CNode.js";


export class TaskboardCard {
    constructor(view, taskboard, controller, dialog) {
        this.view = view 
        this.controller = controller;
        this.dialog = dialog;
        this.taskboard = taskboard

        this.#initializeElements();
        this.#attachEventListeners();
        return this.#render();
    }


    #initializeElements() {
        this.HOST = CNode.create('div', { 'class': 'task-board-card', 'id': this.taskboard.id, 'draggable': true});
        this.TASK_BOARD_NAME = CNode.create('h3', {'textContent': this.taskboard.name});
        this.DIV = document.createElement('div');
        this.DELETE_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-trash"></i>'});
        this.EDIT_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-pen"></i>'});
    }

    #render() {
        this.DIV.append(this.EDIT_BUTTON, this.DELETE_BUTTON)
        this.HOST.append(this.TASK_BOARD_NAME, this.DIV);
        return this.HOST
    }

    #attachEventListeners() {
        this.TASK_BOARD_NAME.addEventListener('click', () => {this.view.handleTaskboardCardClick(this.taskboard.id)})
        this.DELETE_BUTTON.addEventListener('click', () => {this.view.renderDeleteModal(this.taskboard.id, this.taskboard.name)})
        this.EDIT_BUTTON.addEventListener('click', () => {this.dialog.renderNewTaskboardModal(this.controller, this.taskboard)})
    }
}


export class TaskCard {
    constructor(view, task) {
        this.view = view 
        this.id = task.id
        this.name = task.name
        this.dueDate = task.due_date

        this.#initializeElements();
        return this.#render();
    }


    #initializeElements() {
        this.HOST = CNode.create('div', { 'class': 'task', 'id': this.id, 'draggable': true});
        this.TASK_NAME = CNode.create('h3', {'textContent': this.name});
        this.DUE_DATE = CNode.create('p', { 'class': 'due-date', 'textContent': this.dueDate});
    }

    #render() {
        this.HOST.append(this.TASK_NAME, this.DUE_DATE);
        return this.HOST
    }

    #attachEventListeners() {
        
    }
}