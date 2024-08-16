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

                this.deckObjects.add(decks[i])
            }
            this._flashcardDecks.appendChild(deckFragment);
            this._flashcardProgressions.appendChild(progressionFragment);
        }
        this._flashcardCountSpan.textContent = cardCount;
    }

    renderOne(deck) {
        const deckCard = this.#flashcardDeck(deck);
        const progressionCard = this.#flashcardProgression(deck);

        this._flashcardDecks.appendChild(deckCard);
        this._flashcardProgressions.appendChild(progressionCard);

        AnimationHandler.fadeInFromBottom(deckCard);
        AnimationHandler.fadeInFromBottom(progressionCard);

        this.dialog.hide();
    }


    renderDelete(deck) {
        const decks = this._flashcardDecks.children;
        const progressions = this._flashcardProgressions.children

        for (let i = 0; i < decks.length; i++) {
            if (decks[i].id === deck.id) {
                AnimationHandler.fadeOutCard(decks[i], this._flashcardDecks);
                AnimationHandler.fadeOutCard(progressions[i], this._flashcardProgressions);
                this.deckObjects.remove(deck);
            }
        }
        this.dialog.hide();
    }


    renderStats(misc) {
        this._streakSpan.textContent = `${misc.streak}`
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

    handleEditButtonClick(deckId) {
        const deck = this.deckObjects.get(deckId);
        this.applicationController.initView('flashcardEdit', {
            deck: deck,
            previousView: 'flashcardsHome'
        });
    }

    async handleDeleteButtonClick(deckId) {
        await this.controller.deleteDeck(deckId);
    }

    renderDeleteModal(id, name) {
        this.dialog.renderDeleteModal(id, name, this);
    }

    /**
     * This method is used to temporarly save a flashcard 
     * from the new deck modal
     * 
     * @param {Object} flashcard 
     */
    saveFlashcard(flashcard) {
        this.controller.saveCardToModel(flashcard);
    }

    #flashcardDeck(deck) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, this);
    }

    #flashcardProgression(deck) {
        return new FlashcardProgression(deck, this);
    }

    #attachEventListeners() {
        this._addDeckButton.addEventListener('click', () => {this.dialog.renderNewDeckModal(this.controller)});
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