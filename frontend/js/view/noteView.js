import { Note } from "../components/note.js";

export class NoteView {
    constructor(noteController) {
        this.noteController = noteController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this._notes = [];
    }

    renderNoteCards(notes) {
        for (let i = 0; i < notes.length; i++) {
            const ID = notes[i].id;
            const NAME = notes[i].title;
            const BOOKMARK = notes[i].bookmark;
            const CONTENT = notes[i].content;
            const NOTE_CARD = this.note(ID, NAME, BOOKMARK, CONTENT);
            this._content.appendChild(NOTE_CARD);
        }
    }


    renderNoteCard(note) {
        const ID = note.id;
        const NAME = note.title;
        const BOOKMARK = note.bookmark;
        const CONTENT = note.content;
        const NOTE_CARD = this.noteCard(ID, NAME, BOOKMARK, CONTENT);
        this._content.appendChild(NOTE_CARD);
    }


    note(id, name, bookmark, content) {
        return new Note(id, name, bookmark, content, this);
    }
}

