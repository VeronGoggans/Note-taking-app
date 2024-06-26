import { CNode } from "../../util/CNode.js";

export class DeleteModal {
    constructor(id, name, view) {
        this.id = id;
        this.view = view;
        this.HOST = CNode.create('div', {'class': 'delete-folder-container'});
        this.MESSAGE = CNode.create('p', {'class': 'delete-warning', 'textContent': 'Press Confirm to delete'});
        this.FOLDER_NAME = CNode.create('strong', {'class': 'delete-folder-name', 'textContent': name});
        this.DELETE = CNode.create('button', {'class': 'confirm-delete-folder-btn', 'textContent': 'Confirm'});
        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
        this.DELETE.addEventListener('click', () => {this.view.handleDeleteButtonClick(this.id)})
    }

    #render() {
        this.HOST.append(this.MESSAGE, this.FOLDER_NAME, this.DELETE);
        return this.HOST;
    }
}