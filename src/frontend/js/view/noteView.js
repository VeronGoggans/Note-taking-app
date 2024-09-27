import { Note } from "../components/note.js";
import { NoteObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { removeContent } from "../util/ui.js";
import { BaseView } from "./baseView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";


export class NoteView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        
        this.noteObjects = new NoteObjectArray();

        this.#initializeDomElements();
        this.#attachEventListeners();

        AnimationHandler.fadeInFromBottom(this._viewElement)
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

            if (this._content.children.length === 0) {
                NotificationHandler.push('empty');
            }
        } 
    }

    
    renderDelete(note, closeDialog = true) {
        const cards = this._content.children;

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id == note.id) {
                AnimationHandler.fadeOutCard(cards[i]);
                this.noteObjects.remove(note);
            }
        }
        if (closeDialog) this.closeDialog();
    }

    
    handleNoteCardClick(noteId) {
        const note = this.noteObjects.get(noteId);
        this.applicationController.initView('editor', 
            {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'notes', 
                editorObjectLocation: null
            }
        );
    }

    getNoteObject(noteId) {
        return this.noteObjects.get(noteId);
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
        this.createNoteButton = document.querySelector('.create-note-btn')
        this.bookmarkedButton = document.querySelector('.bookmarks-btn')
        this._content = document.querySelector('.content-view');
        this._viewElement = document.querySelector('.notes');
    }

    #attachEventListeners() {
        this.bookmarkedButton.addEventListener('click', () => {
            removeContent(this._content);
            this.controller.get('bookmarks')});

        this.createNoteButton.addEventListener('click', () => {
            this.applicationController.initView('editor', {
                editorObjectType: 'note', 
                editorObject: null,
                newEditorObject: true, 
                previousView: 'notes', 
                editorObjectLocation: null
            })
        })
    }
}