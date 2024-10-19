import { RecentNote } from "../components/note.js";
import { FlashcardDeck } from "../components/flashcardDeck.js";
import { NoteObjectArray, FlashcardDeckObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { greetBasedOnTime } from "../util/date.js";
import { BaseView } from "./baseView.js";

export class HomeView extends BaseView {
    constructor(controller, applicationController) {
        super();
        this.controller = controller;
        this.applicationController = applicationController;

        this.noteObjects = new NoteObjectArray();
        this.deckObjects = new FlashcardDeckObjectArray();
        this.#initElements();
        this.#eventListeners();

        AnimationHandler.fadeInFromBottom(this._viewElement)
    }

    renderRecentFolders(folders) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < folders.length; i++) {
            const folderCard = this.#recentFolder(folders[i]);

            contentFragment.appendChild(folderCard);
            AnimationHandler.fadeInFromBottom(folderCard);
        }
        this._recentFolderList.appendChild(contentFragment); 
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
            const deck = decks[i].deck;
            const deckStats = decks[i].stats;
            const deckCard = this.#flashcardDeck(deck, deckStats);

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


    async handleDeckCardClick(deckId) {
        const deck = this.deckObjects.get(deckId)
        const flashcards = await this.applicationController.getFlashcards(deckId) 
        this.applicationController.initView('flashcardsPractice', {
            deck: deck,
            flashcards: flashcards, 
            previousView: 'home'
        })
    }

    #recentFolder(folder) {
        const recentFolderCard = document.createElement('recent-folder-card');
        recentFolderCard.setAttribute('folder', JSON.stringify(folder));

        return recentFolderCard
    }

    #recentNote(note) {
        this.noteObjects.add(note)
        return new RecentNote(note, this);
    }

    #flashcardDeck(deck, deckStats) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, deckStats, this);
    }

    #eventListeners() {
        this._recentFolderList.addEventListener('RecentFolderCardClick', async (event) => {
            const { folderId } = event.detail;            
            const { Object, location } = await this.applicationController.getFolderById(folderId);
            this.applicationController.initView('notes', {
                folder: Object,
                location: location
            });
        });       
    }

    #initElements() {
        document.querySelector('.view-title').textContent = greetBasedOnTime();
        this._recentFolderList = document.querySelector('.recent-folders');
        this.recentNoteContainer = document.querySelector('.recent-notes');
        this.flashcardDeckContainer = document.querySelector('.flashcard-decks');
        this._viewElement = document.querySelector('.home');
    }
}