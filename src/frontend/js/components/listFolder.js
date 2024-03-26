import { CNode } from "../util/CNode.js";

export class ListFolder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name;
        this.view = view;

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-folder', 'id': this.id, 'draggable': 'true'});
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
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id)});
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