import { CNode } from "../util/CNode.js";

export class ListNote {
    constructor(id, name, creation, view) {
        this.id = id;
        this.name = name;
        this.creation = creation;
        this.view = view;

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-note', 'id': id});
        this.SPAN = CNode.create('span', {'textContent': name});

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
        this.HOST.addEventListener('click', () => {this.view.handleNoteCardClick(this.id, this.creation)});
    }
}