import { CNode } from "../util/CNode.js";

export class NoteDetailContainer {
    constructor(created, edit) {
        this.editor = document.querySelector('.editor');
        this.HOST = CNode.create('div', {'class': 'note-details-container'});
        this.H2 = CNode.create('h2', {'textContent': 'Note details'});
        this.DETAILS = CNode.create('div', {'class': 'details'});
        this.DETAILS_LEFT = CNode.create('div', {'class': 'details-left'});
        this.P1 = CNode.create('p', {'textContent': 'Words'});
        this.P2 = CNode.create('p', {'textContent': 'Created'});
        this.P3 = CNode.create('p', {'textContent': 'Edit'});
        this.DETAILS_RIGHT = CNode.create('div', {'class': 'details-right'});
        this.P_WORD_COUNT = CNode.create('p', {'textContent': this._getWordCount()});
        this.P_CREATED = CNode.create('p', {});
        this.P_EDIT = CNode.create('p', {});
        return this.render();
    }

    render() {
        this.HOST.appendChild(this.H2);
        this.HOST.appendChild(this.DETAILS)
        this.DETAILS.appendChild(this.DETAILS_LEFT);
        this.DETAILS_LEFT.appendChild(this.P1);
        this.DETAILS_LEFT.appendChild(this.P2);
        this.DETAILS_LEFT.appendChild(this.P3);
        this.DETAILS.appendChild(this.DETAILS_RIGHT);
        this.DETAILS_RIGHT.appendChild(this.P_WORD_COUNT);
        this.DETAILS_RIGHT.appendChild(this.P_CREATED);
        this.DETAILS_RIGHT.appendChild(this.P_EDIT);
        return this.HOST
    }

    _getWordCount() {
        let text = this.editor.innerText;
        return text.split(/[ \n]+/).length;
    }
}