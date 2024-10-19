import { CNode } from "../util/CNode.js";
import { addDraggImage } from "../util/ui.js";
import { tagColors } from "../constants/constants.js";



export class TaskCard {
    constructor(view, task, controller, dialog) {
        this.view = view 
        this.controller = controller;
        this.dialog = dialog;
        this.task = task;
        this.id = task.id
        this.name = task.name
        this.dueDate = task.due_date        
        this.section = task.section
        this.tag = task.tag
        this.tagColor = tagColors[this.tag]

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'task', 'id': this.id, 'draggable': true});
        this.TASK_NAME = CNode.create('h3', {'textContent': this.name});
        this.DUE_DATE = CNode.create('p', { 'class': 'due-date', 'innerHTML': '<i class="bi bi-clock"></i>' + 'Due ' + this.dueDate });
        this.TAG = CNode.create('p', {'class': this.tagColor, 'innerHTML': '<i class="bi bi-tag-fill"></i> ' + this.tag})
    }


    #render() {
        this.HOST.append(this.TASK_NAME, this.DUE_DATE, this.TAG);
        return this.HOST
    }

    #eventListeners() {

        this.HOST.addEventListener('click', () => {
            this.dialog.renderTaskModal(this.controller, null, this.task)
        })
        // Drag and drop event listeners below.
        this.HOST.addEventListener('dragstart', (event) => {
            addDraggImage(event, this.HOST, 'thumbtack')
            event.dataTransfer.setData('text/plain', `{"draggedItem": "task", "draggedCardId": "${this.id}"}`)
        }); 

        // Remove the drag style when done dragging
        this.HOST.addEventListener('dragend', () => {this.HOST.classList.remove('dragging')})
    }
}