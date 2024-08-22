import { FlashcardObjectArray } from "../util/array.js";
import { Flashcard } from "../components/flashcardDeck.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";

export class FlashcardEditView {
    constructor(controller, applicationController, dialog) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.dialog = dialog;

        this.flashcardObjects = new FlashcardObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();
        AnimationHandler.fadeInFromSide(this._viewElement);
    }

    renderAll(deck) {
        this.deck = deck;
        this._deckName.textContent = deck.name;
        const flashcards = deck.flashcards;
        const flashcardsFragment = document.createDocumentFragment();

        for (let i = 0; i < flashcards.length; i++) {
            const flashcard = this.#flashcard(flashcards[i]);
            flashcardsFragment.appendChild(flashcard);
        }
        this._flashcardsContainer.appendChild(flashcardsFragment);
    }


    renderOne(flashcard) {
        // Adding the missing attributes 
        // So it can still be found/updated by the Object Array
        const lastFlashcard = this.flashcardObjects.getLast()
        flashcard['rating'] = 'idle';
        flashcard['id'] = lastFlashcard.id += 1

        const flashcardObj = this.#flashcard(flashcard);
        AnimationHandler.fadeInFromBottom(flashcardObj);
        this._flashcardsContainer.appendChild(flashcardObj);
    }
    

    renderUpdate(flashcard) {
        const flashcards = this._flashcardsContainer.children 

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].id == flashcard.id) {    

                flashcards[i].querySelector('h3').textContent = flashcard.term;

                this.flashcardObjects.update(flashcard);
            }
        }

    }

    #flashcard(flashcard, unsaved = false) {
        this.flashcardObjects.add(flashcard);
        return new Flashcard(flashcard, this.dialog, this.controller, unsaved);
    }

    #initializeDomElements() {
        this._flashcardsContainer = document.querySelector('.flashcards');
        this._viewElement = document.querySelector('.flashcard-edit-view');
        this._exitButton = document.querySelector('.exit-flashcard-edit-view-btn');
        this._deckName = this._viewElement.querySelector('h1');
        this._saveButton = this._viewElement.querySelector('.save-btn'); 
        this._addFlashcardButton = this._viewElement.querySelector('.add-flashcard-btn');
    }

    #attachEventListeners() {
        this._addFlashcardButton.addEventListener('click', () => {this.dialog.renderEditFlashcardModal(this.controller)});
        this._exitButton.addEventListener('click', () => {this.controller.loadPreviousView()})
        this._saveButton.addEventListener('click', async () => {

            // Checking if the deck name has been changed.
            let newDeckName = null;
            if (this._deckName.textContent !== this.deck.name) {
                newDeckName = this._deckName.textContent;
            } else {
                // Set the newDeck name to the old deck name 
                newDeckName = this.deck.name
            }
            await this.controller.saveDeckChanges(this.deck.id, newDeckName);
            this.controller.loadPreviousView();
        })
    }
}