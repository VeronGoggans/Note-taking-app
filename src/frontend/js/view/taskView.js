import { TaskCard } from "../components/task.js";
import { TaskObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";
import { tagColors, taskBoardSections } from "../constants/constants.js";
import { incrementString, decrementString } from "../util/ui.js";


export class TaskView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.taskbaordId = null;
        this.applicationController = applicationController;
        this.taskObjects = new TaskObjectArray();
        this.#initElements();
        this.#eventListeners();
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
    }


    renderDelete(taskId) {
        const tasks = this.board.querySelectorAll('.task');
        
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == taskId) {
                AnimationHandler.fadeOutCard(tasks[i])
                this.taskObjects.remove(taskId);
            }
        }
    }

    renderUpdate(task) {
        const tasks = this.board.querySelectorAll('.task'); 

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == task.id) {    

                tasks[i].querySelector('h3').textContent = task.name;
                tasks[i].querySelector('p').innerHTML = '<i class="fa-regular fa-clock"></i>' + 'Due ' + task.due_date;
                const tag = tasks[i].querySelectorAll('p')[1];
                
                const newTagColor = tagColors[task.tag];

                tag.innerHTML = '<i class="fa-solid fa-tag"></i> ' + task.tag;
                tag.classList.remove(...tag.classList);
                tag.classList.add(newTagColor);

                this.taskObjects.update(task);
            }
        }
    }



    getTaskObject(taskId) {
        return this.taskObjects.get(taskId);
    }


    /**
     * This method will retrieve the right board section to append 
     * the dropped task to
     * @param {Node} target 
     * @returns 
     */
    #getBoardSection(target) {
        const nodeName = target.nodeName;        
        // If the task dropped on another task. 
        // return the parent node of that task, which is the board itself.
        if (target.classList.contains("task")) {
            return target.parentElement
        }
        else if (nodeName === 'P' || nodeName === 'H3') {
            const task = target.parentElement;
            return task.parentElement
        }
        else if (nodeName === 'I') {
            const P = target.parentElement;
            const task = P.parentElement;
            return task.parentElement;
        }
        return target
    }


    /**
     * 
     * @param {Node} tasksSection 
     */
    updateTaskCounter(tasksSection, operation) {
        const tasksCount = tasksSection.parentElement.querySelector('.board-section-name .task-count');
        
        if (operation === 'add') {
            tasksCount.textContent = incrementString(tasksCount.textContent);
        }
        else if (operation === 'subtract') {
            tasksCount.textContent = decrementString(tasksCount.textContent);
        }
    }


    #task(task) {
        this.taskObjects.add(task);
        return new TaskCard(this, task, this.controller, this.dialog);
    }

    #eventListeners() {
        this.addTaskButton.addEventListener('click', () => {this.dialog.renderTaskModal(this.controller, this.taskbaordId)});
        this.viewElement.addEventListener('PreviousViewButtonClick', () => {this.controller.loadPreviousView()});

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
                const droppedCardId = Number(droppedCardInfo.draggedCardId);
                const draggedItemType = droppedCardInfo.draggedItem;

                if (draggedItemType === 'task') {
                    const boardSection = this.#getBoardSection(event.target);
                    const taskCard = document.getElementById(droppedCardId)
                    boardSection.appendChild(taskCard);

                    // Update the task and send it to the controller
                    const task = this.taskObjects.get(droppedCardId);
                    const section = this.boardSections[i].parentElement.className;
                    task.section = taskBoardSections[section];
                    this.controller.update(task, false); // False to not render the task update.
                }
            });
        }
    }

    #initElements() {
        this.viewElement = document.querySelector('.task-board-view');
        this.toDoSection = document.querySelector('.todo .tasks');
        this.inProgressSection = document.querySelector('.inprogress .tasks');
        this.doneSection= document.querySelector('.done .tasks');
        this.todoCount = document.querySelector('.todo .board-section-name span')
        this.inprogressCount = document.querySelector('.inprogress .board-section-name span')
        this.doneCount = document.querySelector('.done .board-section-name span')
        this.addTaskButton = document.querySelector('.add-task-btn');
        this.board = document.querySelector('.board')
        
        this.boardSections = [this.toDoSection, this.inProgressSection, this.doneSection]
    }
}