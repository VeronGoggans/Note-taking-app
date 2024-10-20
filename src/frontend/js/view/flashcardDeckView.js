import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { FlashcardDeck, FlashcardProgression } from "../components/entities/flashcardDeck.js";
import { FlashcardDeckObjectArray } from "../util/array.js";
import { BaseView } from "./baseView.js";

export class FlashcardDeckView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.deckObjects = new FlashcardDeckObjectArray();

        this.#initElements();
        this.#eventListeners();
        AnimationHandler.fadeInFromBottom(this._viewElement)
    }

    renderAll(decks) {
        this.deckObjects.clear();        
        
        if (decks.length > 0) {
            const deckFragment = document.createDocumentFragment();
            const progressionFragment = document.createDocumentFragment();

            for (let i = 0; i < decks.length; i++) {
                const deck = decks[i].deck;
                const deckStats = decks[i].stats;

                const deckCard = this.#flashcardDeck(deck, deckStats);
                const progressionCard = this.#flashcardProgression(deck, deckStats);
        
                deckFragment.appendChild(deckCard);
                progressionFragment.appendChild(progressionCard);
                
                AnimationHandler.fadeInFromBottom(progressionCard);
                AnimationHandler.fadeInFromBottom(deckCard);

                this.deckObjects.add(deck)
            }
            this._flashcardDecks.appendChild(deckFragment);
            this._flashcardProgressions.appendChild(progressionFragment);
        }
    }

    renderOne(deck) {
        const deckCard = this.#flashcardDeck(deck);
        const progressionCard = this.#flashcardProgression(deck);

        this._flashcardDecks.appendChild(deckCard);
        this._flashcardProgressions.appendChild(progressionCard);

        AnimationHandler.fadeInFromBottom(deckCard);
        AnimationHandler.fadeInFromBottom(progressionCard);

        this.dialog.close();
    }


    renderDelete(deck) {
        console.log(deck);
        
        const decks = this._flashcardDecks.children;
        const progressions = this._flashcardProgressions.children

        for (let i = 0; i < decks.length; i++) {
            if (decks[i].id == deck.id) {
                AnimationHandler.fadeOutCard(decks[i]);
                AnimationHandler.fadeOutCard(progressions[i]);
                this.deckObjects.remove(deck);
            }
        }
        this.dialog.close();
    }


    renderStats(flashcardCount) {
        this._flashcardCountSpan.textContent = flashcardCount; 
        // this._streakSpan.textContent = `${misc.streak}`
        // const minutes = misc.study_time;
        // if (minutes >= 60) {
        //     this._hoursStudiedSpan.textContent = Math.floor(minutes / 60);
        //     this._minutesStudiedSpan.textContent = minutes % 60;
        // }
        // else {
        //     this._minutesStudiedSpan.textContent = minutes;
        // }
    } 

    async handleDeckCardClick(deckId) {
        const deck = this.deckObjects.get(deckId);
        const flashcards = await this.controller.getFlashcards(deckId); 
        this.applicationController.initView('flashcardsPractice', {
            deck: deck,
            flashcards: flashcards,
            previousView: 'flashcardsHome',
        });
    }

    async handleEditButtonClick(deckId) {
        const deck = this.deckObjects.get(deckId);
        const flashcards = await this.controller.getFlashcards(deckId);
        this.applicationController.initView('flashcardEdit', {
            deck: deck,
            flashcards: flashcards,
            previousView: 'flashcardsHome'
        });
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

    /**
     * Temporarely stores the deck name
     * 
     * @param {Object} flashcard 
     */
    saveDeckName(deckName) {
        this.controller.saveDeckName(deckName)
    }


    #flashcardDeck(deck, deckStats) {
        this.deckObjects.add(deck);
        return new FlashcardDeck(deck, deckStats, this);
    }

    #flashcardProgression(deck, deckStats) {
        return new FlashcardProgression(deck, deckStats, this);
    }

    #eventListeners() {
        this._addDeckButton.addEventListener('click', () => {this.dialog.renderNewDeckModal(this.controller)});
    }


    #initElements() {
        this._flashcardDecks = document.querySelector('.flashcard-deck-container');
        this._flashcardProgressions = document.querySelector('.flashcard-deck-progression-container');
        this._flashcardCountSpan = document.querySelector('.flashcard-count');
        this._streakSpan = document.querySelector('.study-streak');
        this._hoursStudiedSpan = document.querySelector('.hours-studied');
        this._minutesStudiedSpan = document.querySelector('.minutes-studied');
        this._addDeckButton = document.querySelector('.create-deck-btn');
        this._viewElement = document.querySelector('.flashcards-view');
    }
}