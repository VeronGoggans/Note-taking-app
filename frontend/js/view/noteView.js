import { CNode } from "../util/CNode.js";

export class NoteView {
    constructor(noteController) {
        this.noteController = noteController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
    }

    renderNoteCards(notes) {
        console.log(notes);
        for (let i = 0; i < notes.length; i++) {
            const ID = notes[i].id;
            const NAME = notes[i].title;
            const CONTENT = notes[i].content;
            const NOTE_CARD = this.noteCard(ID, NAME, CONTENT);
            this._content.appendChild(NOTE_CARD);
        }
    }


    renderNoteCard(note) {
        const ID = note.id;
        const NAME = note.title;
        const CONTENT = note.content;
        const NOTE_CARD = this.noteCard(ID, NAME, CONTENT);
        this._content.appendChild(NOTE_CARD);

    }


    noteCard(id, name, content) {
        const HOST = CNode.create('div', {'class': 'note', 'id': id});
        const TITLE_BAR = CNode.create('div', {'class': 'note-title-box'});
        const NOTE_TITLE = CNode.create('h4', {'textContent': name});
        const OPTIONS_ICON = CNode.create('i', {'class': 'fa-solid fa-ellipsis'});
        const CONTENT_BOX = CNode.create('div', {'class': 'note-content-box'});
        const CONTENT = CNode.create('p', {'innerHTML': content});
        const UTIL_BAR = CNode.create('div', {});
        const BOOKMARK_ICON = CNode.create('i', {'class': 'fa-regular fa-bookmark'});

        // Assemble elements.
        HOST.appendChild(TITLE_BAR);
        TITLE_BAR.appendChild(NOTE_TITLE);
        TITLE_BAR.appendChild(OPTIONS_ICON);
        HOST.appendChild(CONTENT_BOX);
        CONTENT_BOX.appendChild(CONTENT);
        CONTENT_BOX.appendChild(UTIL_BAR)
        UTIL_BAR.appendChild(BOOKMARK_ICON);

        // Functionality

        return HOST;
    }


}

