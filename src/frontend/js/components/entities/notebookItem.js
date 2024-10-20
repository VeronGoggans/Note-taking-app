import { notebookItemIcons } from "../../constants/constants";


class NotebookItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.notebookItem = JSON.parse(this.getAttribute('notebookItem'));
        this.id = this.notebookItem.id;
        
        this.render();
        this.addEventListener('click', this.handleCardClick.bind(this));
    }

    
    disconnectedCallback() {
        this.removeEventListener('click', this.handleCardClick.bind(this));
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'notebookItem') {
            this.notebookItem = JSON.parse(newValue);
            this.render();
        }
    }

    render() {
        this.innerHTML = `
            <div class="item-info">
                <i id="notebook-template-icon" class="${notebookItemIcons[this.notebookItem.linked_entity_type]}"></i>
                <span class="item-title">${this.notebookItem.linked_entity_name}</span>
            </div>
            <div class="item-options">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;
    }

    handleCardClick() {
        this.dispatchEvent(new CustomEvent('NotebookItemCardClick', { detail: { notebookItem: this.notebookItem }, bubbles: true}));
    }
}

customElements.define('notebook-item-card', NotebookItem);