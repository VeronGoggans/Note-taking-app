import { CNode } from "../../util/CNode.js";
import { DropdownHelper } from "../../helpers/dropdownHelper.js";


export class TaskModal {
    constructor(controller, taskboardId, task = null) {
        this.controller = controller;
        this.task = task;
        this.taskboardId = taskboardId;
        this.dialog = document.querySelector('.dialog');

        this.action = 'add';
        this.HOST = CNode.create('div', {'class': 'task-modal'});
        this.HOST.innerHTML = `
            <input class="task-name-input" type="text" placeholder="Task name" spellcheck="false">
            <table>
                <tr>
                    <td class="property"><i class="bi bi-clock"></i> Due date</td>
                    <td class="property-value"><input type="date"></td>
                </tr>
                <tr>
                    <td class="property"><i class="bi bi-info-circle"></i> Status</td>
                    <td class="property-value"><span id="task-status" class="todo-status">To do</span></td>
                </tr>
                <tr>
                    <td class="property"><i class="bi bi-tag"></i> Tag</td>
                    <td class="property-value">
                        <div class="task-tags-dropdown">
                            <input class="tags-input" type="text" placeholder="Tags" spellcheck="false">
                            <ul class="dropdown-items">
                                <li data-task-type="feature">Feature</li>
                                <li data-task-type="task">Task</li>
                                <li data-task-type="documentation">Documentation</li>
                                <li data-task-type="bug">Bug</li>
                                <li data-task-type="testing">Testing</li>
                                <li data-task-type="user-story">User story</li>
                                <li data-task-type="enabler-story">Enabler story</li>
                                <li data-task-type="learning-story">Learning story</li>
                                <li data-task-type="research-story">Research story</li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
            <p><i class="bi bi-chat-left-text"></i> Description</p>
            <textarea class="task-description" placeholder="Type something here..." spellcheck="false"></textarea>
            <button class="add-task-btn">Add</button>
            <button class="delete-task-btn">Delete</button>
        ` 

        if (task !== null) {
            this.#setTask();
        }
        this.tagsInput = this.HOST.querySelector('.task-tags-dropdown input');       
        this.tagsDropdownOptions = this.HOST.querySelector('.task-tags-dropdown ul');
        this.tagsDropdownOptions.style.left = '150px';
        this.dropdownHelper = new DropdownHelper(this, [this.tagsInput], [this.tagsDropdownOptions]);

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
        this.HOST.querySelector('.tags-input').value = this.task.tag;
    }

    #toggleDropdownClass() {
        if (this.tagsDropdownOptions.classList.contains('tags-input-open')) {
            this.tagsDropdownOptions.classList.remove('tags-input-open');
        } else {
            this.tagsDropdownOptions.classList.add('tags-input-open');
        }
    }


    #attachEventListeners() {
        this.HOST.querySelector('.add-task-btn').addEventListener('click', async () => {
            if (this.action == 'add') {
                await this.controller.add({
                    'parent_id': this.taskboardId,
                    'name': this.HOST.querySelector('input[type="text"]').value || 'Untitled',
                    'description': this.HOST.querySelector('textarea').value,
                    'due_date': this.HOST.querySelector('input[type="date"]').value || 'No deadline set',
                    'tag': this.HOST.querySelector('.tags-input').value || 'Task'
                })
            }
            else {
                await this.controller.update({
                    "id": this.task.id,
                    "name": this.HOST.querySelector('input[type="text"]').value,
                    "description": this.HOST.querySelector('textarea').value,
                    'due_date': this.HOST.querySelector('input[type="date"]').value,
                    'section': this.HOST.querySelector('#task-status').textContent,
                    'tag': this.HOST.querySelector('.tags-input').value
                })
            } 
        })
        this.HOST.querySelector('.delete-task-btn').addEventListener('click', async () => {
            await this.controller.delete(this.task.id)
        })

        // The task tags input eventlisteners below
        this.tagsInput.addEventListener('click', () => {
            this.#toggleDropdownClass()
        })

        this.tagsDropdownOptions.querySelectorAll('li').forEach(tag => {
            tag.addEventListener('click', () => {
                this.#toggleDropdownClass();
                this.dropdownHelper.closeDropdowns()
                this.tagsInput.value = tag.textContent;
            })
        })
    }
}