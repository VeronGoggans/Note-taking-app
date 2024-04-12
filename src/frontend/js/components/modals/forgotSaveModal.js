import { CNode } from "../../util/CNode.js";

export class ForgotSaveContainer {
    constructor(view) {
        this.view = view;
        this.HOST = CNode.create('div', {'class': 'dont-forget-to-save-container'});
        this.H1 = CNode.create('h1', {'textContent': 'You forgot to save'});
        this.P = CNode.create('p', {'textContent': 'There are unsaved changes'});
        this.SAVE_OPTIONS = CNode.create('div', {'class': 'save-options'});
        this.EXIT = CNode.create('button', {'class': 'exit-without-save-btn', 'textContent': 'Exit'});
        this.SAVE = CNode.create('button', {'class': 'exit-with-save-btn', 'textContent': 'Save'});
        
        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
        this.EXIT.addEventListener('click', () => {this.view.exitNoSave()});
        this.SAVE.addEventListener('click', () => {this.view.exitBySave()});
    }

    #render() {
        this.HOST.appendChild(this.H1);
        this.HOST.appendChild(this.P);
        this.HOST.appendChild(this.SAVE_OPTIONS);
        this.SAVE_OPTIONS.appendChild(this.EXIT);
        this.SAVE_OPTIONS.appendChild(this.SAVE);
        return this.HOST;
    }
}