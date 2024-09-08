import { CNode } from "../../util/CNode.js";

export class NewFolderContainer {
    constructor(view) {
        this.view = view;

        // Creating HTMl elements
        this.HOST = CNode.create('div', {'class': 'new-folder-container'});
        this.HOST.innerHTML = `
            <h2>New folder</h2>
            <input type="text" placeholder="Folder name" spellcheck="false">
            <button>Add</button>
        `

        this.#attachEventListeners();
        return this.HOST;
    }

    #attachEventListeners() {
        this.HOST.querySelector('button').addEventListener('click', () => {this.#createNewFolder()});
        this.HOST.querySelector('input').addEventListener('keydown', (event) => {
            // if enter is pressed while the focus is on the input
            // create a new folder and close the modal.
            if (event.key === 'Enter') this.#createNewFolder();
        })
    }

    #createNewFolder() {
        const name = this.HOST.querySelector('input').value || 'untitled';
        this.view.addObject({'name': name});
    }
}