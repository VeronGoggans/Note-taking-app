import { Note } from "../components/note.js";
import { DeleteContainer } from "../components/deleteContainer.js";

export class NoteView {
    constructor(noteController) {
        this.noteController = noteController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this.dialog = document.querySelector('.dialog');
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

    /**
     * This method renders a confirmation container telling the user if they want to delete the note.
     * 
     * @param {String} id The ID of the note wished to be deleted.
     * @param {String} name The name of the note wished to be deleted.
     */
    renderDeleteContainer(id, name) {
        this.dialog.appendChild(new DeleteContainer(id, name, this));
        this.renderDialog();
    }

    /**
     * This method renders the dialog.
     */
    renderDialog() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    /**
     * This method removes the child of the dialog and the dialog itself from the UI.
     */
    removeDialog() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        const CHILD = this.dialog.firstChild;
        this.dialog.removeChild(CHILD);
    }


    note(id, name, bookmark, content) {
        return new Note(id, name, bookmark, content, this);
    }

    /**
     * This method updates a note
     * 
     * This method will communicate with the note controller 
     * to update a note.
     * 
     * @param {String} id The ID of the note wished to be updated.
     * @param {String} name The new name for the note.
     */
    async updateNote(id, name) {
        await this.noteController.updateNote(id, name);
    }

    /**
     * This method deletes a note.
     * 
     * This method communicates with the note controller
     * to delete the specified note.
     * 
     * @param {String} id The ID of the note wished to be updated
     */
    async handleConfirmButtonClick(id) {
        await this.noteController.deleteNote(id);
    }

    /**
     * Removes a specific note from the UI.
     *
     * This method removes the note from the UI that it has been given.
     * @param {String} id the ID of the note to be removed from the UI.
     */
    removeNote(note) {
        const ALL_NOTES = this._content.children;
        const ID = note.id
        for (let i = 0; i < ALL_NOTES.length; i++) {
            if (ALL_NOTES[i].id === ID) this._content.removeChild(ALL_NOTES[i]);
        }
        this.removeDialog();
    }
}

