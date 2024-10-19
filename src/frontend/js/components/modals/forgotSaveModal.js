import { CNode } from "../../util/CNode.js";
import { dialogEvent } from "../../util/dialog.js";

export class ForgotSaveContainer {
    constructor(view) {
        this.view = view;
        this.HOST = CNode.create('div', {'class': 'dont-forget-to-save-container'});
        this.HOST.innerHTML = `
            <h1>You forgot to save</h1>
            <p>There are unsaved changes</p>
            <div>
                <button class="exit-without-save-btn">Exit</button>
                <button class="exit-with-save-btn">Save</button>
            </div>
        `
        
        this.#eventListeners();
        return this.HOST
    }

    #eventListeners() {
        this.HOST.querySelector('.exit-without-save-btn').addEventListener('click', () => {
            this.view.exitNoSave();
            dialogEvent(this.HOST, 'close');
        });

        this.HOST.querySelector('.exit-with-save-btn').addEventListener('click', () => {
            this.view.exitBySave();
            dialogEvent(this.HOST, 'close');
        });
    }
}