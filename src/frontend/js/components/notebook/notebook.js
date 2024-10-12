import { CNode } from "../../util/CNode.js";


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
        this.EDIT_BUTTON.addEventListener('click', () => {this.dialog.renderNewCollectionModal(this.controller, this.taskboard)})
    }
}