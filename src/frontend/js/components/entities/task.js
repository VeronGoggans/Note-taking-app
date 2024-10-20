import { addDraggImage } from "../../util/ui.js";
import { tagColors } from "../../constants/constants.js";


class TaskCard extends HTMLElement {
    static get observedAttributes() {
        return ['task']; 
    }

    constructor() {
        super();
    }

    
    connectedCallback() {
        this.task = JSON.parse(this.getAttribute('task'));
        this.id = this.task.id;
        this.draggable = true;
        this.dragInfo = {"draggedTask": this.task, "itemType": 'task'}

        this.render();
        this.addEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'task') {
            this.task = JSON.parse(newValue);
            this.render();
        }
    }


    render() {
        this.innerHTML = `
            <h3>${this.task.name}</h3>
            <p class="due-date">
                <i class="bi bi-clock"></i>
                Due ${this.task.due_date}
            </p>
            <p class="${tagColors[this.task.tag]}">
                <i class="bi bi-tag-fill"></i>
                ${this.task.tag}
            </p>
        `;
    }


    addEventListeners() {
        this.addEventListener('click', this.handleCardClick.bind(this));
        this.addEventListener('dragstart', (event) => {this.dragStart(event)}); 
        this.addEventListener('dragend', () => {this.dragEnd()});
    }


    removeEventListeners() {
        this.removeEventListener('click', this.handleCardClick.bind(this));
    }


    dragStart(event) {
        addDraggImage(event, this, 'thumbtack')
        event.dataTransfer.setData('text/plain', JSON.stringify(this.dragInfo));
    }


    dragEnd() {
        this.classList.remove('dragging')
    }


    handleCardClick() {        
        console.log('press');
        
        this.dispatchEvent(new CustomEvent('TaskCardClick', { detail: { task: this.task }, bubbles: true }));
    }
}

customElements.define('task-card', TaskCard);