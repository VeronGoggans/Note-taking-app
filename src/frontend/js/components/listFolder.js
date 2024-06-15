import { CNode } from "../util/CNode.js";
import { formatName } from "../util/formatters.js";

export class ListFolder {
    constructor(folder, view, dragAndDrop) {
        this.id = folder.id;
        this.name = folder.name;
        this.view = view;
        this.dragAndDrop = dragAndDrop;


        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-folder droppable', 'id': this.id});
        this.SPAN = CNode.create('span', {'textContent': formatName(this.name)});

        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST;
    }

    #attachEventListeners() {
        //Functionality
        this.HOST.addEventListener('drop', (event) => {this.dragAndDrop.drop(event)});
        this.HOST.addEventListener('dragover', (event) => {this.dragAndDrop.allowDrop(event)});
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id, this.SPAN.textContent)});
    }
} 