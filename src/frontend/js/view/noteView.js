import { Note } from "../components/note.js";
import { NoteObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { DragAndDrop } from "../handlers/drag&drop/dragAndDropHandler.js";
import { removeContent } from "../util/ui.js";


export class NoteView {
    constructor(controller, applicationController, dialog, notificationHandler) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.notificationHandler = notificationHandler;
        this.dialog = dialog;
        
        this.noteObjects = new NoteObjectArray();
        this.dragAndDrop = new DragAndDrop(this);

        this.#initializeDomElements();
        this.#attachEventListeners();
    }

    
    renderAll(notes) {
        this.noteObjects.clear();
        if (notes.length > 0) { 
            const contentFragment = document.createDocumentFragment();

            for (let i = 0; i < notes.length; i++) {
                const noteCard = this.#note(notes[i]);

                contentFragment.appendChild(noteCard);
                AnimationHandler.fadeInFromBottom(noteCard);
            }
            this._content.appendChild(contentFragment);
        } 
        if (this._content.children.length === 0) {
            this.notificationHandler.push('Empty');
        }
    }

    
    renderDelete(note, closeDialog = true) {
        const cards = this._content.children;

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === note.id) {
                AnimationHandler.fadeOutCard(cards[i], this._content);
                this.noteObjects.remove(note);
                this.notificationHandler.push('Deleted', note.name);
            }
        }
        if (closeDialog) this.dialog.hide();
    }

    
    handleNoteCardClick(noteId) {
        const note = this.noteObjects.get(noteId);
        this.applicationController.initView('editor', 
            {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'notes', 
            }
        );
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

    renderDeleteModal(id, name) {
        this.dialog.renderDeleteModal(id, name, this)
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

    async updateNote(note) {
        await this.controller.updateNote(note);
    }

    async handleDeleteButtonClick(id) {
        await this.controller.deleteNote(id);
    }

    #initializeDomElements() {
        this.createNoteButton = document.querySelector('.create-note-btn')
        this.favoritedButton = document.querySelector('.favorites-btn')
        this.bookmarkedButton = document.querySelector('.bookmarks-btn')
        this._content = document.querySelector('.content-view');
    }

    #attachEventListeners() {
        this.bookmarkedButton.addEventListener('click', () => {
            removeContent(this._content);
            this.controller.getNotes('bookmarks')});

        this.favoritedButton.addEventListener('click', () => {
            removeContent(this._content)
            this.controller.getNotes('favorites')});

        this.createNoteButton.addEventListener('click', () => {
            this.applicationController.initView('editor', {
                editorObjectType: 'note', 
                editorObject: null,
                newEditorObject: true, 
                previousView: 'notes', 
            })
        })
    }
}