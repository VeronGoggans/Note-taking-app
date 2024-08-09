import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { FlashcardDeck, FlashcardProgression } from "../components/flashcardDeck.js";
import { FlashcardDeckObjectArray } from "../util/array.js";

export class FlashcardDeckView {
    constructor(controller, applicationController, dialog) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.deckObjects = new FlashcardDeckObjectArray();

        this.#initializeDomElements();
        this.#attachEventListeners();

    }

    renderAll(decks) {
        this.deckObjects.clear();        
        let cardCount = 0
        
        if (decks.length > 0) {
            const deckFragment = document.createDocumentFragment();
            const progressionFragment = document.createDocumentFragment();

            for (let i = 0; i < decks.length; i++) {
                // Adding the cards to the card counter 
                cardCount += decks[i].flashcards.length;

                const deckCard = this.#flashcardDeck(decks[i]);
                const progressionCard = this.#flashcardProgression(decks[i]);
        
                deckFragment.appendChild(deckCard);
                progressionFragment.appendChild(progressionCard);
                
                AnimationHandler.fadeInFromBottom(progressionCard);
                AnimationHandler.fadeInFromBottom(deckCard);
            }
            this._flashcardDecks.appendChild(deckFragment);
            this._flashcardProgressions.appendChild(progressionFragment);
        }
        this._flashcardCountSpan.textContent = cardCount;

    }

    renderStats(misc) {
        this._streakSpan.textContent = `🔥${misc.streak}`
        const minutes = misc.study_time;
        if (minutes >= 60) {
            this._hoursStudiedSpan.textContent = Math.floor(minutes / 60);
            this._minutesStudiedSpan.textContent = minutes % 60;
        }
        else {
            this._minutesStudiedSpan.textContent = minutes;
        }
    } 

    handleDeckCardClick(deckId) {
        const deck = this.deckObjects.get(deckId);
        this.applicationController.initView('flashcardsPractice', {
            deck: deck,
            previousView: 'flashcardsHome',
        });
    }

    #flashcardDeck(deck) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, this);
    }

    #flashcardProgression(deck) {
        return new FlashcardProgression(deck, this);
    }

    #attachEventListeners() {
        this._addDeckButton.addEventListener('click', () => {this.dialog.renderNewDeckModal(this)});
    }


    #initializeDomElements() {
        this._flashcardDecks = document.querySelector('.flashcard-deck-container');
        this._flashcardProgressions = document.querySelector('.flashcard-deck-progression-container');
        this._flashcardCountSpan = document.querySelector('.flashcard-count');
        this._streakSpan = document.querySelector('.study-streak');
        this._hoursStudiedSpan = document.querySelector('.hours-studied');
        this._minutesStudiedSpan = document.querySelector('.minutes-studied');

        this._addDeckButton = document.querySelector('.create-deck-btn');
    }
}