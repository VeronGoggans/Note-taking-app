import { CNode } from "../../util/CNode.js";

export class NoteDetailContainer {
    constructor(created, lastEdit) {
        this.editor = document.querySelector('.editor');
        this.HOST = CNode.create('div', {'class': 'note-details-container'});
        this.H2 = CNode.create('h2', {'textContent': 'Note details'});
        this.DETAILS = CNode.create('div', {'class': 'details'});
        this.DETAILS_LEFT = CNode.create('div', {'class': 'details-left'});
        this.P1 = CNode.create('p', {'textContent': 'Words'});
        this.P2 = CNode.create('p', {'textContent': 'Created'});
        this.P3 = CNode.create('p', {'textContent': 'Edit'});
        this.DETAILS_RIGHT = CNode.create('div', {'class': 'details-right'});
        this.P_WORD_COUNT = CNode.create('p', {'textContent': this.#getWordCount()});
        this.P_CREATED = CNode.create('p', {'textContent': this.#checkDateForNull(created)});
        this.P_EDIT = CNode.create('p', {'textContent': this.#checkDateForNull(lastEdit)});
        return this.#render();
    }

    #render() {
        this.DETAILS_LEFT.append(this.P1, this.P2, this.P3);
        this.DETAILS_RIGHT.append(this.P_WORD_COUNT, this.P_CREATED, this.P_EDIT);
        this.DETAILS.append(this.DETAILS_LEFT, this.DETAILS_RIGHT);
        this.HOST.append(this.H2, this.DETAILS);
        return this.HOST
    }

    /**
     * This method checks if the date given is null.
     * 
     * A null value is expected when a user is in the proces of creating a new note
     * within the editor.
     */
    #checkDateForNull(date) {
        return date === null ? 'Not available' : date;
    }

    #getWordCount() {
        let text = this.editor.innerText;
        return text.split(/[ \n]+/).length;
    }
}