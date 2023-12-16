import { CNode } from "../util/CNode.js";

export class ListFolder {
    constructor(id, name, view) {
        this.id = id;
        this.name = name;
        this.view = view;

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-folder', 'id': id});
        this.SPAN = CNode.create('span', {'class': 'folder-name', 'textContent': name});

        
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
        this.HOST.addEventListener('click', () => { this.view.handleFolderCardClick(this.id)});
    }


}