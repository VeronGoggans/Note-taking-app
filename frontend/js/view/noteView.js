import { Note } from "../components/note.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { ListNote, NoNoteMessage } from "../components/listNote.js";
import { HTMLArray, NoteObjectArray } from "../util/array.js";
import { Dialog } from "../util/dialog.js";
import { UserFeedbackHandler } from "../handlers/notificationHandler.js";

export class NoteView {
    constructor(noteController) {
        this.noteController = noteController;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-notes');
        this._cover = document.querySelector('.cover');
        this.userFeedbackHandler = new UserFeedbackHandler();
        this.dialog = new Dialog();
        this.noteObjects = new NoteObjectArray();
    }

    /**
     * This method renders a bunch of notes.
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
        // clear the array everytime this method gets called.
        this.noteObjects.clear();
        if (notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                const NOTE = notes[i];

                const LIST_NOTE_CARD = this.listNote(NOTE);
                const NOTE_CARD = this.note(NOTE);

                this._content.appendChild(NOTE_CARD);
                this._list.appendChild(LIST_NOTE_CARD);
            }
        } else {
            this.userFeedbackHandler.noNotes(new NoNoteMessage());
        }
    }

    /**
     * This method renders a single not card.
     * 
     * This method renders a single note card to the content div
     * and adds a note object to the noteObjects array.
     * 
     * This method is called by the noteController 
     * when a note has been made.
     * 
     * @param {Dict} note 
     */
    renderNoteCard(note) {
        // Checking if the list-view html element currently says "no notes"
        if (this.noteObjects.size() === 0) {
            this.userFeedbackHandler.removeNoNotesMessage();
        }
        // Creating the html for the note
        const LIST_NOTE_CARD = this.listNote(note);
        const NOTE_CARD = this.note(note);

        // Adding the note html cards to the screen
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
        const NOTE_CARDS = new HTMLArray(this._content.children, 'note'); 
        const NOTE_LIST_CARDS = this._list.children;

        for (let i = 0; i < NOTE_CARDS.length; i++) {
            if (NOTE_CARDS[i].id === ID) {
                // updating the h4 element inside the note card.
                const H4 = NOTE_CARDS[i].querySelector('h4');
                H4.textContent = NAME;

                // updating the p element inside the note card.
                const P_ELEMENT = NOTE_CARDS[i].querySelector('p');
                P_ELEMENT.innerHTML = CONTENT;

                // updating the span element inside the note list card
                const SPAN = NOTE_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = NAME;

                // updating the note object 
                this.noteObjects.update(note);
            }
        }
    }

    /**
     * Removes a specific note from the UI.
     *
     * This method removes the note from the UI that it has been given.
     * @param {String} id the ID of the note to be removed from the UI.
     */
    removeNote(note) {
        const ALL_NOTES = new HTMLArray(this._content.children, 'note');
        const ALL_LIST_NOTES = this._list.children;
        const ID = note.id

        for (let i = 0; i < ALL_NOTES.length; i++) {
            if (ALL_NOTES[i].id === ID) {
                // Removing the html related to the given note 
                this._content.removeChild(ALL_NOTES[i]);
                this._list.removeChild(ALL_LIST_NOTES[i]);
                // Removing the note object 
                this.noteObjects.remove(note);
                // Checking if the note object array is empty
                if (this.noteObjects.size() === 0) {
                    this.userFeedbackHandler.noNotes(new NoNoteMessage());
                }
            }
        }
        this.dialog.hide();
    }

    /**
     * This method creates a note card component 
     * And adds a note object to the noteObjects array. 
     * 
     * @param {Dict} note 
     * @returns A note card component.
     */
    note(note) {
        this.noteObjects.add(note);
        return new Note(note, this);
    }

    /**
     * This method creates a ListNote component and returns it
     * 
     * @param {Dict} note
     * @returns {ListNote} The list note card
     */
    listNote(note) {
        return new ListNote(note, this);
    }

    /**
     * This method checks if the "No notes" text is still 
     * in the list view when a new note gets created.
     * If so it removes that text from the list view.
     * If the text is already gone it does nothing.
     */
    test() {
        if (this.noteObjects.length === 0) {
            this._list.removeChild();
        }
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the note.
     * 
     * @param {String} id The ID of the note wished to be deleted.
     * @param {String} name The name of the note wished to be deleted.
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new DeleteContainer(id, name, this));
        this.dialog.show();
    }

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
    handleNoteCardClick(noteId, creation, lastEdit) {
        const NOTE = this.noteObjects.get(noteId);
        const NAME = NOTE.name;
        const CONTENT = NOTE.content;
        const BOOKMARK = NOTE.bookmark;
        this.noteController.handleNoteCardClick(CONTENT, NAME, creation, lastEdit, noteId, BOOKMARK);
    }
}