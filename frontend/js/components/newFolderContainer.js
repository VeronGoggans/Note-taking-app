import { CNode } from "../util/CNode.js";

export class NewFolderContainer {
    constructor(view) {
        this.view = view;

        // Creating HTMl elements
        this.HOST = CNode.create('div', {'class': 'new-folder-container'});
        this.H2 = CNode.create('h2', {'textContent': 'New folder'});
        this.INPUT = document.createElement('input');
        this.INPUT.placeholder = 'Folder name';
        this.INPUT.spellcheck = false;
        this.BUTTON = CNode.create('button', {'textContent': 'Add'});

        this.attachEventListeners();
        return this.render();
    }

    attachEventListeners() {
        this.BUTTON.addEventListener('click', () => {this.view.handleAddFolderButtonClick(this.INPUT.value)});
    }

    render() {
        this.HOST.appendChild(this.H2);
        this.HOST.appendChild(this.INPUT);
        this.HOST.appendChild(this.BUTTON);
        return this.HOST;
    }
}