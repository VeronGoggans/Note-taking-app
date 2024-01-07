import { Note } from "../components/note.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { ListNote } from "../components/listNote.js";

export class NoteView {
    constructor(noteController) {
        this.noteController = noteController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-notes');
        this._cover = document.querySelector('.cover');
        this.dialog = document.querySelector('.dialog');
        this.noteObjects = [];
    }

    /**
     * This method renders a lbunch of notes.
     * 
     * This method renders a list of note objects to the content <div>
     * and adds a note object to the noteObjects list for each note.
     * 
     * This method is called by the noteController 
     * when a user clicks on a folder card. 
     * 
     * @param {Array} notes 
     */
    renderNoteCards(notes) {
        for (let i = 0; i < notes.length; i++) {
            const ID = notes[i].id;
            const NAME = notes[i].title;
            const BOOKMARK = notes[i].bookmark;
            const CONTENT = notes[i].content;
            const CREATED = notes[i].creation;
            const EDIT = notes[i].last_edit;
            const LIST_NOTE_CARD = this.listNote(ID, NAME, CREATED);
            const NOTE_CARD = this.note(ID, NAME, BOOKMARK, CONTENT, CREATED, EDIT);
            this._content.appendChild(NOTE_CARD);
            this._list.appendChild(LIST_NOTE_CARD);
        }
    }

    /**
     * This method renders a single not card.
     * 
     * This method renders a single note card to the content <div>
     * and adds a note object to the noteObjects list.
     * 
     * This method is called by the noteController 
     * when a note has been made.
     * 
     * @param {Dict} note 
     */
    renderNoteCard(note) {
        const ID = note.id;
        const NAME = note.title;
        const BOOKMARK = note.bookmark;
        const CONTENT = note.content;
        const CREATED = note.creation;
        const EDIT = note.last_edit;
        const LIST_NOTE_CARD = this.listNote(ID, NAME, CREATED);
        const NOTE_CARD = this.note(ID, NAME, BOOKMARK, CONTENT, CREATED, EDIT);
        this._content.appendChild(NOTE_CARD);
        this._list.appendChild(LIST_NOTE_CARD);
    }

    /**
     * This method updates a note card inside the content <div>.
     * 
     * This method updates a note card and the linked note object
     * in the noteObjects list.
     * 
     * @param {dict} note the updated note.
     */
    renderNoteUpdate(note) {
        const ID = note.id;
        const NAME = note.title;
        const CONTENT = note.content;
        const NOTE_CARDS = this._content.children; 

        // update the note
        for (let i = 0; i < NOTE_CARDS.length; i++) {
            if (NOTE_CARDS[i].id === ID) {
                // updating the <h4> element.
                const H4 = NOTE_CARDS[i].querySelector('h4');
                H4.textContent = NAME;

                // updating the <p> element representing the note content
                const P_ELEMENT = NOTE_CARDS[i].querySelector('p');
                P_ELEMENT.innerHTML = CONTENT;
                this.updateNoteObject(note);
                console.log(this.noteObjects);
            }
        }
    }

    /**
     * This method updates a note object in the noteObjects list.
     * 
     * @param {Dict} note The updated note from the backend 
     * containing the updated note information.
     */
    updateNoteObject(note) {
        const ID = note.id;
        const NAME = note.title;
        const CONTENT = note.content;
        const BOOKMARK = note.bookmark;
        const LAST_EDIT = note.last_edit;

        for (let i = 0; i < this.noteObjects.length; i++) {
            if (this.noteObjects[i].id === ID) {
                this.noteObjects[i].name = NAME;
                this.noteObjects[i].content = CONTENT;
                this.noteObjects[i].bookmark = BOOKMARK;
                this.noteObjects[i].lastEdit = LAST_EDIT;
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

    /**
     * Removes a specific note from the UI.
     *
     * This method removes the note from the UI that it has been given.
     * @param {String} id the ID of the note to be removed from the UI.
     */
    removeNote(note) {
        const ALL_NOTES = this._content.children;
        const ALL_LIST_NOTES = this._list.children;
        const ID = note.id
        for (let i = 0; i < ALL_NOTES.length; i++) {
            if (ALL_NOTES[i].id === ID) {
                this._content.removeChild(ALL_NOTES[i]);
                this._list.removeChild(ALL_LIST_NOTES[i]);
            }
        }
        this.removeDialog();
    }

    /**
     * This method creates a note card component 
     * And add a note object to the noteObjects list. 
     * 
     * @param {String} id 
     * @param {String} name 
     * @param {Boolean} bookmark 
     * @param {String} content 
     * @param {String} created 
     * @param {String} lastEdit 
     * @returns A note card component.
     */
    note(id, name, bookmark, content, created, lastEdit) {
        const NOTE_OBJECT = {'id': id, 'name': name, 'bookmark': bookmark, 'content': content, 'creation': created, 'lastEdit': lastEdit}
        this.noteObjects.push(NOTE_OBJECT);
        return new Note(id, name, bookmark, content, created, lastEdit, this);
    }

    /**
     * This method creates a ListNote component and returns it
     * 
     * @param {String} id The ID of the note
     * @param {String} name The name of the note
     * @param {String} creation The creation date of the note
     * @returns {ListNote} The list note card
     */
    listNote(id, name, creation) {
        return new ListNote(id, name, creation, this);
    }

    /**
     * This method clears the noteObjects list 
     * inside the noteView
     */
    clearNoteObjectsList() {
        this.noteObjects = [];
    }

    // Methods that communicate with the note controller
    // Communicating <---

    /**
     * This method updates a note
     * 
     * This method will communicate with the note controller 
     * to update a note
     * 
     * @param {String} id The ID of the note wished to be updated
     * @param {String} name The new name for the note
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
    handleNoteCardClick(noteId, creation) {
        const NOTE = this.noteObjects.find(obj => obj.id === noteId);
        const NAME = NOTE.name;
        const CONTENT = NOTE.content;
        const BOOKMARK = NOTE.bookmark;
        const LAST_EDIT = NOTE.lastEdit;
        this.noteController.handleNoteCardClick(CONTENT, NAME, creation, LAST_EDIT, noteId, BOOKMARK);
    }
}