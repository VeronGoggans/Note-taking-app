import { CNode } from "../../util/CNode.js";

export class NewFolderContainer {
    constructor(view) {
        this.view = view;

        // Creating HTMl elements
        this.HOST = CNode.create('div', {'class': 'new-folder-container'});
        this.H2 = CNode.create('h2', {'textContent': 'New folder'});
        this.INPUT = CNode.create('input', {'placeholder': 'Folder name', 'spellcheck': false});
        this.BUTTON = CNode.create('button', {'textContent': 'Add'});

        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
        this.BUTTON.addEventListener('click', () => {this.#createNewFolder()});
        this.INPUT.addEventListener('keydown', (event) => {
            // if enter is pressed while the focus is on the input
            // create a new folder and close the modal.
            if (event.key === 'Enter') this.#createNewFolder();
        })
    }

    #render() {
        this.HOST.append(this.H2, this.INPUT, this.BUTTON);
        return this.HOST;
    }

    #createNewFolder() {
        const NAME = this.INPUT.value || 'untitled';
        this.view.addFolder(NAME);
    }
}