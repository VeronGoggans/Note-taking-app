import { Note } from "../components/note.js";
import { NoteDeleteModal } from "../components/modals/noteDeleteModal.js";
import { NoteObjectArray } from "../util/array.js";
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
        this.noteObjects = new NoteObjectArray();
        this.dragAndDrop = new DragAndDrop(this);

        this.#initializeDomElements();
    }

    
    renderNoteCards(notes) {
        this.noteObjects.clear();
        if (notes.length > 0) { 
            const contentFragment = document.createDocumentFragment();

            for (let i = 0; i < notes.length; i++) {
                const NOTE_CARD = this.#note(notes[i]);

                contentFragment.appendChild(NOTE_CARD);
                AnimationHandler.fadeInFromBottom(NOTE_CARD);
            }
            this._content.appendChild(contentFragment);
        } else {
            this.pushNotification('empty');
        }
    }

    
    renderNoteCard(note) {
        const noteCard = this.#note(note);
        this._content.appendChild(noteCard);
        AnimationHandler.fadeInFromBottom(noteCard);
    }


    renderNoteUpdate(note) {
        const cards = this._content.children 

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === note.id) {
                // updating the p element inside the note card.
                const P_ELEMENT = cards[i].querySelector('p');
                P_ELEMENT.innerHTML = filterNotePreview(note.content);

                // updating the h4 element inside the note card.
                const H4 = cards[i].querySelector('h4');
                H4.textContent = formatName(note.title);

                cards[i].setAttribute("data-info", `${dateFormat(note.creation)}--${dateFormat(note.last_edit)}`);

                // updating the note object 
                this.noteObjects.update(note);
            }
        }
    }

    
    removeNote(note, closeDialog = true) {
        const cards = this._content.children;

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === note.id) {
                AnimationHandler.fadeOutCard(cards[i]);
                setTimeout(() => {
                    this._content.removeChild(cards[i]);
                }, 700);
                this.noteObjects.remove(note);
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
        const FAVORITE = NOTE.favorite;
        const COLOR = NOTE.color;
        this.applicationController.openNoteInTextEditor(CONTENT, NAME, creation, LAST_EDIT, noteId, BOOKMARK, FAVORITE, COLOR);
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
        if (type === 'empty' && this._content.children.length === 0) {
            this.notificationHandler.push(type, noteName);
        } 
        if (type !== 'empty') {
            this.notificationHandler.push(type, noteName);
        }
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

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
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
    async updateNote(id, name, content, bookmark, favorite, color) {
        await this.noteController.updateNote(id, name, content, bookmark, favorite, color);
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