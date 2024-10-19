class ListItemCard1 extends HTMLElement {
    static get observedAttributes() {
        return ['list-item', 'list-item-type']; 
    }

    constructor() {
        super();
    }

    
    connectedCallback() {
        // Parse the stickyWall JSON attribute
        this.listItem = JSON.parse(this.getAttribute('list-item'));
        this.listItemType = this.getAttribute('list-item-type');
        this.id = this.listItem.id;
        
        this.render();
        this.addEventListeners();
    }


    disconnectedCallback() {
        this.removeEventListeners();
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'list-item') {
            this.listItem = JSON.parse(newValue);
            this.render();
            this.addEventListeners()            
        } 
        else if (name === 'list-item-type') {
            this.listItemType = newValue;
        }
    }
    

    render() {
        this.innerHTML = `
            <span class="list-1-item-name">${this.listItem.name}</span>
            <div class="list-item-card-1-buttons-container">
                <button class="edit-button"><i class="bi bi-pen-fill"></i></button>
                <button class="delete-button"><i class="bi bi-trash3-fill"></i></button>
            </div>
        `;
    }


    addEventListeners() {
        this.querySelector('.list-1-item-name').addEventListener('click', this.handleCardClick.bind(this));
        this.querySelector('.delete-button').addEventListener('click', this.handleDeleteClick.bind(this));
        this.querySelector('.edit-button').addEventListener('click', this.handleEditClick.bind(this));
    }


    removeEventListeners() {
        this.querySelector('.list-1-item-name').removeEventListener('click', this.handleCardClick.bind(this));
        this.querySelector('.delete-button').removeEventListener('click', this.handleDeleteClick.bind(this));
        this.querySelector('.edit-button').removeEventListener('click', this.handleEditClick.bind(this));
    }


    handleCardClick() {
        this.dispatchEvent(new CustomEvent('ListItemCardClick', { detail: { listItem: this.listItem, listItemType: this.listItemType }, bubbles: true }));
    }


    handleDeleteClick() {
        this.dispatchEvent(new CustomEvent('DeleteListItem', { detail: { listItem: this.listItem, listItemType: this.listItemType }, bubbles: true }));
    }


    handleEditClick() {
        this.dispatchEvent(new CustomEvent('UpdateListItem', { detail: { listItem: this.listItem, listItemType: this.listItemType }, bubbles: true }));
    }
}

// Register the custom element
customElements.define('list-item-card-1', ListItemCard1);
