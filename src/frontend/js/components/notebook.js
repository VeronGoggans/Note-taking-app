import { CNode } from "../util/CNode.js";


export class NotebookCard {
    constructor(view, notebook, controller, dialog) {
        this.view = view 
        this.controller = controller;
        this.dialog = dialog;
        this.notebook = notebook;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'notebook-card', 'id': this.notebook.id});
        this.NOTEBOOK_NAME = CNode.create('span', {'textContent': this.notebook.name});
        this.DIV = document.createElement('div');
        this.DELETE_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-trash"></i>'});
        this.EDIT_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-pen"></i>'});
    }

    #render() {
        this.DIV.append(this.EDIT_BUTTON, this.DELETE_BUTTON)
        this.HOST.append(this.NOTEBOOK_NAME, this.DIV);
        return this.HOST
    }

    #eventListeners() {
        this.NOTEBOOK_NAME.addEventListener('click', () => {this.view.handleNotebookCardClick(this.taskboard.id)})
        this.DELETE_BUTTON.addEventListener('click', () => {this.view.renderDeleteModal(this.taskboard.id, this.taskboard.name)})
        this.EDIT_BUTTON.addEventListener('click', () => {this.dialog.renderNewTaskboardModal(this.controller, this.taskboard)})
    }
}


export class NotebookItem {
    constructor(view, notebookItem, controller, dialog) {
        this.view = view 
        this.controller = controller;
        this.dialog = dialog;
        this.notebookItem = notebookItem;
        this.id = notebookItem.id
        this.name = notebookItem.name

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'notebook-item', 'id': this.id});
        this.ITEM_NAME = CNode.create('h3', {'textContent': this.name});
    }


    #render() {
        this.HOST.append(this.TASK_NAME, this.DUE_DATE, this.TAG);
        return this.HOST
    }

    #eventListeners() {
    }
}