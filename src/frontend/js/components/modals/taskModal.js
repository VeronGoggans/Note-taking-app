import { CNode } from "../../util/CNode.js";

export class TaskModal {
    constructor(controller, task = null) {
        this.controller = controller;
        this.task = task;
        this.dialog = document.querySelector('.dialog');

        this.action = 'add';
        this.HOST = CNode.create('div', {'class': 'task-modal'});
        this.HOST.innerHTML = `
            <input type="text" placeholder="Task name">
            <table>
                <tr>
                    <td class="property"><i class="fa-regular fa-clock"></i> Date created</td>
                    <td class="property-value"><span>Today</span></td>
                </tr>
                <tr>
                    <td class="property"><i class="fa-solid fa-circle-info"></i> Status</td>
                    <td class="property-value"><span class="todo-status">To do</span></td>
                </tr>
            </table>
            <p><i class="fa-regular fa-comment"></i> Description</p>
            <textarea class="task-description" placeholder="Type something here..." spellcheck="false"></textarea>
            <button>Add</button>
        ` 

        if (task !== null) {
            this.#setTask();
        }

        this.#attachEventListeners();
        return this.HOST
    }

    #setTask() {
        this.action = 'update';
        this.HOST.querySelector('button').textContent = 'Save'
        this.HOST.querySelector('input').value = this.task.name;        
        this.HOST.querySelector('textarea').value = this.task.description;
    }


    #attachEventListeners() {
        this.HOST.querySelector('button').addEventListener('click', async () => {
            if (this.action == 'add') {
                await this.controller.add({
                    'name': this.HOST.querySelector('input').value,
                    'description': this.HOST.querySelector('textarea').value
                })
            }
            else {
                await this.controller.update({
                    "id": this.HOST.id,
                    "name": this.HOST.querySelector('input').value,
                    "description": this.HOST.querySelector('textarea').value
                })
            } 
        })
    }
}