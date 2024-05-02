import { CNode } from "../util/CNode.js";

export class ListFolder {
    constructor(folder, view, dragAndDrop) {
        this.id = folder.id;
        this.name = folder.name;
        this.view = view;
        this.dragAndDrop = dragAndDrop;


        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-folder droppable', 'id': this.id, 'draggable': 'true'});
        this.SPAN = CNode.create('span', {'textContent': this.name});

        this._attachEventListeners();
        return this._render();
    }

    _render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST;
    }

    _attachEventListeners() {
        //Functionality
        this.HOST.addEventListener('drop', (event) => {this.dragAndDrop.drop(event)});
        this.HOST.addEventListener('dragover', (event) => {this.dragAndDrop.allowDrop(event)});
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id, this.SPAN.textContent)});
    }
} 


// This class will be used to tell the user that there are no subfolders in the current folder. 
// This element will be removed when a subfolder has been created.
export class NoFolderMessage {
    constructor() {
        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-no-folder'});
        this.SPAN = CNode.create('span', {'textContent': 'No folders'});

        return this._render();
    }

    _render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST
    }
}