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
        this._deckName.textContent = deck.name;
        const flashcards = deck.flashcards;

        if (flashcards.length > 0) {
            const flashcardsFragment = document.createDocumentFragment();

            for (let i = 0; i < flashcards.length; i++) {
                const flashcard = this.#flashcard(flashcards[i]);
                flashcardsFragment.appendChild(flashcard);
            }
            this._flashcardsContainer.appendChild(flashcardsFragment);
        } 
        else {
            console.log('Bitch this deck empty');
        }
        
    }

    renderOne(flashcard) {
        const flashcardObj= this.#flashcard(flashcard);
        AnimationHandler.fadeInFromBottom(flashcardObj);
        this._flashcardsContainer.appendChild(flashcardObj);
    }
    

    renderUpdate(flashcard) {

    }

    #flashcard(flashcard) {
        this.flashcardObjects.add(flashcard);
        return new Flashcard(flashcard, this.dialog, this.controller);
    }

    #initializeDomElements() {
        this._flashcardsContainer = document.querySelector('.flashcards');
        this._viewElement = document.querySelector('.flashcard-edit-view');
        this._exitButton = document.querySelector('.exit-flashcard-edit-view-btn');
        this._deckName = this._viewElement.querySelector('h1');
    }

    #attachEventListeners() {
        this._exitButton.addEventListener('click', () => {this.controller.loadPreviousView()})
    }
}