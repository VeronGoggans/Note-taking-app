import { RecentFolder } from "../components/folder.js";
import { RecentNote } from "../components/note.js";
import { FlashcardDeck } from "../components/flashcardDeck.js";
import { FolderObjectArray, NoteObjectArray, FlashcardDeckObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { greetBasedOnTime } from "../util/date.js";
import { BaseView } from "./baseView.js";

export class HomeView extends BaseView {
    constructor(controller, applicationController) {
        super();
        this.controller = controller;
        this.applicationController = applicationController;

        this.folderObjects = new FolderObjectArray();
        this.noteObjects = new NoteObjectArray();
        this.deckObjects = new FlashcardDeckObjectArray();
        this.#initializeDomElements();

        AnimationHandler.fadeInFromBottom(this._viewElement)
    }

    renderRecentFolders(folders) {
        this.folderObjects.clear(); 
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < folders.length; i++) {
            const folderCard = this.#recentFolder(folders[i]);

            contentFragment.appendChild(folderCard);
            AnimationHandler.fadeInFromBottom(folderCard);
        }
        this.recentFolderContainer.appendChild(contentFragment); 
    }


    renderRecentNotes(notes) {
        this.noteObjects.clear()
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < notes.length; i++) {
            const noteCard = this.#recentNote(notes[i]);

            contentFragment.appendChild(noteCard);
            AnimationHandler.fadeInFromBottom(noteCard);
        }
        this.recentNoteContainer.appendChild(contentFragment); 
    }

    renderRandomDecks(decks) {
        this.deckObjects.clear()
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < decks.length; i++) {
            const deckCard = this.#FlashcardDeck(decks[i]);

            contentFragment.appendChild(deckCard);
            AnimationHandler.fadeInFromBottom(deckCard);
        }
        this.flashcardDeckContainer.appendChild(contentFragment); 

    }

    async handleNoteCardClick(noteId) {
        const { note, location } = await this.applicationController.getNoteById(noteId)
        this.applicationController.initView('editor', 
            {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'home',
                editorObjectLocation: location 
            }
        );
    }

    async handleFolderCardClick(folderId) {
        const { folder, location } = await this.applicationController.getFolderById(folderId);
        this.applicationController.initView('notes', {
            folder: folder,
            location: location
        });
    }

    handleDeckCardClick(deckId) {
        const deck = this.deckObjects.get(deckId)
        this.applicationController.initView('flashcardsPractice', {deck: deck, previousView: 'home'})
    }

    #recentFolder(folder) {
        this.folderObjects.add(folder)
        return new RecentFolder(folder, this);
    }

    #recentNote(note) {
        this.noteObjects.add(note)
        return new RecentNote(note, this);
    }

    #FlashcardDeck(deck) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, this);
    }

    #initializeDomElements() {
        document.querySelector('.view-title').textContent = greetBasedOnTime();
        this.recentFolderContainer = document.querySelector('.recent-folders');
        this.recentNoteContainer = document.querySelector('.recent-notes');
        this.flashcardDeckContainer = document.querySelector('.flashcard-decks');
        this._viewElement = document.querySelector('.home');
    }
}