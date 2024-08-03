import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { FlashcardDeck } from "../components/flashcardDeck.js";
import { FlashcardDeckObjectArray } from "../util/array.js";

export class FlashcardDeckView {
    constructor(controller, applicationController, dialog) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.deckObjects = new FlashcardDeckObjectArray();

        this.#initializeDomElements();

    }

    renderAll(decks) {
        this.deckObjects.clear();
        console.log(decks);
        
        let cardCount = 0
        
        if (decks.length > 0) {
            const contentFragment = document.createDocumentFragment();

            for (let i = 0; i < decks.length; i++) {
                const deckCard = this.#flashcardDeck(decks[i]);
                cardCount += decks[i].flashcards.length;
                contentFragment.appendChild(deckCard);
                AnimationHandler.fadeInFromBottom(deckCard);
            }
            this._flashcardDecks.appendChild(contentFragment);
        }
        this._flashcardCountSpan.textContent = cardCount;

    }

    renderFlashcardPracticeModal(deck) {
        this.dialog.renderFlashcardPracticeModal(deck, this);
    }

    #flashcardDeck(deck) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, this);
    }


    #initializeDomElements() {
        this._flashcardDecks = document.querySelector('.flashcard-deck-container');
        this._flashcardCountSpan = document.querySelector('.flashcard-count');
    }
}