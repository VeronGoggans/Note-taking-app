import { CNode } from "../../util/CNode.js";

export class DeleteModal {
    constructor(id, name, notify, view) {
        this.id = id;
        this.notify = notify;
        this.view = view;
        this.HOST = CNode.create('div', {'class': 'delete-modal'});
        this.HOST.innerHTML = `
            <p class="delete-warning">Press Confirm to delete</p>
            <strong class="deleted-item-name">${name}</strong>
            <button>Confirm</button>
        `
        this.#eventListeners();
        return this.HOST;
    }

    #eventListeners() {
        this.HOST.querySelector('button').addEventListener('click', () => {

            if (this.notify) {
                this.view.handleDeleteButtonClick(this.id)
                return
            }
            this.view.deleteObject(this.id)
        })
    }
}