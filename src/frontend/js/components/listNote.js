import { CNode } from "../util/CNode.js";
import { formatName } from "../util/formatters.js";

export class ListNote {
    constructor(note, view, dragAndDrop) {
        this.id = note.id;
        this.name = note.title;
        this.creation = note.creation;
        this.view = view;
        this.dragAndDrop = dragAndDrop;

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-note', 'id': this.id, 'draggable': 'true'});
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
        this.HOST.addEventListener('click', () => {this.view.handleNoteCardClick(this.id, this.creation)});
        this.HOST.addEventListener('dragstart', (event) => {this.dragAndDrop.drag(event)});
    }
}

// This class will be used to tell the user that there are no notes in the current folder. 
// This element will be removed when a note has been created.
export class NoNoteMessage {
    constructor() {

        // Creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'list-view-no-note'});
        this.SPAN = CNode.create('span', {'textContent': 'No notes'});

        return this.#render();
    }

    #render() {
        // Assemble elements.
        this.HOST.appendChild(this.SPAN);
        return this.HOST
    }
}