import { StickyNote } from "../components/note.js";
import { StickyNoteObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { captureNewLines } from "../util/formatters.js";

export class StickyNoteView {
    constructor(controller, dialog) {
        this.controller = controller;
        this.dialog = dialog;
        this.stickyNoteObjects = new StickyNoteObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
        AnimationHandler.fadeInFromSide(this.viewElement);
        
    }

    renderAll(stickyNotes) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < stickyNotes.length; i++) {
            const stickyNote = this.#stickyNote(stickyNotes[i]);
            AnimationHandler.fadeInFromBottom(stickyNote)
            contentFragment.appendChild(stickyNote);
        }
        this._stickyWall.insertBefore(contentFragment, this._stickyWall.firstChild);
    }

    renderOne(stickyNote) {
        const stickyNoteCard = this.#stickyNote(stickyNote);
        AnimationHandler.fadeInFromBottom(stickyNoteCard);
        this._stickyWall.insertBefore(stickyNoteCard, this._stickyWall.firstChild);
    }

    renderDelete(stickyNoteId) {
        const stickyNotes = this._stickyWall.children 

        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id === stickyNoteId) {
                AnimationHandler.fadeOutCard(stickyNotes[i])
                this.stickyNoteObjects.remove(stickyNoteId);
            }
        }
    }

    renderUpdate(stickyNote) {
        const stickyNotes = this._stickyWall.children 

        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id === stickyNote.id) {    

                stickyNotes[i].querySelector('p').innerHTML = captureNewLines(stickyNote.content);
                stickyNotes[i].querySelector('h3').textContent = stickyNote.name;

                this.stickyNoteObjects.update(stickyNote);
            }
        }
    }

    getStickyNoteObject(stickyNoteId) {
        return this.stickyNoteObjects.get(stickyNoteId);
    }

    #stickyNote(stickyNote) {
        this.stickyNoteObjects.add(stickyNote);
        return new StickyNote(stickyNote, this, this.controller, this.dialog);
    }

    #attachEventListeners() {
        this.createStickyNoteButton.addEventListener('click', () => {this.dialog.renderStickyNoteModal(this.controller)});
    }

    #initializeDomElements() {
        this.createStickyNoteButton = document.querySelector('.add-sticky-btn');    
        this.viewElement = document.querySelector('.sticky-wall-view');
        this._stickyWall = document.querySelector('.sticky-wall');
    }
}