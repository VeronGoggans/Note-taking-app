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
            const CREATED = notes[i].creation;
            const EDIT = notes[i].last_edit;
            const NOTE_CARD = this.note(ID, NAME, BOOKMARK, CONTENT, CREATED, EDIT);
            this._content.appendChild(NOTE_CARD);
        }
    }


    renderNoteCard(note) {
        const ID = note.id;
        const NAME = note.title;
        const BOOKMARK = note.bookmark;
        const CONTENT = note.content;
        const CREATED = note.creation;
        const EDIT = note.last_edit;
        const NOTE_CARD = this.note(ID, NAME, BOOKMARK, CONTENT, CREATED, EDIT);
        this._content.appendChild(NOTE_CARD);
    }

    /**
     * This method updates the note card inside the list div.
     * 
     * @param {dict} note the updated note.
     */
    renderNoteUpdate(note) {
        const ID = note.id;
        const NAME = note.name;
        const NOTE_LIST_CARDS = this._list.children;
        for (let i = 0; i < NOTE_LIST_CARDS.length; i++) {
            if (NOTE_LIST_CARDS[i].id === ID) {
                const SPAN = NOTE_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = NAME;
            }
        }
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


    note(id, name, bookmark, content, created, lastEdit) {
        return new Note(id, name, bookmark, content, created, lastEdit, this);
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
    async updateNote(id, name, content, bookmark) {
        await this.noteController.updateNote(id, name, content, bookmark);
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
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content is the content of the note.
     * @param {String} name is the name/title of the note. 
     */
    handleNoteCardClick(content, name, creation, lastEdit, noteId) {
        this.noteController.handleNoteCardClick(content, name, creation, lastEdit, noteId);
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

