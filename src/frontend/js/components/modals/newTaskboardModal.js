import { CNode } from "../../util/CNode.js";

export class NewTaskboardModal {
    constructor(controller, taskboardInfo = null) {
        this.controller = controller;
        this.taskboardInfo = taskboardInfo;
        this.dialog = document.querySelector('.dialog');

        this.action = 'add';
        
        this.HOST = CNode.create('div', {'class': 'new-taskboard-modal'});
        this.DIV = document.createElement('div');
        this.NAME_SPAN = CNode.create('span', {'textContent': 'Name'})
        this.DESCRIPTION_SPAN = CNode.create('span', {'textContent': 'Description'})
        this.MODAL_TITLE = CNode.create('h2', {'textContent': 'Add a new taskboard'});
        this.TASKBOARD_NAME = CNode.create('input', {'type': 'text', 'placeholder': 'Give it a name...', 'spellCheck': false});
        this.TASKBOARD_DESCRIPTION = CNode.create('textarea', {'placeholder': 'Type something here...', 'spellCheck': false});
        this.SAVE_BTN = CNode.create('button', {'class': 'save-deck-btn', 'textContent': 'Add'});

        if (taskboardInfo !== null) {
            this.#setTaskboard();
        }

        this.#eventListeners();
        return this.#render();
    }

    #setTaskboard() {
        this.HOST.id = this.taskboardInfo.id;
        this.action = 'update';
        this.MODAL_TITLE.textContent = 'Change taskboard';
        this.SAVE_BTN.textContent = 'Save'
        this.TASKBOARD_NAME.value = this.taskboardInfo.name;        
        this.TASKBOARD_DESCRIPTION.value = this.taskboardInfo.description;
    }


    #eventListeners() {
        this.SAVE_BTN.addEventListener('click', async () => {
            if (this.action == 'add') {
                await this.controller.add({
                    'name': this.TASKBOARD_NAME.value,
                    'description': this.TASKBOARD_DESCRIPTION.value
                })
            }
            else {
                await this.controller.update({
                    "id": this.HOST.id,
                    "name": this.TASKBOARD_NAME.value,
                    "description": this.TASKBOARD_DESCRIPTION.value
                })
            } 
        })
    }


    #render() {
        this.DIV.append(this.NAME_SPAN, this.TASKBOARD_NAME, this.DESCRIPTION_SPAN, this.TASKBOARD_DESCRIPTION)
        this.HOST.append(this.MODAL_TITLE, this.DIV, this.SAVE_BTN);
        return this.HOST;
    }
}