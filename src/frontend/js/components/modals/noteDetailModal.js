import { CNode } from "../../util/CNode.js";
import { dateFormat } from "../../util/date.js";

export class NoteDetailContainer {
    constructor(noteInfo) {
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
        this.P_CREATED = CNode.create('p', {'textContent': this.#checkDateForNull(noteInfo.creation)});
        this.P_EDIT = CNode.create('p', {'textContent': this.#checkDateForNull(noteInfo.last_edit)});
        return this.#render();
    }

    #render() {
        this.DETAILS_LEFT.append(this.P1, this.P2, this.P3);
        this.DETAILS_RIGHT.append(this.P_WORD_COUNT, this.P_CREATED, this.P_EDIT);
        this.DETAILS.append(this.DETAILS_LEFT, this.DETAILS_RIGHT);
        this.HOST.append(this.H2, this.DETAILS);
        return this.HOST
    }

    #checkDateForNull(date) {
        return date === null ? 'Not available' : dateFormat(date);
    }

    #getWordCount() {
        let text = this.editor.innerText;
        return text.split(/[ \n]+/).length;
    }
}