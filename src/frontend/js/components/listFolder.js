import { CNode } from "../util/CNode.js";
import { DragAndDrop } from "../handlers/drag&drop/dragAndDropHandler.js";

export class ListFolder {
    constructor(folder, view, dragAndDrop) {
        this.id = folder.id;
        this.name = folder.name;
        this.view = view;
        this.dragAndDrop = dragAndDrop;


        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-folder droppable', 'id': this.id, 'draggable': 'true'});
        this.SPAN = CNode.create('span', {'textContent': this.name});

        this.attachEventListeners();
        return this.render();
    }

    render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST;
    }

    attachEventListeners() {
        //Functionality
        this.HOST.addEventListener('drop', (event) => {this.dragAndDrop.drop(event)});
        this.HOST.addEventListener('dragover', (event) => {this.dragAndDrop.allowDrop(event)});
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id, this.SPAN.textContent)});
    }

    drop(event) {
        DragAndDrop.drop(event)
    }

    allowDrop(event) {
        DragAndDrop.allowDrop(event);
    }
} 



// This class will be used to tell the user that there are no subfolders in the current folder. 
// This element will be removed when a subfolder has been created.
export class NoFolderMessage {
    constructor() {

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-no-folder'});
        this.SPAN = CNode.create('span', {'textContent': 'No folders'});

        return this.render();
    }

    render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST
    }
}