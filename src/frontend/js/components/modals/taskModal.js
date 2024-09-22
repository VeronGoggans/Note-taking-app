import { CNode } from "../../util/CNode.js";

export class TaskModal {
    constructor(controller, taskboardId, task = null) {
        this.controller = controller;
        this.task = task;
        this.taskboardId = taskboardId;
        this.dialog = document.querySelector('.dialog');

        this.action = 'add';
        this.HOST = CNode.create('div', {'class': 'task-modal'});
        this.HOST.innerHTML = `
            <input type="text" placeholder="Task name" spellcheck="false">
            <table>
                <tr>
                    <td class="property"><i class="fa-regular fa-clock"></i> Due date</td>
                    <td class="property-value"><input type="date"></td>
                </tr>
                <tr>
                    <td class="property"><i class="fa-solid fa-circle-info"></i> Status</td>
                    <td class="property-value"><span id="task-status" class="todo-status">To do</span></td>
                </tr>
            </table>
            <p><i class="fa-regular fa-comment"></i> Description</p>
            <textarea class="task-description" placeholder="Type something here..." spellcheck="false"></textarea>
            <button class="add-task-btn">Add</button>
            <button class="delete-task-btn">Delete</button>
        ` 

        if (task !== null) {
            this.#setTask();
        }

        this.#attachEventListeners();
        return this.HOST
    }

    #setTask() {
        this.action = 'update';
        this.HOST.querySelector('.delete-task-btn').style.visibility = 'visible'        
        this.HOST.querySelector('.add-task-btn').textContent = 'Save'
        this.HOST.querySelector('input[type="text"]').value = this.task.name;        
        this.HOST.querySelector('textarea').value = this.task.description;
        this.HOST.querySelector('input[type="date"]').value = this.task.due_date;
    }


    #attachEventListeners() {
        this.HOST.querySelector('.add-task-btn').addEventListener('click', async () => {
            if (this.action == 'add') {
                await this.controller.add({
                    'parent_id': this.taskboardId,
                    'name': this.HOST.querySelector('input[type="text"]').value || 'Untitled',
                    'description': this.HOST.querySelector('textarea').value,
                    'due_date': this.HOST.querySelector('input[type="date"]').value || 'No deadline set'
                })
            }
            else {
                await this.controller.update({
                    "id": this.task.id,
                    "name": this.HOST.querySelector('input[type="text"]').value,
                    "description": this.HOST.querySelector('textarea').value,
                    'due_date': this.HOST.querySelector('input[type="date"]').value,
                    'section': this.HOST.querySelector('#task-status').textContent
                })
            } 
        })
        this.HOST.querySelector('.delete-task-btn').addEventListener('click', async () => {
            await this.controller.delete(this.task.id)
        })
    }
}