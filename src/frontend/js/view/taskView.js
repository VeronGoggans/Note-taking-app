import { TaskCard } from "../components/task.js";
import { TaskObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";

export class TaskView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.taskbaordId = null;
        this.applicationController = applicationController;
        this.taskObjects = new TaskObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }

    renderTaskboard(taskboard) {
        // Setting the name and description for the taskboard
        document.querySelector('.task-board-name').textContent = taskboard.name;
        document.querySelector('.task-board-description').textContent = taskboard.description;
        this.taskbaordId = taskboard.id;
    }


    renderAll(tasks) {
        const todoTasks = document.createDocumentFragment();
        const progressTasks = document.createDocumentFragment();
        const doneTasks = document.createDocumentFragment();
        
        for (let i = 0; i < tasks.length; i++) {
            const task = this.#task(tasks[i]);            
            if (tasks[i].section === 'To do') {
                todoTasks.appendChild(task)
                this.todoCount.textContent = todoTasks.childNodes.length;
            }
            if (tasks[i].section === 'In progress') {
                progressTasks.appendChild(task)
                this.inprogressCount.textContent = progressTasks.childNodes.length;
            } 
            if (tasks[i].section === 'Done') {
                doneTasks.appendChild(task)
                this.doneCount.textContent = doneTasks.childNodes.length;
            } 
            AnimationHandler.fadeInFromSide(task);
        }
        this.toDoSection.append(todoTasks);
        this.inProgressSection.append(progressTasks);
        this.doneSection.append(doneTasks);
    }


    renderOne(task) {
        const taskCard = this.#task(task);
        AnimationHandler.fadeInFromSide(taskCard);
        this.toDoSection.appendChild(taskCard)
        this.closeDialog();
    }


    renderDelete(taskId) {
        const tasks = this.board.querySelectorAll('.task');
        
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == taskId) {
                AnimationHandler.fadeOutCard(tasks[i])
                this.taskObjects.remove(taskId);
                this.closeDialog();
            }
        }
    }

    renderUpdate(task) {
        const tasks = this.board.querySelectorAll('.task'); 

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == task.id) {    

                tasks[i].querySelector('h3').textContent = task.name;
                tasks[i].querySelector('p').innerHTML = '<i class="fa-regular fa-clock"></i>' + 'Due ' + task.due_date;

                this.taskObjects.update(task);
                this.closeDialog()
            }
        }
    }

    getTaskObject(taskId) {
        return this.taskObjects.get(taskId);
    }


    #task(task) {
        this.taskObjects.add(task);
        return new TaskCard(this, task, this.controller, this.dialog);
    }

    #attachEventListeners() {
        this.addTaskButton.addEventListener('click', () => {this.dialog.renderTaskModal(this.controller, this.taskbaordId)});
        this.exitButton.addEventListener('click', () => {this.controller.loadPreviousView()});

        for (let i = 0; i < this.boardSections.length; i++) {
            this.boardSections[i].addEventListener('dragover', (event) => {
                event.preventDefault();
                this.boardSections[i].style.borderColor = '#5c7fdd';
            });

            this.boardSections[i].addEventListener('dragleave', (event) => {
                event.preventDefault();
                this.boardSections[i].style.borderColor = 'transparent';
            });

            this.boardSections[i].addEventListener('drop', (event) => {
                event.preventDefault();
                this.boardSections[i].style.borderColor = 'transparent';
                // Get the id of the element being dragged
                const droppedCardInfo = JSON.parse(event.dataTransfer.getData('text/plain'));
                const droppedCardId = droppedCardInfo.draggedCardId;
                const draggedItemType = droppedCardInfo.draggedItem;
    
                if (draggedItemType === 'task') {
                    const boardSection = event.target
                    const taskCard = document.getElementById(droppedCardId)
                    boardSection.appendChild(taskCard);        
                }
            });
        }
    }

    #initializeDomElements() {
        this.viewElement = document.querySelector('.task-board-view');

        this.toDoSection = document.querySelector('.todo .tasks');
        this.inProgressSection = document.querySelector('.inprogress .tasks');
        this.doneSection= document.querySelector('.done .tasks');
        this.exitButton = document.querySelector('.exit-taskboard-btn');
        this.todoCount = document.querySelector('.todo .board-section-name span')
        this.inprogressCount = document.querySelector('.inprogress .board-section-name span')
        this.doneCount = document.querySelector('.done .board-section-name span')
        this.addTaskButton = document.querySelector('.add-task-btn');
        this.board = document.querySelector('.board')
        
        this.boardSections = [this.toDoSection, this.inProgressSection, this.doneSection]
    }
}