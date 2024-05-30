import { Note } from "../components/note.js";
import { NoteDeleteModal } from "../components/modals/noteDeleteModal.js";
import { ListNote, NoNoteMessage } from "../components/listNote.js";
import { HTMLArray, NoteObjectArray } from "../util/array.js";
import { NoContentFeedbackHandler } from "../handlers/userFeedback/noContentFeedbackHandler.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview } from "../util/formatters.js";
import {AnimationHandler} from "../handlers/animation/animationHandler.js";
import { DragAndDrop } from "../handlers/drag&drop/dragAndDropHandler.js";


export class NoteView {
    constructor(noteController, applicationController, dialog, notificationHandler) {
        this.noteController = noteController;
        this.applicationController = applicationController;
        this.notificationHandler = notificationHandler;
        this.dialog = dialog;
        this.noContentFeedbackHandler = new NoContentFeedbackHandler(this);
        this.noteObjects = new NoteObjectArray();
        this.dragAndDrop = new DragAndDrop(this);

        this.#initializeDomElements();
    }

    /** 
     * This method renders an array of note objects to the UI
     * and adds a note object to the noteObjects array for each note.
     * 
     * This method is called by the noteController 
     * when a user clicks on a folder card. 
     * 
     * @param {Array} notes 
     */
    renderNoteCards(notes) {
        const startTime = performance.now();
        this.noteObjects.clear();
        if (notes.length > 0) { 
            const contentFragment = document.createDocumentFragment();
            const listFragment = document.createDocumentFragment();

            for (let i = 0; i < notes.length; i++) {
                const NOTE_CARD = this.#note(notes[i]);
                const LIST_NOTE_CARD = this.#listNote(notes[i]);

                contentFragment.appendChild(NOTE_CARD);
                listFragment.appendChild(LIST_NOTE_CARD);
                AnimationHandler.fadeInFromBottom(NOTE_CARD);
                AnimationHandler.fadeInFromBottom(LIST_NOTE_CARD);
            }
            this._content.appendChild(contentFragment);
            this._list.appendChild(listFragment);
        } else {
            this.noContentFeedbackHandler.noNotes(new NoNoteMessage());
        }
        const endTime = performance.now(); // End time
        console.log(`renderNoteCards execution time: ${endTime - startTime} milliseconds`);
    }

    /**
     * This method renders a single note card to the UI
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
            this.noContentFeedbackHandler.removeNoNotesMessage();
        }
        const LIST_NOTE_CARD = this.#listNote(note);
        const NOTE_CARD = this.#note(note);

        this._content.appendChild(NOTE_CARD);
        this._list.appendChild(LIST_NOTE_CARD);
        AnimationHandler.fadeInFromBottom(NOTE_CARD);
        AnimationHandler.fadeInFromSide(LIST_NOTE_CARD);
    }

    /** 
     * This method updates a note card and the linked note object
     * in the noteObjects array.
     * 
     * @param {dict} note
     */
    renderNoteUpdate(note) {
        const NOTE_CARDS = new HTMLArray(this._content.children, 'note'); 
        const NOTE_LIST_CARDS = this._list.children;

        for (let i = 0; i < NOTE_CARDS.length; i++) {
            if (NOTE_CARDS[i].id === note.id) {
                // updating the p element inside the note card.
                const P_ELEMENT = NOTE_CARDS[i].querySelector('p');
                P_ELEMENT.innerHTML = filterNotePreview(note.content);

                // updating the span element inside the note list card
                const SPAN = NOTE_LIST_CARDS[i].querySelector('span');
                SPAN.textContent = formatName(note.title);

                // updating the h4 element inside the note card.
                const H4 = NOTE_CARDS[i].querySelector('h4');
                H4.textContent = formatName(note.title);

                NOTE_CARDS[i].setAttribute("data-info", `${dateFormat(note.creation)}--${dateFormat(note.last_edit)}`);

                // updating the note object 
                this.noteObjects.update(note);
            }
        }
    }

    /**
     * Removes a specific note from the UI.
     * 
     * @param {String} id
     */
    removeNote(note, closeDialog = true) {
        const ALL_NOTES = new HTMLArray(this._content.children, 'note');
        const ALL_LIST_NOTES = this._list.children;

        for (let i = 0; i < ALL_NOTES.length; i++) {
            if (ALL_NOTES[i].id === note.id) {
                AnimationHandler.fadeOutCard(ALL_NOTES[i]);
                setTimeout(() => {
                    this._content.removeChild(ALL_NOTES[i]);
                    this._list.removeChild(ALL_LIST_NOTES[i]);
                }, 700);
                this.noteObjects.remove(note);
                if (this.noteObjects.size() === 0) {
                    this.noContentFeedbackHandler.noNotes(new NoNoteMessage());
                }
            }
        }
        if (closeDialog) this.dialog.hide();
    }

    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content
     * @param {String} name
     */
    handleNoteCardClick(noteId, creation) {
        const NOTE = this.noteObjects.get(noteId);
        const LAST_EDIT = dateFormat(NOTE.last_edit);
        const NAME = NOTE.title;
        const CONTENT = NOTE.content;
        const BOOKMARK = NOTE.bookmark;
        const COLOR = NOTE.color;
        this.applicationController.openNoteInTextEditor(CONTENT, NAME, creation, LAST_EDIT, noteId, BOOKMARK, COLOR);
    }

    /**
     * This method updates the stored object of a given note
     * @param {Dict} note 
     */
    update(note) {
        this.noteObjects.update(note);
    }

    getNoteObject(noteId) {
        return this.noteObjects.get(noteId);
    }

   /**
    * type has to be one of the following 
    * (saved, deleted, new, empty).
    * 
    * noteName is optional and only nessecary for the 
    * deleted type.
    * 
    * @param {String} type 
    * @param {String} noteName 
    */
    pushNotification(type, noteName = null) {
        this.notificationHandler.push(type, noteName);
    }

    /**
     * This method renders a confirmation container telling the user if they want to delete the note.
     * 
     * @param {String} id 
     * @param {String} name
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new NoteDeleteModal(id, name, this));
        this.dialog.show();
    }

    /**
     * This method creates a note card component 
     * And adds a note object to the noteObjects array. 
     * 
     * @param {Object} note 
     * @returns A note card component.
     */
    #note(note) {
        this.noteObjects.add(note);
        return new Note(note, this);
    }

    /**
     * This method creates a ListNote component and returns it
     * 
     * @param {Object} note
     * @returns {ListNote} 
     */
    #listNote(note) {
        return new ListNote(note, this, this.dragAndDrop);
    }

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-notes');
    }

    /**
     * This method updates a note
     * 
     * This method will communicate with the note controller 
     * to update a note
     * 
     * @param {String} id 
     * @param {String} name
     */
    async updateNote(id, name, content, bookmark, color) {
        await this.noteController.updateNote(id, name, content, bookmark, color);
    }

    /**
     * This method deletes a note.
     * 
     * This method communicates with the note controller
     * to delete the specified note.
     * 
     * @param {String} id
     */
    async handleConfirmButtonClick(id) {
        await this.noteController.deleteNote(id);
    }
}